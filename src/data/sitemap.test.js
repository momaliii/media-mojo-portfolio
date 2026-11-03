import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { caseStudies } from "./caseStudies";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const sitemap = read("../../public/sitemap.xml");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]));
const paths = new Set(urls.map((url) => url.pathname));
const isPrivate = (path) => /^\/(admin|auth|profile|reset-password|api|lovable|not-found)(\/|$)/.test(path);

describe("public portfolio sitemap coverage", () => {
  test("every indexable static app route can be discovered", () => {
    const app = read("../App.tsx");
    const routes = [...app.matchAll(/<Route\s+path="([^"]+)"/g)].map((match) => match[1]);
    const publicRoutes = routes.filter((path) => path !== "*" && !path.includes(":") && !isPrivate(path));
    assert.equal(publicRoutes.length, 6);
    for (const route of publicRoutes) assert.ok(paths.has(route), `Missing public route: ${route}`);
  });

  test("all fallback case studies are discoverable in every portfolio version", () => {
    assert.ok(caseStudies.length > 0);
    for (const study of caseStudies) {
      const slug = study.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      for (const prefix of ["", "/v2", "/v3"]) {
        const path = `${prefix}/case-study/${slug}`;
        assert.ok(paths.has(path), `Missing case study: ${path}`);
      }
    }
  });

  test("entries use the published host without private pages or duplicates", () => {
    assert.ok(urls.length > 0);
    assert.equal(paths.size, urls.length);
    for (const url of urls) {
      assert.equal(url.origin, "https://media-mojo-portfolio.lovable.app");
      assert.equal(isPrivate(url.pathname), false);
      assert.equal(url.pathname.includes(":"), false);
      assert.equal(url.search, "");
      assert.equal(url.hash, "");
    }
  });

  test("robots allows public crawling and advertises the sitemap", () => {
    const robots = read("../../public/robots.txt");
    assert.match(robots, /User-agent: \*\s+Allow: \/(?:\r?\n|$)/);
    assert.match(robots, /^Sitemap: https:\/\/media-mojo-portfolio\.lovable\.app\/sitemap\.xml$/m);
    assert.doesNotMatch(robots, /^Disallow: \/\s*$/m);
  });
});
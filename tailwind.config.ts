import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
				serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'Cambria', 'serif'],
				mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
				display: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'Cambria', 'serif'],
			},
			fontSize: {
				'masthead': ['clamp(3.5rem, 9vw + 1rem, 11rem)', { lineHeight: '0.92', letterSpacing: '-0.04em', fontWeight: '400' }],
				'display-xl': ['clamp(2.75rem, 6vw + 0.5rem, 6.5rem)', { lineHeight: '0.98', letterSpacing: '-0.03em', fontWeight: '400' }],
				'display-lg': ['clamp(2.25rem, 4.5vw + 0.25rem, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.025em', fontWeight: '400' }],
				'display-md': ['clamp(1.75rem, 3vw + 0.25rem, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '400' }],
				'eyebrow': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.22em', fontWeight: '500' }],
				'eyebrow-lg': ['0.8125rem', { lineHeight: '1', letterSpacing: '0.2em', fontWeight: '500' }],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// v1 — Lovable pastel palette (used by / and /case-studies)
				media: {
					purple: '#9b87f5',
					darkpurple: '#7E69AB',
					blue: '#D3E4FD',
					peach: '#FDE1D3',
					vibrantpurple: '#8B5CF6',
					orange: '#F97316',
					oceanblue: '#0EA5E9',
					pink: '#D946EF',
				},
				// v2 — Dark luxury palette (used by /v2 and nested routes)
				obsidian: {
					DEFAULT: '#0A0A0A',
					50: '#FAFAF9',
					100: '#F5F5F4',
					200: '#E7E5E4',
					300: '#D6D3D1',
					400: '#A8A29E',
					500: '#78716C',
					600: '#57534E',
					700: '#292524',
					800: '#1C1917',
					900: '#0F0F0F',
					950: '#0A0A0A',
				},
				gold: {
					DEFAULT: '#D4AF37',
					50: '#FBF6E2',
					100: '#F7EDC0',
					200: '#EFDC83',
					300: '#E7CB46',
					400: '#D4AF37',
					500: '#B8941F',
					600: '#8F7218',
					700: '#665011',
					800: '#3D300A',
					900: '#141003',
				},
				champagne: {
					DEFAULT: '#F5E6C8',
					soft: '#E8D9B5',
				},
				// v3 — Y2K / retro-future palette
				midnight: {
					DEFAULT: '#0A0F2E',
					950: '#060920',
					900: '#0A0F2E',
					800: '#131845',
					700: '#1E2660',
					600: '#2D3680',
				},
				chrome: {
					50: '#F8FAFC',
					100: '#F1F5F9',
					200: '#E2E8F0',
					300: '#CBD5E1',
					400: '#94A3B8',
					500: '#64748B',
					600: '#475569',
					700: '#334155',
					800: '#1E293B',
				},
				holo: {
					cyan: '#22D3EE',
					magenta: '#EC4899',
					violet: '#A78BFA',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'bounce-gentle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'marquee': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' }
				},
				'number-count': {
					'0%': { 'content': '"0"' },
					'20%': { 'content': '"1"' },
					'40%': { 'content': '"2"' },
					'60%': { 'content': '"3"' },
					'80%': { 'content': '"4"' },
					'100%': { 'content': '"5"' },
				},
				'flip-in': {
					'0%': { transform: 'rotateY(90deg)', opacity: '0' },
					'100%': { transform: 'rotateY(0deg)', opacity: '1' }
				},
				'flip-out': {
					'0%': { transform: 'rotateY(0deg)', opacity: '1' },
					'100%': { transform: 'rotateY(90deg)', opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
				'fade-in': 'fade-in 0.6s ease-out forwards',
				'pulse-slow': 'pulse-slow 3s infinite ease-in-out',
				'slide-in-right': 'slide-in-right 0.6s ease-out forwards',
				'bounce-gentle': 'bounce-gentle 4s infinite ease-in-out',
				'float': 'float 6s infinite ease-in-out',
				'marquee': 'marquee 40s linear infinite',
				'number-count': 'number-count 2s ease-out forwards',
				'flip-in': 'flip-in 0.5s ease-out forwards',
				'flip-out': 'flip-out 0.5s ease-out forwards'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'hero-pattern': 'linear-gradient(135deg, #9b87f5 0%, #D3E4FD 100%)',
				'dark-hero-pattern': 'linear-gradient(135deg, #4d3b99 0%, #1a3b6e 100%)',
				'gold-shimmer': 'linear-gradient(90deg, #B8941F 0%, #E7CB46 50%, #D4AF37 100%)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

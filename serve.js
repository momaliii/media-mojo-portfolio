
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Log startup information
console.log('Starting server...');
console.log(`Node version: ${process.version}`);
console.log(`Serving from: ${path.join(__dirname, 'dist')}`);

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// For any request that doesn't match a static file, serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

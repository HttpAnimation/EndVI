const express = require('express');
const fs = require('fs');
const app = express();

// Middleware
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/photos', (req, res) => {
  const photos = parseConfigFile('conf/photos.conf');
  res.render('photos', { photos });
});

app.get('/videos', (req, res) => {
  const videos = parseConfigFile('conf/videos.conf');
  res.render('videos', { videos });
});

// Helper function to parse configuration files
function parseConfigFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const data = lines
    .filter(line => line.trim() !== '' && !line.startsWith('#'))
    .map(line => {
      const [name, path] = line.split('|').map(item => item.trim());
      return { name, path };
    });
  return data;
}

// Set view engine
app.set('view engine', 'ejs');

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

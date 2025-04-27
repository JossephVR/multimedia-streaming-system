const express = require('express'); // Import Express framework for HTTP server
const WebSocket = require('ws'); 
const path = require('path'); 
require('dotenv').config(); 

const mediaRoutes = require('./routes/mediaRoutes'); 
const { listS3Objects } = require('./services/s3Service'); 
const { listLocalMp3Files } = require('./services/localService'); 

// Create an instance of the Express application
const app = express(); 
const port = 8080;

// Serve local MP3 files from the 'mp3' directory
app.use('/mp3', express.static(path.join(__dirname, 'mp3')));

// API Routes: Define routes for media
app.use('/api', mediaRoutes);

// Create HTTP server and start listening
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); 
});

// Create WebSocket server using the same HTTP server
const wss = new WebSocket.Server({ server });

// WebSocket connection event handler
wss.on('connection', async (ws) => {
  console.log('Client connected'); 

  // Listen for incoming messages from the WebSocket client
  ws.on('message', async (message) => {
    console.log(`Received: ${message}`); 

    // If the client sends a 'fetch_videos' message, send media links
    if (message === 'fetch_videos') {
      const s3Links = await listS3Objects(); 
      const localMp3Links = listLocalMp3Files(); 
      const allMediaLinks = [...s3Links, ...localMp3Links]; 
      ws.send(JSON.stringify(allMediaLinks)); 
    }
  });

  // Send media links to the client when they connect
  const s3Links = await listS3Objects(); 
  const localMp3Links = listLocalMp3Files(); 
  const allMediaLinks = [...s3Links, ...localMp3Links]; 
  ws.send(JSON.stringify(allMediaLinks)); 

  // WebSocket close event handler
  ws.on('close', () => {
    console.log('Client disconnected'); 
  });

  // WebSocket error event handler
  ws.on('error', (error) => {
    console.error('WebSocket error:', error); 
  });
});

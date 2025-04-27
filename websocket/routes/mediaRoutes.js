const express = require('express');
const { listS3Objects } = require('../services/s3Service'); // Import function to list S3 objects
const { listLocalMp3Files } = require('../services/localService'); // Import function to list local MP3 files

const router = express.Router();

// Endpoint to get combined list of S3 and local media files
router.get('/videos', async (req, res) => {
  const s3Links = await listS3Objects(); // Fetch S3 links
  const localMp3Links = listLocalMp3Files(); // Fetch local MP3 links
  const allMediaLinks = [...s3Links, ...localMp3Links]; // Merge both lists
  res.json(allMediaLinks); // Return merged list as JSON response
});

module.exports = router; // Export router

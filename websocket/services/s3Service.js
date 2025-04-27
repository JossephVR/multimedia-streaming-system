const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3'); // Import necessary AWS SDK modules for S3
require('dotenv').config(); // Load environment variables from .env file

// Create an S3 client with credentials from environment variables
const s3Client = new S3Client({
  region: process.env.AWS_REGION, 
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
  },
});

// Bucket name from environment variables
const bucketName = process.env.BUCKET_NAME; 

// Function to list objects in an S3 bucket
async function listS3Objects() {
  try {
    const params = { Bucket: bucketName }; 
    const command = new ListObjectsV2Command(params); 
    const data = await s3Client.send(command); 

    if (!data || !data.Contents) return []; // If no objects found, return empty array

    // Filter the results to include only media files (mp4, mp3, wav, mkv)
    const mediaFiles = data.Contents.filter((item) =>
      item.Key.match(/\.(mp4|mp3|wav|mkv)$/)
    );

    // Return the URLs of the media files in the S3 bucket
    return mediaFiles.map(
      (file) => `https://${bucketName}.s3.amazonaws.com/${file.Key}`
    );
  } catch (err) {
    console.error('Error fetching S3 objects:', err); 
    return []; // Return empty array in case of error
  }
}

module.exports = { listS3Objects }; // Export the function to use it in other files

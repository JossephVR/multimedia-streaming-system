const path = require('path'); 
const fs = require('fs'); 

// Define the path to the mp3 directory
const mp3Directory = path.join(__dirname, '..', 'mp3'); 

// Function to list local MP3 files
function listLocalMp3Files() {
  try {
    if (!fs.existsSync(mp3Directory)) return []; 

    const files = fs.readdirSync(mp3Directory); 
    const mp3Files = files.filter((file) => file.endsWith('.mp3')); 
    return mp3Files.map((file) => `/mp3/${file}`); 
  } catch (err) {
    console.error('Error listing local MP3 files:', err); 
    return [];
  }
}

// Export the function to use it elsewhere
module.exports = { listLocalMp3Files }; 

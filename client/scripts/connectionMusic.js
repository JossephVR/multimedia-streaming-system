let musicList = [];

// Connect to the WebSocket server
const SERVER_IP = 'localhost'; // <-- change this as needed
const socket = new WebSocket(`ws://${SERVER_IP}:8080`);

socket.onopen = function () {
    console.log('Connected to WebSocket server');
    socket.send('fetch_musica'); // Request list of music files from server
};

socket.onmessage = function (event) {
    // Parse received data and filter only MP3 files
    musicList = JSON.parse(event.data).filter(track => track.endsWith('.mp3'));
    displayTracks(musicList);
};

socket.onerror = function (error) {
    console.error('WebSocket Error:', error);
};

// Display the list of filtered music tracks
function displayTracks(tracks) {
    const musicGrid = document.getElementById('musicGrid');
    musicGrid.innerHTML = '';
    tracks.forEach((track) => {
        const trackCard = document.createElement('div');
        trackCard.className = 'trackCard';

        const trackName = document.createElement('h3');
        trackName.textContent = track.split('/').pop();

        const playButton = document.createElement('button');
        playButton.textContent = 'Play';
        playButton.className = 'playButton';
        playButton.onclick = () => playTrack(track);

        trackCard.appendChild(trackName);
        trackCard.appendChild(playButton);
        musicGrid.appendChild(trackCard);
    });
}

// Play the selected track
function playTrack(trackUrl) {
    const playerContainer = document.getElementById('playerContainer');
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = trackUrl;
    playerContainer.style.display = 'flex';
    audioPlayer.play();
}

// Filter tracks based on the input text in the search field
function filterTracks() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const filteredTracks = musicList.filter((track) =>
        track.toLowerCase().includes(searchTerm)
    );
    displayTracks(filteredTracks);
}

// Close the audio player
document.getElementById('closePlayer').onclick = function () {
    const playerContainer = document.getElementById('playerContainer');
    const audioPlayer = document.getElementById('audioPlayer');
    playerContainer.style.display = 'none';
    audioPlayer.pause();
};

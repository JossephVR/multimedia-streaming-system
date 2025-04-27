let videosList = [];

window.onload = function () {
    // Connect to WebSocket server
    const SERVER_IP = 'localhost'; // <-- change this as needed
    const socket = new WebSocket(`ws://${SERVER_IP}:8080`);

    socket.onopen = function () {
        console.log('Connected to WebSocket server');
        socket.send('fetch_videos'); // Request list of videos from server
    };

    socket.onmessage = function (event) {
        videosList = JSON.parse(event.data).filter(video => video.endsWith('.mp4'));
        displayVideos(videosList);
    };

    socket.onerror = function (error) {
        console.error('WebSocket Error:', error);
    };

    // Display videos
    function displayVideos(videos) {
        const videoGrid = document.getElementById('videoGrid');
        videoGrid.innerHTML = '';
        videos.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.className = 'videoCard';

            const videoName = document.createElement('h3');
            videoName.textContent = video.split('/').pop();

            const controlsDiv = document.createElement('div');
            controlsDiv.className = 'videoControls';

            const playButton = document.createElement('button');
            playButton.textContent = 'Play';
            playButton.className = 'playButton';
            playButton.onclick = () => playVideo(video);

            controlsDiv.appendChild(playButton);
            videoCard.appendChild(videoName);
            videoCard.appendChild(controlsDiv);
            videoGrid.appendChild(videoCard);
        });
    }

    // Play video
    function playVideo(videoUrl) {
        const modal = document.getElementById('playerModal');
        const videoPlayer = document.getElementById('videoPlayer');
        videoPlayer.src = videoUrl;
        modal.style.display = 'flex';
        videoPlayer.play();
    }

    // Filter videos
    document.getElementById('searchBar').oninput = function () {
        const searchTerm = this.value.toLowerCase();
        const filteredVideos = videosList.filter(video => video.toLowerCase().includes(searchTerm));
        displayVideos(filteredVideos);
    };

    // Close modal with (X)
    document.querySelector('.closeModal').onclick = function () {
        const modal = document.getElementById('playerModal');
        const videoPlayer = document.getElementById('videoPlayer');
        modal.style.display = 'none';
        videoPlayer.pause();
    };

    // Close modal clicking outside
    window.onclick = function (event) {
        const modal = document.getElementById('playerModal');
        if (event.target === modal) {
            modal.style.display = 'none';
            document.getElementById('videoPlayer').pause();
        }
    };

    // Refresh videos every 30s
    setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send('fetch_videos');
        }
    }, 30000);
};

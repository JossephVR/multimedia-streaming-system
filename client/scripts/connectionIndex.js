let videosList = [];

// Connect to WebSocket server
const SERVER_IP = 'localhost'; // <-- change this as needed
const socket = new WebSocket(`ws://${SERVER_IP}:8080`);


socket.onopen = function () {
  console.log('Connected to WebSocket server');
  socket.send('fetch_videos');
};

socket.onmessage = function (event) {
  videosList = JSON.parse(event.data).filter(video => video.endsWith('.mp4'));
  displayMovies(videosList);
};

socket.onerror = function (error) {
  console.error('WebSocket Error:', error);
};

// Display the movies
function displayMovies(videos) {
  const movieRow = document.getElementById('movieRow');
  const movieData = [
    { title: "Transformers", image: "img/transformers.jpg" },
    { title: "Star Wars", image: "img/star_wars.jpg" },
    { title: "Avengers", image: "img/avengers.jpg" },
    { title: "Interstellar", image: "img/interstellar.jpg" },
    { title: "The Martian", image: "img/the_martian.jpg" },
    { title: "Gravity", image: "img/gravity.jpg" },
    { title: "The Lord of the Rings", image: "img/LOTR.jpg" },
    { title: "The Dark Knight", image: "img/TDK.jpg" }
  ];

  movieRow.innerHTML = '';

  movieData.forEach(movie => {
    const videoLink = videos.find(video => video.toLowerCase().includes(movie.title.toLowerCase()));

    if (videoLink) {
      const movieCard = document.createElement('div');
      movieCard.className = 'movie-card';

      const movieImage = document.createElement('img');
      movieImage.src = movie.image;
      movieImage.alt = movie.title;
      movieImage.className = 'movie-image';

      const movieTitle = document.createElement('h3');
      movieTitle.textContent = movie.title;

      movieImage.onclick = () => playVideo(videoLink);

      movieCard.appendChild(movieImage);
      movieCard.appendChild(movieTitle);
      movieRow.appendChild(movieCard);
    }
  });
}

// Play video in modal
function playVideo(videoUrl) {
  const modal = document.getElementById('playerModal');
  const videoPlayer = document.getElementById('videoPlayer');
  videoPlayer.src = videoUrl;
  modal.style.display = 'flex';
  videoPlayer.play();
}

// Close modal on close button click
document.querySelector('.closeModal').onclick = function () {
  const modal = document.getElementById('playerModal');
  const videoPlayer = document.getElementById('videoPlayer');
  modal.style.display = 'none';
  videoPlayer.pause();
};

// Close modal if clicking outside the modal content
window.onclick = function (event) {
  const modal = document.getElementById('playerModal');
  if (event.target == modal) {
    modal.style.display = 'none';
    document.getElementById('videoPlayer').pause();
  }
};

// Request new videos every 30 seconds
function fetchVideos() {
  socket.send('fetch_videos');
}

setInterval(fetchVideos, 30000);

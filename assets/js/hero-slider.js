const images = [
  'images/background1.jpg',
  'images/background2.jpg',
  'images/background3.jpg',
  'images/background4.jpg'
];

let currentImageIndex = 0;
const heroSection = document.querySelector('.hero-section');

function changeBackground() {
  heroSection.style.backgroundImage = `url('${images[currentImageIndex]}')`;
  currentImageIndex = (currentImageIndex + 1) % images.length;
}

// Wait for DOM to load before running
document.addEventListener('DOMContentLoaded', () => {
  changeBackground();
  setInterval(changeBackground, 5000);
});

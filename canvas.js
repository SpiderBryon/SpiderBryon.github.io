// Confetti animation
const confettiCanvas = document.getElementById("confetti");
const ctxConfetti = confettiCanvas.getContext("2d");
const button = document.getElementById("startButton");
const textDis = document.getElementById("title");
const clickSound = document.getElementById('clickSound');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 5 + 1;
    this.color = color;
    this.velocityX = Math.random() * 4 - 2;
    this.velocityY = Math.random() * 4 - 2;
  }
  draw() {
    ctxConfetti.beginPath();
    ctxConfetti.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctxConfetti.fillStyle = this.color;
    ctxConfetti.fill();
  }
  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.draw();
  }
}

// Function for confetti
function animateConfetti() {
  ctxConfetti.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  particles.forEach((particle, index) => {
    particle.update();
    if (particle.x > confettiCanvas.width || particle.y > confettiCanvas.height || particle.x < 0 || particle.y < 0) {
      particles.splice(index, 1);
    }
  });
  requestAnimationFrame(animateConfetti);
}

// Text and emoji animation
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const word = "Minum Lagi ni Malam";
const emojis = ['🥳  😂😂😂  🥳', '🍻  💃  🍻  💃  🍻']; // Laugh emoji and Beer emoji
let blurAmount = 30; // Start with a high blur
let animationFrameId = null;
let animationProgress = 0; // Control the progress of the blur-to-clear effect

// Define the initial positions for the emojis
let emojiPositions = emojis.map(() => getRandomPosition()); // Random starting positions for emojis

// Set the initial font and style for the text
ctx.font = "40px Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";

// Function to get random positions for the emojis
function getRandomPosition() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  return { x, y };
}

// Function to animate the text with blur effect and emojis
function animateText() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before redrawing

  // Increase the sharpness (decrease blurAmount) over time
  blurAmount = Math.max(0, 30 - animationProgress * 0.3); // Gradually reduce the blur amount
  ctx.filter = `blur(${blurAmount}px)`; // Apply blur to the text

  // Draw the text
  ctx.fillStyle = "#000000"; // Text color
  ctx.fillText(word, canvas.width / 2, canvas.height / 2);

  // Slow down the emoji movement
  emojiPositions = emojiPositions.map((pos, index) => {
    // Slowly move emojis towards the center of the canvas
    const speed = 0.03; // Controls how fast the emojis move
    const targetX = canvas.width / 2;
    const targetY = canvas.height / 2 + (index === 0 ? -50 : 50); // Position emojis above and below the text

    // Move emoji closer to the target
    pos.x += (targetX - pos.x) * speed; // Emoji move towards the center X
    pos.y += (targetY - pos.y) * speed; // Emoji move towards the center Y

    return pos;
  });

  // Draw the emojis at their new positions
  emojis.forEach((emoji, index) => {
    ctx.font = "30px Arial"; // Set the font size for the emojis
    ctx.fillText(emoji, emojiPositions[index].x, emojiPositions[index].y); // Draw the emoji at the new position
  });

  // Increase the animation progress for the blur-to-clear effect
  if (animationProgress < 100) {
    animationProgress++;
  } else {
    cancelAnimationFrame(animationFrameId); // Stop the animation once it's clear
  }

  // Request the next frame for the animation
  animationFrameId = requestAnimationFrame(animateText);
}

button.addEventListener("click", () => {
  // Trigger confetti
  for (let i = 0; i < 100; i++) {
    const x = confettiCanvas.width / 2;
    const y = confettiCanvas.height / 2;
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    particles.push(new Particle(x, y, color));
  }


  button.style.display = "none"; // Hide button after click
  textDis.style.display = 'none';
  clickSound.play();

  // Stop the sound after 3 seconds (3000 milliseconds)
  setTimeout(() => {
    clickSound.pause(); // Pause the audio
    clickSound.currentTime = 0; // Reset the audio to the start (optional)
  }, 14000);  // 3000ms = 3 seconds

  // Trigger the text and emoji animation
  animationProgress = 0; // Reset text animation progress
  emojiPositions = emojis.map(() => getRandomPosition()); // Reset emoji positions
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  animationFrameId = requestAnimationFrame(animateText); // Start text animation
});

animateConfetti(); // Start confetti animation loop



const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
const button = document.getElementById("partyButton");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.draw();
  }
}

button.addEventListener("click", () => {
  for (let i = 0; i < 100; i++) {
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    particles.push(new Particle(x, y, color));
  }

  button.style.display = "none"; // Hide button after click
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle, index) => {
    particle.update();
    if (particle.x > canvas.width || particle.y > canvas.height || particle.x < 0 || particle.y < 0) {
      particles.splice(index, 1);
    }
  });
  requestAnimationFrame(animate);
}

animate();

const wheelCanvas = document.getElementById('wheelCanvas');
const spinButton = document.getElementById('spinButton');
const resultado = document.getElementById('resultado');
let spinning = false;

const premios = [
  "10% de desconto",
  "Frete grátis",
  "Ebook exclusivo",
  "R$ 50 de desconto",
  "Pote extra",
  "15% de desconto", 
  // ... adicione mais prêmios aqui
];

function girarRoleta() {
  if (spinning) return;
  spinning = true;

  const spinAngleStart = Math.random() * 10 + 10;
  const spinTime = 0005; 
  const spinTimeTotal = spinAngleStart * spinTime;
  const endTime = new Date().getTime() + spinTimeTotal;

  const premioIndex = Math.floor(Math.random() * premios.length);
  const premio = premios[premioIndex];

  let degrees = 0;
  const rotationInterval = setInterval(() => {
    if (new Date().getTime() >= endTime) {
      clearInterval(rotationInterval);
      resultado.textContent = `Parabéns! Você ganhou: ${premio}`;
      spinning = false;
      return;
    }

    degrees += 2;
    wheelCanvas.style.transform = `rotate(${degrees}deg)`;
  }, 5);
}

spinButton.addEventListener('click', girarRoleta);

// Desenhe a roleta no canvas (substitua pelas suas cores e prêmios)
const ctx = wheelCanvas.getContext('2d');
const centerX = wheelCanvas.width / 2;
const centerY = wheelCanvas.height / 2;
const radius = centerX * 0.8;

for (let i = 0; i < premios.length; i++) {
  const angle = i * premioAngle;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, angle, angle + premioAngle);
  ctx.lineTo(centerX, centerY);

  // Define a cor de cada fatia (altere as cores conforme desejar)
  const color = i % 2 === 0 ? '#f0f0f0' : '#e0e0e0'; 
  ctx.fillStyle = color;
  ctx.fill();

  // Adiciona o texto de cada prêmio
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(angle + premioAngle / 2);
  ctx.textAlign = "right";
  ctx.fillStyle = "#333";
  ctx.font = "bold 14px Arial";
  ctx.fillText(premios[i], radius * 0.8, 10);
  ctx.restore();
}

// Desenha a seta no topo da roleta
ctx.fillStyle = 'red';
ctx.beginPath();
ctx.moveTo(centerX - 8, centerY - radius - 10);
ctx.lineTo(centerX + 8, centerY - radius - 10);
ctx.lineTo(centerX, centerY - radius);
ctx.fill();
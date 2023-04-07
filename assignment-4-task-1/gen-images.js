const { createCanvas } = require('canvas');
const fs = require('fs');

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const NUM_IMAGES = 20;

for (let i = 1; i <= NUM_IMAGES; i++) {
  const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  const ctx = canvas.getContext('2d');

  const bgColor = getRandomColor();
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  const shapeType = getRandomShapeType();
  ctx.fillStyle = getRandomColor();
  switch (shapeType) {
    case 'circle':
      const radius = Math.floor(Math.random() * 100);
      const centerX = Math.floor(Math.random() * (CANVAS_WIDTH - radius * 2)) + radius;
      const centerY = Math.floor(Math.random() * (CANVAS_HEIGHT - radius * 2)) + radius;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fill();
      break;
    case 'rectangle':
      const width = Math.floor(Math.random() * 200) + 50;
      const height = Math.floor(Math.random() * 200) + 50;
      const x = Math.floor(Math.random() * (CANVAS_WIDTH - width));
      const y = Math.floor(Math.random() * (CANVAS_HEIGHT - height));
      ctx.fillRect(x, y, width, height);
      break;
    case 'triangle':
      const size = Math.floor(Math.random() * 100) + 50;
      const x1 = Math.floor(Math.random() * (CANVAS_WIDTH - size));
      const y1 = Math.floor(Math.random() * (CANVAS_HEIGHT - size));
      const x2 = x1 + size;
      const y2 = y1;
      const x3 = x1 + size / 2;
      const y3 = y1 + size;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x3, y3);
      ctx.closePath();
      ctx.fill();
      break;
  }

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(`${i}.png`, buffer);
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function getRandomShapeType() {
  const shapeTypes = ['circle', 'rectangle', 'triangle'];
  const randomIndex = Math.floor(Math.random() * shapeTypes.length);
  return shapeTypes[randomIndex];
}

import noise from "./perlin.js";

let tick = 0;
const bgColorInput = document.querySelector('#bg-color');
const colorInput = document.querySelector('#color');

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
canvas.width = document.documentElement.clientWidth * 0.8;
canvas.height = document.documentElement.clientHeight * 0.8;

bgColorInput.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--bg-color', e.currentTarget.value);
});
colorInput.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--color', e.currentTarget.value);
});

requestAnimationFrame(function frame() {
    tick++;
    const color = getComputedStyle(document.documentElement).getPropertyValue('--color');
    const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-color');
    drawFrame(tick, color, bgColor);
    requestAnimationFrame(frame);
});

function drawFrame(tick, color, bgColor) {
    const
        w = canvas.width,
        h = canvas.height,
        margin = 5,
        countVertical = h / margin + 1,
        countHorisontal = w / margin + 1;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = color;
    for (let j = -margin; j < countVertical; j++) {
        ctx.beginPath()
        for (let i = 0; i < countHorisontal; i++) {
            ctx.lineTo(i * margin, j * margin + margin * 10 * noise(100 * i / 800, j * 100 / 800, tick / 100));
        }
        ctx.stroke();
    }
}

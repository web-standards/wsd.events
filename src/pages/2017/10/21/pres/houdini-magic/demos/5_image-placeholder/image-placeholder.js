import noise from "./perlin.js";

registerPaint('image-with-placeholder', class {
    static get inputProperties() {
        return [
            '--image',
            '--tick',
            'color',
            'background-color',
        ];
    }

    static get contextOptions() {
        return {
            alpha: true
        };
    }

    static get inputArguments() { return ['<number>']; }

    paint(ctx, geom, properties, args) {
        const margin = parseInt(args[0].toString());
        const
            color = properties.get('color').toString(),
            bgColor = properties.get('background-color').toString(),
            img = properties.get('--image'),
            tick = parseInt(properties.get('--tick').toString());
        switch (img.state) {
            case 'loaded':
                ctx.drawImage(img, 0, 0, geom.width, geom.height);
                break;
            case 'error':
                // draw invalid image placeholder
                break;
            default:
                drawFrame(ctx, geom, tick, color, bgColor, margin);
                break;
        }

    }
});

function drawFrame(ctx, geom, tick, color, bgColor, margin) {
    const
        w = geom.width,
        h = geom.height,
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

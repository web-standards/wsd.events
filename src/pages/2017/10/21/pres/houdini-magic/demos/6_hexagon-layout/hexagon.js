registerPaint('hexagon', class {
    static get inputProperties() {
        return [
            '--background-color',
            '--border-color',
        ];
    }

    paint(ctx, size, styleMap) {
        const bgColor = styleMap.get('--background-color');
        const borderColor = styleMap.get('--border-color');
        const w = size.width;
        const h = size.height;

        ctx.fillStyle = bgColor;
        ctx.strokeStyle = borderColor;
        const lineSize = 1;
        ctx.lineWidth = lineSize * 2;
        ctx.beginPath();
        const points = [
            { x: lineSize, y: h / 4 },
            { x: w / 2, y: lineSize },
            { x: w - lineSize, y: h / 4 },
            { x: w - lineSize, y: 3 * h / 4 },
            { x: w / 2, y: h - lineSize },
            { x: lineSize, y: 3 * h / 4 },
        ];
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < 6; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
});

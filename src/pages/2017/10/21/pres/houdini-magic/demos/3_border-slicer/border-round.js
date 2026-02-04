registerPaint('border-round', class {
  static get inputProperties() {
    return [
      'background-color',
    ];
  }

  paint(ctx, size, styleMap) {
    const bgColor = styleMap.get('background-color');
    const w = size.width;
    const h = size.height;
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.ellipse(w / 2, -h, w / 2 * Math.sqrt(2), h * Math.sqrt(2), Math.PI, 0, 2 * Math.PI);
    ctx.fill();
  }
});

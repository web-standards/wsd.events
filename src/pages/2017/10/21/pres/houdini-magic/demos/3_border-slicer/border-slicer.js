registerPaint('border-slicer', class {
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
    ctx.moveTo(0, 0);
    ctx.lineTo(0, h);
    ctx.lineTo(w, 0);
    ctx.fill();
  }
});

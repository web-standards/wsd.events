(() => {
  const presWithHighlights = document.querySelectorAll('pre[data-highlight-lines]');
  const color = 'khaki';

  const addHighlights = (item) => {
    const preStyle = getComputedStyle(item);
    const lineHeight = parseFloat(preStyle.lineHeight);
    const lines = item.dataset['highlightLines']
      .split(',');

    if (lines.length > 0) {
      const gradientsList = lines.reduce((prev, item) => {
        const itemNum = +item;
        const start = (itemNum - 1) * lineHeight;
        const stop = itemNum * lineHeight;
        const gradient = `linear-gradient(to bottom,
          transparent ${start}px,
          ${color} ${start}px, ${color} ${stop}px,
          transparent 0)`;

        prev.push(gradient);
        return prev;
      },[]);

      item.style.backgroundImage = gradientsList.join(',');
    }
  }

  presWithHighlights.forEach(addHighlights);
})();

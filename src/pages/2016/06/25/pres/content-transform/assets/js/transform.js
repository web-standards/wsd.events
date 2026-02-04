(function () {

    var s = Snap('#canvas');

    function runQueue(queue, cb) {
        function loop(index) {
            queue[index](function () {
                if (queue.length > index + 1) {
                    loop(index + 1);
                } else {
                    cb();
                }
            });
        }

        loop(0);
    }

    function renderSourceCode(paper, x, y, cb) {
        var codeBlock = paper.group().addClass('source-code');

        codeBlock.add(paper.rect(x + 0.5, y + 0.5, 110, 130).addClass('paper'));

        (function (dx, dy) {
            function animatedText(ddx, ddy, text) {
                return function (done) {
                    codeBlock.text(dx + ddx, dy + ddy + 10, text)
                        .attr('opacity', 0)
                        .animate({y: '-=10px', opacity: 1}, 100, mina.easein, done);
                }
            }

            runQueue([
                animatedText(0, 0, '<div>'),
                animatedText(6, 12, '<h1>'),
                animatedText(12, 24, 'Introduction'),
                animatedText(6, 36, '</h1>'),
                animatedText(6, 48, '<div>'),
                animatedText(12, 60, '<p>'),
                animatedText(18, 72, 'Hello, world!'),
                animatedText(12, 84, '</p>'),
                animatedText(6, 96, '</div>'),
                animatedText(0, 108, '</div>')
            ], cb);
        }(x + 10, y + 15));

        return codeBlock;
    }

    function renderTransformedCode(paper, x, y, cb) {
        var codeBlock = paper.group().addClass('transformed-code');

        codeBlock.add(paper.rect(x + 0.5, y + 0.5, 110, 106).addClass('paper'));

        (function (dx, dy) {
            function animatedText(ddx, ddy, text) {
                return function (done) {
                    codeBlock.text(dx + ddx, dy + ddy + 10, text)
                        .attr('opacity', 0)
                        .animate({y: '-=10px', opacity: 1}, 100, mina.easein, done);
                }
            }

            runQueue([
                animatedText(0, 0, '<div class="div">'),
                animatedText(6, 12, '<h1 class="h1">'),
                animatedText(12, 24, 'Introduction'),
                animatedText(6, 36, '</h1>'),
                animatedText(6, 48, '<p class="p">'),
                animatedText(12, 60, 'Hello, world!'),
                animatedText(6, 72, '</p>'),
                animatedText(0, 84, '</div>')
            ], cb);
        }(x + 10, y + 15));

        return codeBlock;
    }

    function renderSourceTree(paper, x, y, cb) {
        var treeBlock = paper.group().addClass('source-tree')
            .attr('transform', 'matrix(1 0 0 1 -50 0)');
        var treeBranch = treeBlock.group().addClass('branch');

        function renderBoxedText(g, dx, dy, w, h, text, line) {
            return function (done) {
                var boxedText = g.group();
                var branch = treeBranch.line(line.x1, line.y1, line.x2, line.y2 - 10);

                boxedText.rect(dx + 0.5, dy + 0.5, w, h).addClass('paper');
                boxedText.text(dx + w / 2, dy + 1 + h / 2, text)
                    .attr('text-anchor', 'middle')
                    .attr('alignment-baseline', 'middle');

                branch
                    .attr('opacity', 0)
                    .animate({y2: '+=10', opacity: 1}, 100, mina.easein);

                boxedText
                    .attr('transform', 'matrix(1,0,0,1,0,-10)')
                    .animate({transform: 'matrix(1,0,0,1,0,0)'}, 100, mina.easein, done);
            };
        }

        (function (dx, dy) {
            runQueue([
                renderBoxedText(treeBlock, dx + 35, dy, 30, 20, 'div',
                    {x1: x + 35 + 15, y1: y + 10, x2: x + 35 + 15, y2: y + 10}),
                renderBoxedText(treeBlock, dx - 5, dy + 40, 30, 20, 'h1',
                    {x1: x + 35 + 15, y1: y + 10, x2: x + 10, y2: y + 50}),
                renderBoxedText(treeBlock, dx - 25, dy + 80, 70, 20, 'Introduction',
                    {x1: x + 10, y1: y + 50, x2: x - 20 + 30, y2: y + 90}),
                renderBoxedText(treeBlock, dx + 75, dy + 40, 30, 20, 'div',
                    {x1: x + 40 + 15, y1: y + 10, x2: x + 70 + 20, y2: y + 50}),
                renderBoxedText(treeBlock, dx + 75, dy + 80, 30, 20, 'p',
                    {x1: x + 75 + 15, y1: y + 50, x2: x + 70 + 20, y2: y + 90}),
                renderBoxedText(treeBlock, dx + 55, dy + 120, 70, 20, 'Hello, world!',
                    {x1: x + 75 + 15, y1: y + 90, x2: x + 50 + 40, y2: y + 130})
            ], cb)
        }(x, y));

        return treeBlock;
    }

    function renderTransformedTree(paper, x, y, cb) {
        var treeBlock = paper.group().addClass('transformed-tree')
            .attr('transform', 'matrix(1 0 0 1 -55 0)');
        var treeBranch = treeBlock.group().addClass('branch');

        function renderBoxedText(g, dx, dy, w, h, text, line) {
            return function (done) {
                var boxedText = g.group();
                var branch = treeBranch.line(line.x1, line.y1, line.x2, line.y2 - 10);

                boxedText.rect(dx + 0.5, dy + 0.5, w, h).addClass('paper');
                if (typeof text === 'string') {
                    boxedText.text(dx + w / 2, dy + 1 + h / 2, text)
                        .attr('text-anchor', 'middle')
                        .attr('alignment-baseline', 'middle');
                } else {
                    text.forEach(function (tspan, index) {
                        boxedText.text(dx + w / 2, dy + 1 + h / 2 + (index - (text.length - 1) / 2) * 10, tspan)
                            .attr('text-anchor', 'middle')
                            .attr('alignment-baseline', 'middle');
                    });
                }

                branch
                    .attr('opacity', 0)
                    .animate({y2: '+=10', opacity: 1}, 100, mina.easein);

                boxedText
                    .attr('transform', 'matrix(1,0,0,1,0,-10)')
                    .animate({transform: 'matrix(1,0,0,1,0,0)'}, 100, mina.easein, done);
            }
        }

        (function (dx, dy) {
            runQueue([
                renderBoxedText(treeBlock, dx + 30, dy, 50, 30, ['div', '@class'],
                    {x1: x + 30 + 25, y1: y + 15, x2: x + 30 + 25, y2: y + 15}),
                renderBoxedText(treeBlock, dx - 10, dy + 50, 50, 30, ['h1', '@class'],
                    {x1: x + 30 + 25, y1: y + 15, x2: x - 10 + 25, y2: y + 65}),
                renderBoxedText(treeBlock, dx - 20, dy + 100, 70, 20, 'Introduction',
                    {x1: x - 10 + 25, y1: y + 65, x2: x - 20 + 35, y2: y + 110}),
                renderBoxedText(treeBlock, dx + 70, dy + 50, 50, 30, ['p', '@class'],
                    {x1: x + 30 + 25, y1: y + 15, x2: x + 80 + 15, y2: y + 65}),
                renderBoxedText(treeBlock, dx + 60, dy + 100, 70, 20, 'Hello, world!',
                    {x1: x + 80 + 15, y1: y + 65, x2: x + 60 + 35, y2: y + 110})
            ], cb)
        }(x, y));

        return treeBlock;
    }

    function renderHeader(paper, x, y, text, cb) {
			setTimeout(function () {
				paper.text(x, y, text)
					.addClass('heading')
					.attr('opacity', 0)
					.animate({opacity: 1}, 300, mina.linear)
			}, 500);

			cb();
    }

    function renderArc(paper, x1, x2, xc, cb) {
      const y = 60.5;

      paper.line(x1, y, x1, y)
        .attr({
          stroke: 'black',
          'stroke-width': 1
        })
        .animate({x2: x2}, 1000, mina.easeinout, cb);

      setTimeout(function () {
        paper.circle(xc, y, 0)
          .attr({
            fill: 'white',
            stroke: 'black',
            'stroke-width': 1
          })
          .animate({r: 5}, 300, mina.easein);
      }, 500);
    }

  renderSourceCode(s, 15, 90, function () {
    renderHeader(s, 140, 30, 'Parse HTML', function () {
      renderArc(s, 70, 230, 140, function () {
        renderSourceTree(s, 230, 90, function () {
          renderHeader(s, 320, 30, 'Apply transformations', function () {
            renderArc(s, 230, 410, 320, function () {
              renderTransformedTree(s, 410, 90, function () {
                renderHeader(s, 500, 30, 'Serialize', function () {
                  renderArc(s, 410, 570, 500, function () {
                    renderTransformedCode(s, 515, 90, function () {
                      // done
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });

    // 15 110 30 150 30 150 30 110 15

}());
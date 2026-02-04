hljs.LANGUAGES.makefile = function(a) {
	return {
		k: {
			keyword: 'mkdir cat uglifyjs'
		},
		c: [
			{
				cN: 'string',
				b: '\\$\\(', e: '\\)'
			},
			{
				cN: 'string',
				b: '[a-z\\.]+/', e: '.js'
			}
		]
	};
}(hljs);

if (document.querySelectorAll) {
	var blocks = document.querySelectorAll('pre code[class^="language-"]');
	for (var blockIdx = 0; blockIdx < blocks.length; blockIdx++) {
		var block = blocks[blockIdx];
		block.parentNode.className = block.className;
		hljs.highlightBlock(block.parentNode);
	}
}

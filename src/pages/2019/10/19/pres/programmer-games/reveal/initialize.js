// Full list of configuration options available at:
// https://github.com/hakimel/reveal.js#configuration

var defaultRevealConfiguration = {
	controls: true,
	progress: true,
	slideNumber: true,
	history: true,
	keyboard: true,
	overview: false,
	center: true,
	showNotes: false,
	width: 960,
	height: 700,
	margin: 0.1,
	minScale: 0.2,
	maxScale: 1.5,
	transition: 'none',
	markdown: {
		configureRenderer: function (renderer) {
			var widthAndHeightRegExp = /\s+\=\s*([0-9]+\%?)?((x)|(x([0-9]+\%?)))?\s*$/i;
			renderer.image = function (href, title, text) {
				var out = '<img src="' + href.replace(widthAndHeightRegExp, "") + '" alt="' + text + '"';
				if (title) {
					out += ' title="' + title + '"'
				}
				var match = href.match(widthAndHeightRegExp);
				if (match) {
					var width = match[1];
					if (width)
						out += ' width="' + width + '"';
					var height = match[5];
					if (height)
						out += ' height="' + height + '"';
				}
				out += this.options.xhtml ? "/>" : ">";
				return out;
			}
		},
		breaks: true,
		gfm: true,
		smartList: true,
		smartypants: true
	},
	dependencies: [
		{ src: 'reveal/plugin/markdown-modified/marked.js' },
		{ src: 'reveal/plugin/markdown-modified/markdown.js' },
		{ src: 'reveal/plugin/notes/notes.js', async: true },
		{ src: 'reveal/plugin/highlight/highlight.js', async: true, callback: function () { hljs.initHighlightingOnLoad(); } },
		{ src: 'reveal/plugin/menu-modified/menu.js' }
	],
	menu: {
		side: 'left',
		numbers: false,
		titleSelector: 'h1, h2, h3',
		hideMissingTitles: true,
		markers: false,
		custom: false,
		themes: [
			{ name: 'Светлая', theme: 'reveal/css/theme/kontur-light.css' },
			{ name: 'Темная', theme: 'reveal/css/theme/kontur-dark.css' }
		],
		transitions: false,
		openButton: true,
		openSlideNumber: true,
		keyboard: true
	}
};

Reveal.addEventListener('ready', function (event) {
	window.revealReady && window.revealReady(event);
});

Reveal.initialize(window.revealConfigure
	? revealConfigure(defaultRevealConfiguration)
	: defaultRevealConfiguration);
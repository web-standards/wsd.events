# Ribbon theme for Shower

Follow [@shower_me](https://twitter.com/shower_me) for support and updates, [file an issue](https://github.com/shower/shower/issues) in case of any problem. Part of the [Shower](https://github.com/shower/shower/) presentation template, [see wiki](https://github.com/shower/shower/wiki) for more information.

[Ribbon theme for Shower in action](http://shwr.me/shower/themes/ribbon/).

## Using theme

The easiest way to use Ribbon theme is to download Shower template: [shower.zip](shwr.me/shower.zip) (1.2 MB). There are two built-in themes: Ribbon and Bright. But if you want to keep theme up to date it’s better to use [bower](http://bower.io/) or [npm](https://www.npmjs.org/) package managers.

### bower

1. Make sure you have [Node.js](http://nodejs.org/) installed, [install bower](http://bower.io/#install-bower) as well
2. Run `bower install shower-ribbon`
3. Link theme files from `bower_components/shower-ribbon` to your presentation
4. There’s `index.html` file inside demonstrating all Ribbon features

### npm

1. Make sure you have [Node.js](http://nodejs.org/) installed
2. Run `npm install shower-ribbon`
3. Link theme files from `node_modules/shower-ribbon` to your presentation
4. There’s `index.html` file inside demonstrating all Ribbon features

## Customizing theme

If you want to build your own theme based on Ribbon you need to set up development environment based on Node.js and Grunt.

1. Make sure you have [Git](http://git-scm.com/), [Node.js](http://nodejs.org/), [Grunt](http://gruntjs.com/getting-started#installing-the-cli) and [bower](http://bower.io/) installed
2. [Fork Ribbon repository](https://github.com/shower/ribbon/fork), clone your fork to a local computer
3. Run `npm install` and `bower install` to get all dependencies
4. Runt `grunt` to start local server with watcher and livereload
5. Edit theme, mostly SCSS files inside `styles` folder

---
Licensed under [MIT License](http://en.wikipedia.org/wiki/MIT_License), see [license page](https://github.com/shower/shower/wiki/MIT-License) for details.

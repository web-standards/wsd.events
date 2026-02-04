const groupsData = {
  'automating': {
    name: 'Automating'
  },
  'browsers': {
    name: 'Browsers'
  },
  'css-properties': {
    name: 'CSS properties'
  },
  'css-editors-tools': {
    name: 'CSS editors tools'
  },
  'css-preprocessors': {
    name: 'CSS preprocessors'
  },
  'css-toolkits': {
    name: 'CSS toolkits'
  },
  'features-detection': {
    name: 'Features detection'
  },
  'fonts': {
    name: 'Fonts'
  },
  'git': {
    name: 'Git'
  },
  'js': {
    name: 'JS'
  },
  'linters': {
    name: 'Linters'
  },
  'markup': {
    name: 'Markup'
  },
  'node': {
    name: 'Node'
  },
};

const data = [
  {
    name: 'Git',
    years: {
      start: 2005
    },
    group: 'git',
    links: [
      {
        name: 'contributors',
        url: 'https://github.com/git/git/graphs/contributors'
      }
    ]
  },
  {
    name: 'GitHub',
    years: {
      start: 2008
    },
    group: 'git',
    links: [
      {
        name: 'intro',
        url: 'https://github.blog/2008-04-10-we-launched/'
      }
    ]
  },
  {
    name: 'Node.js',
    years: {
      start: 2009
    },
    group: 'node',
    links: [
      {
        name: 'changelog',
        url: 'https://github.com/nodejs/node/blob/master/CHANGELOG.md'
      }
    ]
  },
  {
    name: 'Npm',
    years: {
      start: 2010
    },
    group: 'node',
    links: [
      {
        name: 'contributors',
        url: 'https://github.com/npm/cli/graphs/contributors'
      },
      {
        name: 'releases',
        url: 'https://github.com/npm/npm/releases?after=v0.1.1'
      }
    ]
  },
  {
    name: 'Caniuse',
    years: {
      start: 2012
    },
    group: 'features-detection',
    links: [
      {
        name: 'contributors',
        url: 'https://github.com/Fyrd/caniuse/graphs/contributors'
      }
    ]
  },
  {
    name: 'Autoprefixer',
    years: {
      start: 2013
    },
    group: 'features-detection',
    links: [
      {
        name: 'css-tricks',
        url: 'https://css-tricks.com/autoprefixer/'
      }
    ]
  },
  {
    name: 'Grunt',
    years: {
      start: 2011
    },
    group: 'automating',
    links: [
      {
        name: 'contributors',
        url: 'https://github.com/gruntjs/grunt/graphs/contributors',
      },
      {
        name: 'intro',
        url: 'https://bocoup.com/blog/introducing-grunt'
      }
    ]
  },
  {
    name: 'Gulp',
    years: {
      start: 2013
    },
    group: 'automating',
    links: [
      {
        name: 'contributors',
        url: 'https://github.com/gulpjs/gulp/graphs/contributors'
      }
    ]
  },
  {
    name: 'Webpack',
    years: {
      start: 2012
    },
    group: 'automating',
    links: [
      {
        name: 'contributors',
        url: 'https://github.com/webpack/webpack/graphs/contributors'
      }
    ]
  },
  {
    name: 'BEM',
    years: {
      start: 2005
    },
    group: 'css-toolkits',
    links: [
      {
        name: 'history',
        url: 'https://ru.bem.info/methodology/history/'
      }
    ]
  },
  {
    name: 'Bootstrap',
    years: {
      start: 2011
    },
    group: 'css-toolkits',
    links: [
      {
        name: 'contributors',
        url: 'https://github.com/twbs/bootstrap/graphs/contributors'
      }
    ]
  },
  {
    name: 'Compass',
    years: {
      start: 2008,
      end: 2014
    },
    group: 'css-toolkits',
    links: [
      {
        name: 'contributors',
        url: 'https://github.com/Compass/compass/graphs/contributors'
      },
      {
        name: 'last release',
        url: 'http://compass-style.org/blog/'
      }
    ]
  },
  {
    name: 'Eslint',
    years: {
      start: 2013
    },
    group: 'linters',
    links: [
      {
        name: 'contributors',
        url: 'https://github.com/eslint/eslint/graphs/contributors'
      }
    ]
  },
  {
    name: 'Styleslint',
    years: {
      start: 2014
    },
    group: 'linters',
    links: [
      {
        name: 'contributors',
        url: 'https://github.com/stylelint/stylelint/graphs/contributors'
      }
    ]
  },
  {
      name: 'Editorconfig',
      years: {
        start: 2012
      },
      group: 'linters',
      links: [
        {
          name: 'contributors',
          url: 'https://github.com/editorconfig/editorconfig/graphs/contributors'
        }
      ]
  },
  {
    name: 'Font-face',
    years: {
      start: 2008
    },
    group: 'fonts',
    links: [
      {
        name: 'caniuse',
        url: 'https://caniuse.com/#feat=fontface'
      }
    ]
  },
  {
    name: 'Google Fonts',
    years: {
      start: 2010
    },
    group: 'fonts',
    links: [
      {
        name: 'intro',
        url: 'http://googlecode.blogspot.com/2010/05/introducing-google-font-api-google-font.html'
      }
    ]
  },
  {
    name: 'Font Awesome',
    years: {
      start: 2012
    },
    group: 'fonts',
    links: [
      {
        name: 'releases',
        url: 'https://github.com/FortAwesome/Font-Awesome/releases?after=v3.2.0'
      }
    ]
  },
  {
    name: 'Sass',
    years: {
      start: 2006
    },
    group: 'css-preprocessors',
    links: [
      {
        name: 'contributors',
        url: 'https://github.com/sass/ruby-sass/graphs/contributors'
      }
    ]
  },
  {
    name: 'Less',
    years: {
      start: 2009
    },
    group: 'css-preprocessors',
    links: [
      {
        name: 'less history',
        url: 'http://lesscss.org/about/#history'
      }
    ]
  },
  {
    name: 'Stylus',
    years: {
      start: 2010
    },
    group: 'css-preprocessors',
    links: [
      {
        name: 'contributors',
        url: 'https://github.com/stylus/stylus/graphs/contributors'
      }
    ]
  },
  {
    name: 'Custom Properties',
    years: {
      start: 2014
    },
    group: 'css-properties',
    links: [
      {
        name: 'caniuse',
        url: 'https://caniuse.com/#feat=css-variables'
      }
    ]
  },
  {
    name: 'Zen Coding',
    years: {
      start: 2009,
      end: 2013
    },
    group: 'css-editors-tools',
    links: [
      {
        name: 'smashing',
        url: 'https://www.smashingmagazine.com/2009/11/zen-coding-a-new-way-to-write-html-code/'
      }
    ]
  },
  {
    name: 'Emmet',
    years: {
      start: 2012
    },
    group: 'css-editors-tools',
    links: [
      {
        name: 'smashing',
        url: 'https://www.smashingmagazine.com/2013/03/goodbye-zen-coding-hello-emmet/) '
      },
      {
        name: 'github',
        url: 'https://github.com/sergeche/zen-coding'
      }
    ]
  },
  {
    name: 'Hayaku',
    years: {
      start: 2012
    },
    group: 'css-editors-tools',
    links: [
      {
        name: 'habr',
        url: 'https://habr.com/ru/post/160057/'
      }
    ]
  },
  {
    name: 'JQuery',
    years: {
      start: 2006
    },
    group: 'js',
    links: [
      {
        name: 'history',
        url: 'https://jquery.org/history/'
      }
    ]
  },
  {
    name: 'Angular',
    years: {
      start: 2010
    },
    group: 'js',
    links: [
      {
        name: 'contributors',
        url: 'https://github.com/angular/angular.js/graphs/contributors'
      }
    ]
  },
  {
    name: 'TypeScript',
    years: {
      start: 2012
    },
    group: 'js',
    links: [
      {
        name: 'announce',
        url: 'https://devblogs.microsoft.com/typescript/announcing-typescript-0-8-1/'
      }
    ]
  },
  {
    name: 'Babel',
    years: {
      start: 2012
    },
    group: 'js',
    links: [
      {
        name: 'contributors',
        url: 'https://github.com/babel/babel/graphs/contributors'
      }
    ]
  },
  {
    name: 'React',
    years: {
      start: 2013
    },
    group: 'js',
    links: [
      {
        name: 'contributors',
        url: 'https://github.com/facebook/react/graphs/contributors'
      }
    ]
  },
  {
    name: 'Flow',
    years: {
      start: 2014
    },
    group: 'js',
    links: [
      {
        name: 'intro',
        url: 'https://engineering.fb.com/web/flow-a-new-static-type-checker-for-javascript/'
      }
    ]
  },
  {
    name: 'Vue',
    years: {
      start: 2014
    },
    group: 'js',
    links: [
      {
        name: 'intro',
        url: 'https://blog.evanyou.me/2014/02/11/first-week-of-launching-an-oss-project/'
      }
    ]
  },
  {
    name: 'Svelte',
    years: {
      start: 2016
    },
    group: 'js',
    links: [
      {
        name: 'contributors',
        url: 'https://github.com/sveltejs/svelte/graphs/contributors'
      }
    ]
  },
  {
    name: 'SVG',
    years: {
      start: 2010
    },
    group: 'markup',
    links: [
      {
        name: 'caniuse',
        url: 'https://caniuse.com/#search=svg'
      }
    ]
  },
  {
    name: 'HTML5',
    years: {
      start: 2014
    },
    group: 'markup',
    links: [
      {
        name: 'intro',
        url: 'https://www.w3.org/2014/10/html5-rec.html.en'
      }
    ]
  },
  {
    name: 'Border-radius without prefixes',
    years: {
      start: 2010
    },
    group: 'css-properties',
    links: [
       {
        name: 'caniuse',
        url: 'https://caniuse.com/#feat=border-radius'
       }
    ]
  },
  {
    name: 'Gradients without prefixes',
    years: {
      start: 2013
    },
    group: 'css-properties',
    links: [
     {
      name: 'caniuse',
      url: 'https://caniuse.com/#feat=mdn-css_types_image_gradient_linear-gradient'
     }
    ]
  },
  {
    name: 'Box-shadow without prefixes',
    years: {
      start: 2011
    },
    group: 'css-properties',
    links: [
      {
        name: 'caniuse',
        url: 'https://caniuse.com/#feat=css-boxshadow'
      }
    ]
  },
  {
    name: 'Flex without prefixes',
    years: {
      start: '2015'
    },
    group: 'css-properties',
    links: [
      {
        name: 'caniuse',
        url: 'https://caniuse.com/#feat=flexbox'
      }
    ]
  },
  {
    name: 'Grids',
    years: {
      start: '2017'
    },
    group: 'css-properties',
    links: [
      {
        name: 'caniuse',
        url: 'https://caniuse.com/#search=grid'
      }
    ]
  },
  {
    name: 'Web developer',
    years: {
      start: 2003
    },
    group: 'browsers',
    links: [
      {
        name: 'logs',
        url: 'https://chrispederick.com/work/web-developer/history/firefox/'
      }
    ]
  },
  {
    name: 'Firebug',
    years: {
      start: 2006,
      end: 2017
    },
    group: 'browsers',
    links: [
      {
        name: 'site',
        url: 'https://getfirebug.com/'
      }
    ]
  },
  {
    name: 'Chrome',
    years: {
      start: 2008
    },
    group: 'browsers',
    links: [
      {
        name: 'release',
        url: 'https://googleblog.blogspot.com/2008/09/google-chrome-now-live.html'
      }
    ]
  },
  {
    name: 'Chrome Dev Tools',
    years: {
      start: 2011
    },
    group: 'browsers',
    links: [
      {
        name: 'html5 rocks',
        ulr: 'https://www.html5rocks.com/en/tutorials/developertools/part1/',
        name: 'Paul Irish',
        ulr: 'https://www.paulirish.com/2011/a-re-introduction-to-the-chrome-developer-tools/'
      }
    ]
  },
  {
    name: 'caniemail',
    years: {
      start: 2019
    },
    group: 'features-detection',
    links: [
      {
        name: 'contributors',
        url: 'https://github.com/hteumeuleu/caniemail/graphs/contributors'
      }
    ]
  }
];

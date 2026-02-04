module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			task: {
				files: {
					'styles/screen.css': 'styles/screen.scss'
				}
			}
		},
		autoprefixer: {
			task: {
				src: 'styles/screen.css'
			}
		},
		cssmin: {
			task: {
				files: {
					'styles/screen.css': 'styles/screen.css'
				}
			}
		},
		usebanner: {
			task: {
				options: {
					banner: '/**\n * <%= pkg.description %>\n * <%= pkg.name %> v<%= pkg.version %>, <%= pkg.homepage %>\n * Copyright © 2010–<%= grunt.template.today("yyyy") %> Vadim Makeev, http://pepelsbey.net\n * Licensed under MIT license: <%= pkg.licenses[0].url %>\n */'
				},
				files: {
					'styles/screen.css': 'styles/screen.css'
				}
			}
		},
		connect: {
			task: {
				options: {
					base: ['../core', '.'],
					livereload: true,
					open: true
				}
			}
		},
		watch: {
			styles: {
				files: 'styles/*.scss',
				tasks: 'styles'
			},
			livereload: {
				options: {
					livereload: true
				},
				files: [
					'fonts/*',
					'images/*',
					'pictures/*',
					'styles/screen.css',
					'index.html'
				]
			}
		},
		bump: {
			options: {
				files: ['package.json', 'bower.json'],
				commitFiles: ['package.json', 'bower.json'],
				pushTo: 'origin'
			}
		}
	});

	grunt.registerTask('styles', [
		'sass',
		'autoprefixer',
		'cssmin',
		'usebanner'
	]);

	grunt.registerTask('default', [
		'styles',
		'connect',
		'watch'
	]);

};

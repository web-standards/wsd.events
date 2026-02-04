/*jshint node:true*/
module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		shower: {
			index: {
				title: 'Grunt.js: система сборки для фронтенд-разработчиков — Артём Сапегин',
				lang: 'ru',
				src: 'src/index.md',
				styles: 'src/styles.css',
				scripts: [
					'highlight/highlight.pack.js',
					'src/script.js'
				]
			}
		},
		watch: {
			shower: {
				files: 'src/*',
				tasks: 'shower'
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-shower-markdown');
	
	grunt.registerTask('default', 'shower');
	grunt.registerTask('deploy', 'shower');
};

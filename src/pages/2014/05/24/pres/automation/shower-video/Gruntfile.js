module.exports = function(grunt) {
    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    // measuring processing time
    require('time-grunt')(grunt);

    // Tasks
    grunt.initConfig({
		uglify: {
			dist: {
                options: {
                    preserveComments: 'some'
                },
				files: {
					'shower-video.min.js': ['shower-video.js']
				}
			}
		},
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'shower-video.css': 'shower-video.scss'
                }
            }
        },
        watch: {
            scripts: {
                files: ['**/*.scss','**/*.js'],
                tasks: ['sass','uglify']
            }
        }
    });

    // Init server-side
    grunt.registerTask('default', ['sass','uglify']);
};
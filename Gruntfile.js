module.exports = function(grunt) {

    // Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
				src: [
					'source/js/init.js'
				],
				dest: 'public/js/production.js'
			}
        },
        uglify: {
			build: {
				src: 'public/js/production.js',
				dest: 'public/js/production.min.js'
			}
		},
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'public/style.css': 'source/css/style.scss',
					'public/styleguide/css/styleguide.css': 'public/styleguide/css/styleguide.scss',
					'public/styleguide/css/styleguide-specific.css': 'public/styleguide/css/styleguide-specific.scss'
				}
			}
		},
		autoprefixer: {
			single_file: {
				src: 'public/style.css',
				dest: 'public/style.css'
			}
        },
		shell: {
            patternlab: {
                command: "php core/builder.php -gp"
            }
        },
        imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'source/images',
					src: ['**/*.{png,jpg,gif,svg}'],
					dest: 'public/images'
				}]
			}
		},
		copy: {
		  main: {
		    files: [
		      { src:"public/style.css", dest:"../wordpress/wp-content/themes/frostfinery/style.css" },
              { src:"public/js/production.min.js", dest:"../wordpress/wp-content/themes/frostfinery/js/production.min.js" },
		      { src:"source/js/modernizr.js", dest:"public/js/modernizr.js" },
		      { expand: true, cwd: 'public/', src:"images/*", dest:"../../wordpress/wp-content/themes/frostfinery/" }
		    ]
		  }
		},
		watch: {
            all: {
                files: ['*'],
                options: {
                	livereload: {
						port: 9100
					}
                }
            },
			html: {
				files: ['source/_patterns/**/*.mustache', 'source/_patterns/**/*.json', 'source/_data/*.json'],
				tasks: ['shell:patternlab'],
				options: {
					livereload: {
						port: 9100
					}
				}
			},
			scripts: {
				files: ['source/js/*.js', 'source/js/**/*.js'],
				tasks: ['concat', 'uglify', 'copy'],
				options: {
					livereload: {
						port: 9100
					}
				}
			},
			css: {
				files: ['source/css/*.scss', 'source/css/**/*.scss', 'public/styleguide/css/**/*.scss'],
				tasks: ['sass','autoprefixer', 'copy'],
				options: {
					livereload: {
						port: 9100
					}
				}
			},
			images: {
				files: ['**/*.{png,jpg,gif}'],
				tasks: ['imagemin', 'copy'],
				options: {
					spawn: false
				}
			}
		}
    });

	// Plugins
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	// Tasks
	grunt.registerTask('default', ['concat', 'uglify', 'sass', 'watch', 'copy', 'autoprefixer', 'shell:patternlab', 'imagemin']);
};

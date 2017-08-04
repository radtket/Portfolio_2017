const mozjpeg = require('imagemin-mozjpeg');
const svgo = require('imagemin-svgo');

module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            scss: {
                files: ['dev/src/scss/**/*.scss'],
                tasks: ['sass:dev', 'postcss'],
            },
            js: {
                files: ['dev/src/js/*.js'],
                tasks: ['uglify:dev'],
            },
        },

        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'dev/css/application.css': 'dev/src/scss/application.scss'
                },
            },
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'dev/css/*.css',
                        'dev/js/*.js',
                        'dev/*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './dev/'
                }
            }
        },

        postcss: {
          options: {
            map: {
                inline: false, // save all sourcemaps as separate files...
                annotation: 'dev/css/maps/', // ...to the specified directory
            },
            processors: [
              require('pixrem')(), // add fallbacks for rem units
              require('postcss-flexboxfixer'),
              require('autoprefixer')({browsers: ['last 2 versions', 'ie >= 9']}), // add vendor prefixes
            ]
          },
          dist: {
            src: 'dev/css/application.css',
          },
        },

        uglify: {
            build: {
                options: {
                    compress: true
                },
                src: ['dev/src/js/main.js'],
                dest: 'dist/js/script.min.js',
            },
            dev: {
                options: {
                    beautify: true,
                    compress: false,
                    preserveComments: 'all'
                },
                src: ['dev/src/js/main.js'],
                dest: 'dev/js/script.min.js',
            }
        },

        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'dev/index.html',
                    // 'dist/contact.html': 'clients/*.html'
                }
            },
            dev: {
                files: {
                    'dev/index.html': 'dev/index.html',
                    // 'dist/contact.html': 'clients/*.html'
                }
            }
        },

        responsive_images: {
          dev: {
            options: {
              sizes: [{
                width: 440,
                name: 'small'
              }, {
                width: 640,
                name: 'medium'
              }, {
                width: 840,
                name: 'large'
              }]
            },
            files: [{
              expand: true,
              src: ['img/**/*.{jpg,gif,png}'],
              cwd: 'dev/src',
              dest: 'dev/'
            }]
          },
        },

        imagemin: {
            dynamic: {
                options: {
                    svgoPlugins: [
                      {removeViewBox: true},               // don't remove the viewbox atribute from the SVG
                    	{removeUselessStrokeAndFill: true},  // don't remove Useless Strokes and Fills
                    	{removeEmptyAttrs: true}             // don't remove Empty Attributes from the SVG
                    ],
                    use: [mozjpeg(), svgo()],
                },
                files: [{
                    expand: true,
                    cwd: 'dev/img/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: 'dist/img/'
                }]
            },
        },

        cssmin: {
          options: {
            // report: 'min',  <--- default
            report: 'gzip'
          },
          target: {
            files: [{
              expand: true,
              cwd: 'dev/css',
              src: ['application.css'],
              dest: 'dist/css',
              ext: '.css'
            }]
          }
        }



    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['browserSync', 'sass:dev', 'postcss', 'uglify:dev', 'htmlmin:dev', 'responsive_images:dev', 'watch']);
    grunt.registerTask('build', ['cssmin', 'uglify:build', 'htmlmin:build', 'imagemin']);

};

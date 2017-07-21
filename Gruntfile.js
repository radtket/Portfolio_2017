const mozjpeg = require('imagemin-mozjpeg');
const svgo = require('imagemin-svgo');

module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            scss: {
                files: ['dev/src/scss/**/*.scss'],
                tasks: ['sass:dev', 'postcss:dev'],
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
            build: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none',
                },
                files: {
                    'dist/css/application.css': 'dev/src/scss/application.scss'
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
            dev: {
                options: {
                    map: {
                        inline: false, // save all sourcemaps as separate files...
                        annotation: 'dev/css/maps/', // ...to the specified directory
                        syntax: require('postcss-scss'),
                    },
                    processors: [
                        require('pixrem')(), // add fallbacks for rem units
                        require('autoprefixer')({
                            browsers: ['last 2 versions', 'ie >= 10']
                        }), // add vendor prefixes
                    ]
                },
                dist: {
                    src: 'dev/css/application.css',
                },
            },
            build: {
                options: {
                    processors: [
                        require('pixrem')(), // add fallbacks for rem units
                        require('autoprefixer')({
                            browsers: ['last 2 versions', 'ie >= 10']
                        }), // add vendor prefixes
                        require('cssnano')() // minify the result
                    ]
                },
                dist: {
                    src: 'dist/css/application.css',
                },
            },
        },


        uglify: {
            build: {
                options: {
                    compress: true
                },
                src: ['dev/src/js/plugins.js', 'dev/src/js/main.js'],
                dest: 'dist/js/script.min.js',
            },
            dev: {
                options: {
                    beautify: true,
                    compress: false,
                    preserveComments: 'all'
                },
                src: ['dev/src/js/plugins.js', 'dev/src/js/main.js'],
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
                width: 320,
                name: 'small'
              }, {
                width: 640,
                name: 'medium'
              }, {
                width: 800,
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
                    svgoPlugins: [{removeViewBox: false}],
                    use: [mozjpeg(), svgo()],
                },
                files: [{
                    expand: true,
                    cwd: 'dev/img/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: 'dist/img/'
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

    grunt.registerTask('default', ['browserSync', 'sass:dev', 'postcss:dev', 'uglify:dev', 'htmlmin:dev', 'responsive_images:dev', 'watch']);
    grunt.registerTask('build', ['sass:build', 'postcss:build', 'uglify:build', 'htmlmin:build', 'imagemin']);

};

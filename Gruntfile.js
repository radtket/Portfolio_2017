const mozjpeg = require('imagemin-mozjpeg');
const svgo = require('imagemin-svgo');


module.exports = function (grunt) {

    grunt.initConfig({
        watch: {
            scss: {
                files: ['dev/src/scss/**/*.scss'],
                tasks: ['sass:dev', 'postcss'],
            },
            js: {
                files: ['dev/src/js/*.js'],
                tasks: ['babel', 'uglify:dev', 'uglify:dev_secondary']
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
                // map: {
                //     inline: false, // save all sourcemaps as separate files...
                //     annotation: 'dev/css/maps/', // ...to the specified directory
                // },
                map: true,
                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('postcss-flexboxfixer'),
                    require('autoprefixer')({ browsers: ['last 2 versions', 'ie >= 9'] }), // add vendor prefixes
                ]
            },
            dist: {
                src: 'dev/css/application.css',
            },
        },


        babel: {
            options: {
                sourceMap: true,
                presets: ['env']
            },
            dist: {
                files: {
                    'dev/src/js/compiled/main.js': 'dev/src/js/main.js',
                    'dev/src/js/compiled/project-page.js': 'dev/src/js/project-page.js'
                }
            }
        },


        uglify: {
            build: {
                options: {
                    compress: true
                },
                src: ['dev/src/js/vendor/mixitup.min.js', 'dev/src/js/compiled/main.js'],
                dest: 'dist/js/script.min.js',
            },
            build_secondary: {
                options: {
                    compress: true
                },
                src: ['dev/src/js/vendor/covervid.min.js', 'dev/src/js/compiled/project-page.js'],
                dest: 'dist/js/project-page.min.js',
            },
            dev: {
                options: {
                    beautify: true,
                    compress: false,
                    preserveComments: 'all'
                },
                src: ['dev/src/js/vendor/mixitup.min.js', 'dev/src/js/compiled/main.js'],
                dest: 'dev/js/script.min.js',
            },
            dev_secondary: {
                options: {
                    beautify: true,
                    compress: false,
                    preserveComments: 'all'
                },
                src: ['dev/src/js/vendor/covervid.min.js', 'dev/src/js/compiled/project-page.js'],
                dest: 'dev/js/project-page.min.js',
            },
        },


        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'dev/index.html',
                    'dist/client_r-s.html': 'dev/client_r-s.html',
                    'dist/client_green-can.html': 'dev/client_green-can.html',
                }
            },
            dev: {
                files: {
                    'dev/index.html': 'dev/index.html',
                    'dev/client_r-s.html': 'dev/client_r-s.html',
                    'dev/client_green-can.html': 'dev/client_green-can.html',
                }
            }
        },

        responsive_images: {
            clients: {
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
                    src: ['img/clients/**/*.{jpg,gif,png}'],
                    cwd: 'dev/src',
                    dest: 'dev/'
                }]
            },
            portfolio: {
                options: {
                    sizes: [{
                        width: 3000,
                        name: 'small'
                    }, {
                        width: 600,
                        name: 'large'
                    }]
                },
                files: [{
                    expand: true,
                    src: ['img/works/*.{jpg,gif,png}'],
                    cwd: 'dev/src',
                    dest: 'dev/'
                }]
            },
        },

        imagemin: {
            dynamic: {
                options: {
                    svgoPlugins: [
                        { removeViewBox: true },               // don't remove the viewbox atribute from the SVG
                        { removeUselessStrokeAndFill: true },  // don't remove Useless Strokes and Fills
                        { removeEmptyAttrs: true }             // don't remove Empty Attributes from the SVG
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
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-babel');

    grunt.registerTask('default', ['browserSync', 'sass:dev', 'postcss', 'babel', 'uglify:dev', 'uglify:dev_secondary', 'htmlmin:dev', 'responsive_images:clients', 'responsive_images:portfolio', 'watch']);
    grunt.registerTask('build', ['cssmin', 'babel', 'uglify:build', 'uglify:build_secondary', 'htmlmin:build', 'imagemin']);

};

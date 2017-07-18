module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      files: ['scss/**/*.scss', 'js/*.js'],
      tasks: ['sass:dev', 'postcss', 'uglify:dev']
    },

    sass: {
      dev: {
        options: {
          style: 'expanded',
          sourcemap: 'none',
        },
        files: {
          'dist/application.css': 'scss/application.scss'
        },
      },
      build: {
        options: {
          style: 'compressed',
          sourcemap: 'none',
        },
        files: {
          'dist/application.css': 'scss/application.scss'
        },
      },
    },

    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'dist/*.css',
            'dist/*.js',
            '*.html',
            'clients/*.html'
          ]
        },
        options: {
          watchTask: true,
          server: '.'
        }
      }
    },

    postcss: {
      options: {
        map: {
          inline: false, // save all sourcemaps as separate files...
          annotation: 'dist/maps/', // ...to the specified directory
          syntax: require('postcss-scss'),
        },
        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({
            browsers: ['last 2 versions', 'ie >= 10']
          }), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'dist/application.css',
      },
    },


    uglify: {
      build: {
        options: {
          compress: true
        },
        src: ['js/main.js'],
        dest: 'dist/script.min.js',
      },
      dev: {
        options: {
          beautify: true,
          compress: false,
          preserveComments: 'all'
        },
        src: ['js/main.js'],
        dest: 'dist/script.min.js',
      }
    },


    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': 'index.html',
          // 'dist/contact.html': 'clients/*.html'
        }
      },
      dev: {
        files: {
          'dist/index.html': 'index.html',
          // 'dist/contact.html': 'clients/*.html'
        }
      }
    }




  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('default', ['browserSync', 'sass:dev', 'postcss', 'uglify:dev', 'watch']);
  grunt.registerTask('build', ['sass:build', 'sass:build', 'postcss', 'uglify:build', 'htmlmin:build']);

};

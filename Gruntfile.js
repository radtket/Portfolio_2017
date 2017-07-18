module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      files: ['src/scss/**/*.scss', 'src/js/*.js'],
      tasks: ['sass:dev', 'postcss', 'uglify:dev']
    },

    sass: {
      dev: {
        options: {
          style: 'expanded',
          sourcemap: 'none',
        },
        files: {
          'dist/css/application.css': 'src/scss/application.scss'
        },
      },
      build: {
        options: {
          style: 'compressed',
          sourcemap: 'none',
        },
        files: {
          'dist/css/application.css': 'src/scss/application.scss'
        },
      },
    },

    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'dist/css/*.css',
            'dist/js/*.js',
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
        src: 'dist/css/application.css',
      },
    },


    uglify: {
      build: {
        options: {
          compress: true
        },
        src: ['src/js/main.js'],
        dest: 'dist/js/script.min.js',
      },
      dev: {
        options: {
          beautify: true,
          compress: false,
          preserveComments: 'all'
        },
        src: ['src/js/plugins.js', 'src/js/main.js'],
        dest: 'dist/js/script.min.js',
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

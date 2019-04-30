module.exports = function(grunt) {

  grunt.initConfig({
    
    clean: ['assets/', 'popup.html', 'index.html'],

    concat: {
      css: {
        src: [
          'sources/assets/stylesheets/bootstrap-1.2.0.min.css',
          'sources/assets/stylesheets/base.css'
        ],
        dest: 'assets/stylesheets/main.css'
      },
      js: {
        src: [
          'sources/assets/javascripts/jquery.js',
          'sources/assets/javascripts/moment-with-locales.min.js',
          'sources/assets/javascripts/holidays.js',
          'sources/assets/javascripts/calculator.js',
          'sources/assets/javascripts/calculator_controller.js',
          'sources/assets/javascripts/calculator_initializer.js'
        ],
        dest: 'assets/javascripts/main.js'
      }
    },

    copy: {
      dev_css: {
        src: 'assets/stylesheets/main.css',
        dest: 'assets/stylesheets/main.min.css',
      },
      dev_js: {
        src: 'assets/javascripts/main.js',
        dest: 'assets/javascripts/main.min.js',
      },
    },

    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/stylesheets',
          src: ['*.css', '!*.min.css'],
          dest: 'assets/stylesheets',
          ext: '.min.css'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
        },
        files: {
          'popup.html': 'sources/popup.html',
          'index.html': 'sources/popup.html'
        }
      },
      dev: {
        files: {
          'popup.html': 'sources/popup.html',
          'index.html': 'sources/popup.html'
        }
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'sources/assets/images',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'assets/'
        }]
      }
    },

    uglify: {
      dist: {
        files: {
          'assets/javascripts/main.min.js': ['assets/javascripts/main.js']
        }
      }
    },

    watch: {
      dev: {
        files: ['sources/**/*'],
        tasks: ['dev']
      },
      dist: {
        files: ['sources/**/*'],
        tasks: ['dist']
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('dev', ['clean', 'concat', 'copy:dev_css', 'copy:dev_js', 'htmlmin:dev', 'watch:dev']);
  grunt.registerTask('dist', ['clean', 'concat', 'cssmin', 'htmlmin:dist', 'imagemin', 'uglify:dist', 'watch:dist']);
  grunt.registerTask('default', ['dist', 'watch:dist']);

};
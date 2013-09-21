module.exports = function(grunt) {  
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var myConfig = {
    app : 'public',
    dist : 'dist'
  };

    try {
    myConfig.app = require('./bower.json').appPath || myConfig.app;
  } catch (e) {}

  // Project configuration.
  grunt.initConfig({
    myConfig : myConfig,
    pkg: grunt.file.readJSON('package.json'),
    nodeunit: {
      all: ['nodeunit/*.test.js']
    },
    nodemon: {
      prod: {
        options: {
          file: 'app.js',
          args: ['production'],
          nodeArgs: ['--debug'],
          ignoredFiles: ['README.md', 'node_modules/**'],
          watchedExtensions: ['js'],
          delayTime: 1,
          env: {
            PORT: '3000'
          },
          cwd: __dirname
        }
      },
      dev: {
        options: {
          file: 'app.js',
          args: ['development'],
          nodeArgs: ['--debug'],
          ignoredFiles: ['README.md', 'node_modules/**'],
          watchedExtensions: ['js'],
          delayTime: 1,
          env: {
            PORT: '3000'
          },
          cwd: __dirname
        }
      },
      exec: {
        options: {
          exec: 'less'
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    /**
    * BUILD configs
    */
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= myConfig.dist %>/*',
            '!<%= myConfig.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    autoprefixer: {
      options: ['last 1 version'],
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },
    cdnify: {
      dist: {
        html: ['<%= myConfig.dist %>/*.html']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= myConfig.app %>/javascripts/{,*/}*.js'
      ]
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= myConfig.dist %>/javascripts/{,*/}*.js',
            '<%= myConfig.dist %>/styles/{,*/}*.css',
            '<%= myConfig.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= myConfig.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    coffee: {
      options: {
        sourceMap: true,
        sourceRoot: ''
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= myConfig.app %>/javascripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },
    useminPrepare: {
      html: '<%= myConfig.app %>/index.html',
      options: {
        dest: '<%= myConfig.dist %>'
      }
    },
    usemin: {
      html: ['<%= myConfig.dist %>/{,*/}*.html'],
      css: ['<%= myConfig.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= myConfig.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= myConfig.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= myConfig.dist %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= myConfig.app %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= myConfig.dist %>'
        }]
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['<%= myConfig.app %>/javascripts/**/*.js'],
        dest: '<%= myConfig.dist %>/javascripts/scripts.js',
      },
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= myConfig.app %>',
          dest: '<%= myConfig.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'javascripts/**/*',
            'images/{,*/}*.{gif,webp}',
            'styles/fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= myConfig.dist %>/images',
          src: [
            'generated/*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= myConfig.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= myConfig.dist %>/javascripts',
          src: '*.js',
          dest: '<%= myConfig.dist %>/javascripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= myConfig.dist %>/javascripts/scripts.js': [
            '<%= myConfig.dist %>/javascripts/scripts.js'
          ]
        }
      }
    },
    cssmin: {
      // By default, your `index.html` <!-- Usemin Block --> will take care of
      // minification. This option is pre-configured if you do not wish to use
      // Usemin blocks.
      // dist: {
      //   files: {
      //     '<%= myConfig.dist %>/styles/main.css': [
      //       '.tmp/styles/{,*/}*.css',
      //       '<%= myConfig.app %>/styles/{,*/}*.css'
      //     ]
      //   }
      // }
    },
    concurrent: {
      server: [
        'coffee:dist',
        'copy:styles'
      ],
      test: [
        'coffee',
        'copy:styles'
      ],
      dist: [
        'coffee',
        'copy:styles',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    }


  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-google-cdn');
  grunt.loadNpmTasks('grunt-nodemon'); 

  // Default task(s).
  grunt.registerTask('default', ['nodemon']);
  grunt.registerTask('server-dev', ['nodemon:dev']);
  grunt.registerTask('server-prod', ['nodemon:prod']);
  grunt.registerTask('test-back', ['nodeunit']); 
  grunt.registerTask('test-front', [
    'clean:dist',
    'autoprefixer',
    'karma'       // karma currently bugged with ng-scenario e2e tests
  ]);
  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat', 
    'copy:dist',
    //'cdnify',
    'ngmin',
    //'cssmin',
    'uglify',
    //'rev',
    'usemin'
  ]);

};
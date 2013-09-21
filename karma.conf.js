// Karma configuration
// Generated on Wed Aug 28 2013 11:38:23 GMT-0500 (Central Daylight Time)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['ng-scenario'],


    // list of files / patterns to load in the browser
    files: [
      //'public/javascripts/**/*.js',
      ////'public/javascripts/vendor/angular/angular.js',
      ////'public/javascripts/vendor/angular-mocks/angular-mocks.js',
      //'public/javascripts/vendor/angular-scenario/*.js',
      //'public/javascripts/vendor/angular-bootstrap/ui-bootstrap-tpls.js',
      //'public/javascripts/**/**/*.js',
      //'public/javascripts/*.js',
      'public/tests/e2e/scenarios.js'
    ],


    // list of files to exclude
    exclude: [
        '.gitignore'  
    ],

     plugins: [
      'karma-ng-scenario',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],

    proxies: {
        '/' : 'http://localhost:3000/'
    },

    urlRoot : "/",

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};

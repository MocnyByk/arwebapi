// To start gulp, simply enter 'gulp' into the terminal

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    nodemon = require('gulp-nodemon');

// task to start the server and watch for any changes
gulp.task('start', function(){

    // nodemon configuration, more info here: https://www.npmjs.com/package/gulp-nodemon
    var stream = nodemon({
        script: 'server.js',
        ext: 'js',
        ignore: [
            './mongodb/',
            './node_modules/',
            'gulpfile.js'
        ],
        env: {
            'NODE_ENV': 'dev'
        }
    });

    // When we get an event to restart the server, do this.
    stream.on('restart', function(){
        gutil.log('restarted!');
    })
    
    .on('crash', function() {
        gutil.log('Application has crashed!\n')
        stream.emit('restart', 10)  // restart the server in 10 seconds 
    });
});

// create a default task and just log a message
gulp.task('default', ['start'], function() {
  return gutil.log('Gulp is running!')
});
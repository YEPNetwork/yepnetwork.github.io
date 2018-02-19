var gulp = require('gulp');
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();

// Task for building blog when something changed:
//gulp.task('build', shell.task(['bundle exec jekyll build --watch --drafts --baseurl ""']));
// Or if you don't use bundle:
gulp.task('build', shell.task(['bundle exec jekyll build --watch --baseurl ""']));

// Task for serving blog with Browsersync
gulp.task('serve', function () {
  browserSync.init({
    port: 4000,
    server: {
      baseDir: '_site/'
    }
  });

  // Reloads page when some of the already built files changed:
  gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', ['build', 'serve']);

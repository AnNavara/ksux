'use strict';/*eslint no-multi-spaces: 0, eol-last: 0*/// ===============================================================// Task list:// gulp           - default, runs development tasks// gulp prod      - production tasks// gulp html      - to compile html// gulp css       - to compile scss// gulp ngrok     - to host opened local web server through tunnel// gulp psi       - to test website speed at pagespeed insight// gulp min       - to minimize css// ===============================================================var gulp        = require('gulp');var rename      = require('gulp-rename');var clean       = require('gulp-clean');var exit        = require('gulp-exit');var sequence    = require('run-sequence');var sourcemaps  = require('gulp-sourcemaps');var gulpIf      = require('gulp-if');var u           = require('gulp-util');var log         = u.log;var c           = u.colors;var connect     = require('gulp-connect');var livereload  = require('gulp-livereload');var sass              = require('gulp-sass');var csscomb           = require('gulp-csscomb');var postcss           = require('gulp-postcss');var cssnano           = require('cssnano');var critical          = require('critical');var autoprefixer      = require('autoprefixer');var postcssZIndex     = require('postcss-zindex');var postcssMQPacker   = require('css-mqpacker');var postcssDIU        = require('doiuse');var postcssReporter   = require('postcss-reporter');var fileInclude       = require('gulp-file-include');var removeEmptyLines  = require('gulp-remove-empty-lines');var eol               = require('gulp-eol');var imageMin  = require('gulp-imagemin');var svgSprite = require('gulp-svg-sprite');var psi       = require('psi');var ngrok     = require('ngrok');var portVal   = 8082;var site      = '';var concat    = require('gulp-concat');var uglify    = require('gulp-uglify');var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';// ============================================================// Default task to compile html from parts at /source/_html_inc// includes connect.reload to support autoreload// ============================================================gulp.task('html', function() {  gulp.src(['./source/*.html'])    .pipe(fileInclude({      prefix: '@@',      basepath: '@file'    }))    .pipe(removeEmptyLines())    .pipe(eol())    .pipe(gulp.dest('./build/'))    .pipe(connect.reload());});// =========================================================// Default task to compile scss files to css// also uses post processors to rebase Z indexes// automaticly add prefixes for styles for selected browsers// report which styles is not supported by selected browsers// and combine media queries// ! run with parameter NODE_ENV=production e.g.// ! NODE_ENV=production gulp css// ! to turn off source map// =========================================================gulp.task('styles', function() {  var processors = [    postcssZIndex,    postcssMQPacker({      sort: true    }),    autoprefixer({browsers: ['last 3 version', 'ie 9', '> 1%', 'not OperaMini 5-8']})  ];  return gulp.src('./source/scss/style.scss')    // .pipe(gulpIf(isDevelopment, sourcemaps.init()))    .pipe(sass()).on('error', sass.logError)    .pipe(postcss(processors))    .pipe(csscomb())    // .pipe(gulpIf(isDevelopment, sourcemaps.write()))    .pipe(rename('style.css'))    .pipe(gulp.dest('./build/css/'))    .pipe(connect.reload());});// =======================================// Generate critical css with 900px height// and inline it in html file head// =======================================gulp.task('critical', function() {  critical.generate({    inline: true,    base: './build',    src: 'index.html',    minify: true,    css: ['build/css/style.min.css'],    dimensions: [      {        height: 400,        width: 400      },      {        height: 900,        width: 1400      }    ],    dest: 'build/index.html',    extract: false,    ignore: '@font-face'  });});// =================================================// this one task just minize css at build folder// and removes all comments in prepare to production// =================================================gulp.task('min', function() {  var minification = [    cssnano({      autoprefixer: false,      discardComments: {removeAll: true},      zindex: false    })  ];  return gulp.src('./build/css/style.css')    .pipe(postcss(minification))    .pipe(rename('style.min.css'))    .pipe(gulp.dest('./build/css/'));});// =======// js Task// =======gulp.task('js', ['js:main', 'js:lib']);gulp.task('js:main', function() {  return gulp.src('source/js/*.js')    .pipe(concat('script.js'))    .pipe(uglify())    .pipe(gulp.dest('build/js/'))    .pipe(connect.reload());});gulp.task('js:lib', function() {  return gulp.src('source/js/lib/*.js')    .pipe(uglify())    .pipe(gulp.dest('build/js/lib/'));});// =================================================// Task to prepare imgs to web// reduces size of it and put them into build folder// =================================================gulp.task('img', function() {  return gulp.src('./source/_img/*.{jpg,png}')    .pipe(imageMin({      progressive: true,      optimizationLevel: 3,      multipas: true,      svgoPlugins: [        {removeViewBox: false}      ]    }))    .pipe(gulp.dest('./build/img/'))    .pipe(connect.reload());});gulp.task('svg', function() {  return gulp.src('./source/_img/*.svg')    .pipe(svgSprite({      mode: {        css: {          dest: '.',          bust: false,          sprite: '../img/sprite.svg',          layout: 'vertical',          prefix: '%%',          dimensions: true,          render: {            scss: {              dest: 'sprite.scss'            }          }        }      }    }))    .pipe(gulpIf('*.scss', gulp.dest('tmp/styles'), gulp.dest('build/img')));});// ==============================================// Task to host your website through ngrok tunnel// website will visible from outside at// require 'connect' task working at background// to start tunneling// ==============================================gulp.task('ngrok', function(cb) {  return ngrok.connect(portVal, function(err, url) {    site = url;    if (err) {      log(c.cyan('ngrok'), c.red(err));    }    log(c.cyan('✔︎ ngrok'), '- serving your site from: ' + c.yellow(url));    cb();  });});// ======================================================// Tasks to test your website at google pagespeed insight// ======================================================gulp.task('psi-desktop', function() {  return psi.output(site, {    nokey: 'true',    strategy: 'desktop',    threshold: 80  });});gulp.task('psi-mobile', function() {  return psi.output(site, {    nokey: 'true',    strategy: 'mobile',    threshold: 80  });});// ===============================================// This task run in sequence ngrok and psi to test// current local project// ===============================================gulp.task('psi-seq', function(cb) {  return sequence(    'ngrok',    'psi-desktop',    'psi-mobile',    cb  );});gulp.task('psi', ['psi-seq'], function() {  process.exit();});// =============================================================// connect task to host current project at your local web server// =============================================================gulp.task('connect', function() {  connect.server({    root: 'build',    port: portVal,    livereload: true  });});// ==================================================================// watch task is looking at changed files and run tasks based on that// ==================================================================gulp.task('watch', function() {  gulp.watch('source/scss/**/*.scss', ['styles']);  gulp.watch('source/**/*.html', ['html']);  gulp.watch('source/js/**/*.js', ['js']);  gulp.watch('source/_img/*.{jpg,png}', ['img']);  gulp.watch('source/_img/*.svg', ['svg']);});// =========================================// default one is just starts selected tasks// =========================================gulp.task('default', ['connect', 'html', 'js', 'styles', 'svg', 'img', 'watch']);//=====================================================// Production task// Clean folders build and production// Runs default tasks to build project then based on it// Minifyes css and adds critical css// ====================================================gulp.task('clean', function() {  isDevelopment = false;  gulp.src('build/css/*.css', {read: false})    .pipe(clean());  gulp.src('build/js/*.js', {read: false})    .pipe(clean());  gulp.src('build/img/*', {read: false})    .pipe(clean());  gulp.src('build/*.html', {read: false})    .pipe(clean());});gulp.task('critical-cb', function(cb) {  return sequence(    'critical',    cb  );});gulp.task('prod-seq', function(cb) {  return sequence(    'clean',    ['html', 'svg', 'js'],    'styles',    'min',    'critical',    'psi',    cb  );});gulp.task('prod', ['prod-seq', 'img', 'connect']);
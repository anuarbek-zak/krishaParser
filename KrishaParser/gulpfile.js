const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const  del = require('del');
const image = require('gulp-image');
const uglify = require('gulp-uglify');
const less = require('gulp-less');

gulp.task('css', () =>
    gulp.src('frontend/**/*.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('public'))
);

gulp.task('html',()=>{
    gulp.src('index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
});

gulp.task('js',()=>{
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('clean' ,()=> {
    return del('dist');
});

gulp.task('watch',()=> {
    gulp.watch('index.less',['less']);
});


gulp.task('image', ()=> {
  gulp.src('images/*')
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      jpegoptim: true,
      mozjpeg: true,
      gifsicle: true,
      svgo: true,
      concurrent: 10
    }))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('default',['clean','html','css','js','image']);

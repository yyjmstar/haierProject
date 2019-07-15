const gulp = require('gulp');
const minihtml = require('gulp-minify-html'); //引入html的压缩插件
const minicss = require('gulp-minify-css');
const babel = require('gulp-babel');
const babelcore = require('babel-core');
const es2015 = require('babel-preset-es2015');
const minijs = require('gulp-uglify');
const imagemin = require('gulp-imagemin');


//压缩html
gulp.task('uglifyhtml', function() {
        return gulp.src('src/*.html') //引入文件
            .pipe(minihtml()) //执行压缩插件
            .pipe(gulp.dest('dist/src')); //输出
    })
    //压缩css文件
gulp.task('uglifycss', () => {
    return gulp.src('src/css/*.css') //引入文件
        .pipe(minicss()) //执行压缩插件
        .pipe(gulp.dest('dist/src/css')); //输出
});
//es6转es5
//gulp-babel babel-core  babel-preset-es2015
gulp.task('babeljs', () => {
    return gulp.src('src/script/js/*.js') //引入文件
        .pipe(babel({
            presets: ['es2015']
        })) //执行压缩插件
        .pipe(minijs())
        .pipe(gulp.dest('dist/src/script/js')); //输出
});
//压缩png图片*****
gulp.task('uglifypng', () => {
    return gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/src/img'));
});
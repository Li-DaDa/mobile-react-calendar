const {src, dest, parallel, series} = require('gulp')
const babel = require('gulp-babel')
const rename = require('gulp-rename')

function jsTask() {
    return src('src/components/Calendar/**/*.js')
    .pipe(babel())
    .pipe(dest('build'))
}

function jsxTask() {
    return src('src/components/Calendar/**/*.jsx')
    .pipe(babel())
    .pipe(dest('build'))
}

function cssTack() {
    return src('src/components/Calendar/**/*.css')
    .pipe(dest('build'))
}

exports.default = parallel(jsTask, jsxTask, cssTack)
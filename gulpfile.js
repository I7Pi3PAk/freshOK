const {
    src,
    dest,
    watch,
    parallel,
    series
} = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const del = require('del');
// const svgSprite = require('gulp-svg-sprite');
const browserSync = require('browser-sync').create();

// function svgMono() {
//     return src(['app/images/iconsMono/*.svg'])
//         .pipe(svgSprite({
//             mode: {
//                 symbol: {
//                     sprite: "../sprite.svg"
//                 },
//             },
//             shape: {
//                 transform: [{
//                     svgo: {
//                         plugins: [{
//                             removeAttrs: {
//                                 attrs: ['fill', 'stroke.*'],
//                             }
//                         }]
//                     }
//                 }]
//             }
//         }))
//         .pipe(dest('app/images/iconsMono'))
//         .pipe(browserSync.stream())
// }

// function svgMulty() {
//     return src(['app/images/iconsMulty/*.svg'])
//         .pipe(svgSprite({
//             mode: {
//                 symbol: {
//                     sprite: "../sprite.svg"
//                 },
//             },
//         }))
//         .pipe(dest('app/images/iconsMulty'))
//         .pipe(browserSync.stream())
// }

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        },
        notify: false
    })
}

function styles() {
    return src([
            'app/scss/style.scss',
        ])
        .pipe(scss({
            outputStyle: 'compressed'
        }))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 5 versions'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function scripts() {
    return src([
            'node_modules/jquery/dist/jquery.js',
            'node_modules/slick-slider/slick/slick.js',
            'node_modules/mixitup/dist/mixitup.js',
            'app/js/main.js'
        ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function images() {
    return src('app/images/**/*.*')
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imagemin.mozjpeg({
                quality: 75,
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 5
            }),
            imagemin.svgo({
                plugins: [{
                        removeViewBox: true
                    },
                    {
                        cleanupIDs: false
                    }
                ]
            })
        ]))
        .pipe(dest('dist/images'))
}

function build() {
    return src([
            'app/**/*.html',
            'app/css/style.min.css',
            'app/js/main.min.js',
            'app/fonts/*.*'
        ], {
            base: 'app'
        })
        .pipe(dest('dist'))
}

function cleanDist() {
    return del('dist')
}

function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    // watch(['app/images/icons/*.svg', '!app/images/icons/sprite.svg'], svg);
    watch(['app/**/*.html']).on('change', browserSync.reload);
}


exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
// exports.svgMono = svgMono;
// exports.svgMulty = svgMulty;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build);

exports.default = parallel(styles, scripts, browsersync, watching);
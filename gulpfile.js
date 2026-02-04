import autoprefixer from 'autoprefixer';
import csso from 'gulp-csso';
import { deleteAsync } from 'del';
import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import vinylPaths from 'vinyl-paths';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import revision from 'gulp-rev-replace';
import rev from 'gulp-rev';
import svg from 'postcss-inline-svg';
import atImport from 'postcss-import';
import browserSync from 'browser-sync';
import uglify from 'gulp-uglify';
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { glob } from 'glob';

const sync = browserSync.create();

// HTML (event pages and standalone pages)

gulp.task('html', () => {
	return gulp.src([
			'src/pages/*.html',
			'src/pages/**/index.html',
			'!src/pages/**/pres/**'
		])
		.pipe(htmlmin({
			removeComments: true,
			collapseWhitespace: true
		}))
		.pipe(rename((file) => {
			if (file.basename !== 'index') {
				file.dirname = file.basename;
				file.basename = 'index';
			}
		}))
		.pipe(gulp.dest('dist'))
		.pipe(sync.stream({ once: true }));
});

// Presentations

async function symlinkPres() {
	const srcDirs = await glob('src/pages/**/pres');
	for (const srcDir of srcDirs) {
		const destDir = srcDir.replace('src/pages', 'dist');
		const destParent = path.dirname(destDir);
		await fs.mkdir(destParent, { recursive: true });
		const srcAbsolute = path.resolve(srcDir);
		try {
			await fs.symlink(srcAbsolute, destDir);
		} catch (err) {
			if (err.code !== 'EEXIST') throw err;
		}
	}
}

gulp.task('pres', symlinkPres);

// Styles

gulp.task('styles', () => {
	return gulp.src('src/styles/screen.css')
		.pipe(postcss([
			atImport,
			autoprefixer,
			svg
		]))
		.pipe(csso())
		.pipe(gulp.dest('dist/styles'))
		.pipe(sync.stream());
});

// Scripts

gulp.task('scripts', () => {
	return gulp.src('src/scripts/script.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/scripts'))
		.pipe(sync.stream());
});

// Images

async function resizeImages() {
	const sizes = [256, 192, 128];
	const quality = 70;
	const srcPattern = 'src/assets/speakers/*.jpeg';
	const destBase = 'dist/speakers';

	const files = await glob(srcPattern);

	for (const size of sizes) {
		const destDir = path.join(destBase, String(size));
		await fs.mkdir(destDir, { recursive: true });
	}

	const promises = files.map(async (file) => {
		const filename = path.basename(file);

		for (const size of sizes) {
			const destPath = path.join(destBase, String(size), filename);
			await sharp(file)
				.resize(size, null, { withoutEnlargement: true })
				.jpeg({ quality })
				.toFile(destPath);
		}
	});

	await Promise.all(promises);
}

gulp.task('images:resize', resizeImages);

gulp.task('images:replace', () => {
	return gulp.src([
			'dist/index.html',
			'dist/**/index.html',
			'!dist/**/pres/**'
		])
		.pipe(replace(
			/<img class="speakers__picture" (src|data-src)="\/speakers\/([^"]+)" alt="([^"]+)">/g,
			'<img class="speakers__picture" $1="/speakers/128/$2" $1set="/speakers/256/$2 2x" alt="$3">'
		))
		.pipe(replace(
			/<img class="card__picture" src="\/speakers\/([^"]+)" alt="([^"]+)">/g,
			'<img class="card__picture" src="/speakers/192/$1" srcset="/speakers/256/$1 2x" alt="$2">'
		))
		.pipe(gulp.dest('dist'));
});

gulp.task('images', gulp.parallel(
	'images:resize',
	'images:replace'
));

// Cache

gulp.task('cache:hash', () => {
	return gulp.src([
			'dist/styles/*.css',
			'dist/scripts/*.js'
		], {
			base: 'dist'
		})
		.pipe(vinylPaths(deleteAsync))
		.pipe(rev())
		.pipe(gulp.dest('dist'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('dist'));
});

gulp.task('cache:replace', () => {
	return gulp.src([
			'dist/**/index.html',
			'!dist/**/pres/**'
		])
		.pipe(revision({
			manifest: gulp.src('dist/rev-manifest.json').pipe(vinylPaths(deleteAsync))
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('cache', gulp.series(
    'cache:hash',
    'cache:replace'
));

// Clean

gulp.task('clean', () => {
	return deleteAsync('dist/**');
});

// Copy

gulp.task('copy', () => {
	return gulp.src('src/assets/**', { encoding: false })
		.pipe(gulp.dest('dist'))
		.pipe(sync.stream({
			once: true
		}));
});

// Server

gulp.task('server', () => {
	sync.init({
		ui: false,
		notify: false,
		server: {
			baseDir: 'dist'
		}
	});
	gulp.watch('index.html').on('change', () => {
        sync.reload();
    });
});

// Watch

gulp.task('watch', () => {
	gulp.watch('src/assets/**', gulp.parallel('copy'));
	gulp.watch([
		'src/pages/*.html',
		'src/pages/**/index.html'
	], gulp.parallel('html'));
	gulp.watch('src/pages/**/pres/**', gulp.parallel('pres'));
	gulp.watch('src/styles/**/*.css', gulp.parallel('styles'));
	gulp.watch('src/scripts/*.js', gulp.parallel('scripts'));
});

// Build

gulp.task('build:dev', gulp.series(
	'copy',
	'html',
	'pres',
	'styles',
	'scripts'
));

gulp.task('build:prod', gulp.series(
    'clean',
    'build:dev',
    'cache',
    'images'
));

// Default

gulp.task('default', gulp.parallel(
	'build:dev',
	'server',
	'watch',
	function(done) {
		done();
	}
));
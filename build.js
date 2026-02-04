import { deleteAsync } from 'del';
import { glob } from 'glob';
import { promises as fs } from 'fs';
import path from 'path';
import postcss from 'postcss';
import atImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import svg from 'postcss-inline-svg';
import { minify as cssoMinify } from 'csso';
import { minify as terser } from 'terser';
import { minify as htmlMinify } from 'html-minifier-terser';

// Clean

async function clean() {
	await deleteAsync('dist/**');
	console.log('Cleaned dist/');
}

// Copy assets

async function copy() {
	await fs.cp('src/assets', 'dist', { recursive: true });
	console.log('Copied assets');
}

// HTML

async function html() {
	const files = await glob([
		'src/pages/*.html',
		'src/pages/**/index.html'
	], { ignore: ['src/pages/**/pres/**'] });

	for (const file of files) {
		const content = await fs.readFile(file, 'utf-8');
		const minified = await htmlMinify(content, {
			removeComments: true,
			collapseWhitespace: true
		});

		const relativePath = path.relative('src/pages', file);
		const parsed = path.parse(relativePath);

		let destPath;
		if (parsed.name === 'index') {
			destPath = path.join('dist', parsed.dir, 'index.html');
		} else {
			destPath = path.join('dist', parsed.dir, parsed.name, 'index.html');
		}

		await fs.mkdir(path.dirname(destPath), { recursive: true });
		await fs.writeFile(destPath, minified);
	}

	console.log(`Processed ${files.length} HTML files`);
}

// Presentations (symlinks)

async function pres() {
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

	console.log(`Symlinked ${srcDirs.length} presentation folders`);
}

// Styles

async function styles() {
	const content = await fs.readFile('src/styles/screen.css', 'utf-8');

	const result = await postcss([
		atImport,
		autoprefixer,
		svg
	]).process(content, { from: 'src/styles/screen.css' });

	const minified = cssoMinify(result.css).css;

	await fs.mkdir('dist/styles', { recursive: true });
	await fs.writeFile('dist/styles/screen.css', minified);

	console.log('Processed styles');
}

// Scripts

async function scripts() {
	const content = await fs.readFile('src/scripts/script.js', 'utf-8');
	const result = await terser(content);

	await fs.mkdir('dist/scripts', { recursive: true });
	await fs.writeFile('dist/scripts/script.js', result.code);

	console.log('Processed scripts');
}

// Build

async function build() {
	console.log('Building...\n');
	const start = performance.now();

	await clean();
	await copy();

	await Promise.all([
		html(),
		pres(),
		styles(),
		scripts()
	]);

	const duration = ((performance.now() - start) / 1000).toFixed(2);
	console.log(`\nDone in ${duration}s`);
}

build().catch((err) => {
	console.error(err);
	process.exit(1);
});
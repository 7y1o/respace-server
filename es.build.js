require('esbuild').buildSync({
	entryPoints: ['./src/index.ts'],
	bundle: true,
	outfile: 'build/index.js',
	sourcemap: true,
	platform: 'node',
	// minify: true,
	format: 'cjs',
	charset: 'utf8'
});





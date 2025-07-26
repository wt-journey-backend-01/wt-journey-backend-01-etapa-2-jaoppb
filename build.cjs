const esbuild = require('esbuild');
const packageJson = require('./package.json');

const dependencies = Object.keys(packageJson.dependencies || {});
const devDependencies = Object.keys(packageJson.devDependencies || {});

const isWatchMode = process.argv.includes('--watch');

const buildOptions = {
	entryPoints: ['./src/server.ts'],
	outdir: 'dist',
	bundle: true,
	minify: true,
	platform: 'node',
	external: [...dependencies, ...devDependencies],
};

async function build() {
	const context = await esbuild.context(buildOptions);

	if (isWatchMode) {
		await context.watch();
		console.log('Watching for changes...');
	} else {
		await context.rebuild();
		await context.dispose();
		console.log('Build completed successfully.');
	}
}

build().catch((error) => {
	console.error('Build failed:', error);
	process.exit(1);
});

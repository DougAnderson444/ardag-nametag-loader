import fs from 'fs';
import esbuild from 'esbuild';
import esbuildSvelte from 'esbuild-svelte';
import sveltePreprocess from 'svelte-preprocess';

const outDir = './src/lib/bundled/';
//make sure the directoy exists before stuff gets put into it
if (!fs.existsSync(outDir)) {
	fs.mkdirSync(outDir);
}

esbuild
	.build({
		entryPoints: ['src/lib/bundled/DirectTag.svelte.js'],
		mainFields: ['svelte', 'browser', 'web', 'module', 'main'],
		bundle: true,
		outdir: outDir,
		// outfile: 'DirectTag.svelte.js',
		format: 'esm',
		sourcemap: false,
		allowOverwrite: true,
		plugins: [
			esbuildSvelte({
				compilerOptions: { css: false },
				preprocess: sveltePreprocess()
			})
		]
	})
	.catch(() => process.exit(1));

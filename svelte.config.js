// import adapter from 'sveltejs-adapter-ipfs';
import adapter from '@sveltejs/adapter-static';

import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: true
	}),

	kit: {
		adapter: adapter({
			// removeBuiltInServiceWorkerRegistration: true,
			// injectPagesInServiceWorker: true,
			pages: 'docs',
			assets: 'docs'
		}),
		paths: {
			// change below to your repo name
			base: '/ardag-nametag-loader'
		}
	}
};

export default config;

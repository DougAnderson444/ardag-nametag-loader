import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

// import { buildComponents } from './buildComponents.mjs';
// (async () => await buildComponents())();

const config: UserConfig = {
	plugins: [sveltekit()]
};

export default config;

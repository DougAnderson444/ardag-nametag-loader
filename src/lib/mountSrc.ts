export async function mountSrc({ text, target, props }) {
	const blob = new Blob([text], { type: 'text/javascript' });
	const url = URL.createObjectURL(blob);
	const App = (await import(/* @vite-ignore */ url)).default;
	target.innerHTML = '';
	const app = new App({
		target,
		props
	});
	if (url) URL.revokeObjectURL(url); // memory management
	return app;
}

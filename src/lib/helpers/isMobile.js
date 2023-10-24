import { browser } from '$app/environment';

export default () => {
	let check = false;

	if (!browser) {
		return false;
	}

	return window.screen.width < 480;
};

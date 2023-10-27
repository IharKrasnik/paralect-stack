// src/lib/Env.js
import { dev } from '$app/environment';
import { browser } from '$app/environment';

// 1

let isProduction = import.meta.env.VITE_APP_ENV === 'production';

export let isDev = !isProduction;

export const API_URL = isDev
	? 'https://ship-653bafe38ea85800129cdd11.paralect.net'
	: 'https://ship-prod-653bafe38ea85800129cdd11.paralect.net';

// export const API_URL = 'https://ship-prod-653bafe38ea85800129cdd11.paralect.net';

export let GOOGLE_LOGIN_URL = browser
	? `${API_URL}/auth/google/url?redirect_to=${window.document.location.href}`
	: null;

export let getGoogleLoginUrl = () => {
	return browser ? `${API_URL}/auth/google/url?redirect_to=${window.document.location.href}` : null;
};

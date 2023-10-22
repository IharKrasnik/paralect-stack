import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const KEY = 'form_cache';

const formCacheStore = writable({});

if (browser) {
	let formCache;

	try {
		formCache = JSON.parse(localStorage[KEY]) || {};
	} catch (err) {
		localStorage[KEY] = {};
		formCache = {};
	}

	formCacheStore.set(formCache);

	formCacheStore.subscribe((fc) => {
		if (fc) {
			fc.updatedOn = new Date();
		}

		localStorage[KEY] = JSON.stringify(fc);
	});
}

export default formCacheStore;

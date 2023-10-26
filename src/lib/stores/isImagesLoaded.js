import { writable } from 'svelte/store';

const isImagesLoadedStore = writable(false);

export default isImagesLoadedStore;

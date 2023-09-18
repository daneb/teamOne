import { writable } from 'svelte/store';

// Represents user authentication status.
export const isAuthenticated = writable<boolean>(false);

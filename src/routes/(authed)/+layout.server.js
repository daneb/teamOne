import { redirect } from '@sveltejs/kit';

export const prerender = true;

export function load({ cookies, url  }) {
	if (!cookies.get('logged_in')) {
		throw redirect(303, `/login?redirectTo=${url.pathname}`);
	}
}
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { handleLoginRedirect } from '$lib/utils/helpers';

export const load: LayoutServerLoad = async (event) => {
	if (!event.locals.user) {
		throw redirect(302, handleLoginRedirect(event));
	}

	// if (locals?.user?.role != 'admin') {
	// 	cookies.delete('session');
	// 	throw redirect(302, '/');
	// }
};

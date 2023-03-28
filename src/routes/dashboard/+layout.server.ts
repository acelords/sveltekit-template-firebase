import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	// if (locals?.user?.role != 'admin') {
	// 	cookies.delete('session');
	// 	throw redirect(302, '/');
	// }
};

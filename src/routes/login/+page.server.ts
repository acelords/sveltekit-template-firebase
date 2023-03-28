import { SESSION_COOKIE_NAME } from '$lib/constants';
import { fail, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';
import type { Actions } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
    if (locals.user) {
        throw redirect(302, '/dashboard');
    }
};


export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const token = formData.get('token')?.valueOf();

        if (!token || typeof token !== 'string') {
            return fail(400, { message: 'Token is a required field and must be a string' });
        }

        cookies.set(SESSION_COOKIE_NAME, token, {
            httpOnly: true,
            path: '/',
            secure: true
        });

        return { success: true };
    }
};
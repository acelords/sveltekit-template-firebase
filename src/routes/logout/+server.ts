import { SESSION_COOKIE_NAME } from '$lib/constants';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async (event) => {
    event.cookies.delete(SESSION_COOKIE_NAME);
    event.locals.user = null;

    return json({
        success: true,
        message: "Logged out"
    })

}) satisfies RequestHandler;
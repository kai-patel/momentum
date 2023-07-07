import type { RequestEvent, RequestHandler } from './$types';

export const POST = ((event: RequestEvent) => {
	const params = event.params;
	return new Response(event.url.toString());
}) satisfies RequestHandler;

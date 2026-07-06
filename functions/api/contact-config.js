const jsonResponse = (payload, status = 200) => new Response(JSON.stringify(payload), {
    status,
    headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store'
    }
});

export async function onRequestGet({ env }) {
    return jsonResponse({
        turnstileSiteKey: env.TURNSTILE_SITE_KEY || ''
    });
}

export async function onRequestPost() {
    return jsonResponse({ ok: false, error: 'method_not_allowed' }, 405);
}

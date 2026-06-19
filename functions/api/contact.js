const jsonResponse = (payload, status = 200) => new Response(JSON.stringify(payload), {
    status,
    headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store'
    }
});

const clean = (value, max = 1200) => (value || '')
    .toString()
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '');

export async function onRequestPost({ request, env }) {
    let payload;

    try {
        payload = await request.json();
    } catch (error) {
        return jsonResponse({ ok: false, error: 'invalid_json' }, 400);
    }

    const honeypot = clean(payload.website, 200);
    if (honeypot) {
        return jsonResponse({ ok: true });
    }

    const submission = {
        firstName: clean(payload.firstName, 80),
        lastName: clean(payload.lastName, 80),
        email: clean(payload.email, 160),
        subject: clean(payload.subject || 'Allgemeine Anfrage', 120),
        context: clean(payload.context, 240),
        message: clean(payload.message, 3000),
        source: 'rlc1952-contact-form',
        submittedAt: new Date().toISOString()
    };

    if (!submission.firstName || !submission.lastName || !isEmail(submission.email) || !submission.message) {
        return jsonResponse({ ok: false, error: 'missing_required_fields' }, 422);
    }

    if (!env.CONTACT_WEBHOOK_URL) {
        return jsonResponse({
            ok: false,
            error: 'mail_delivery_not_configured',
            message: 'Der Website-Versand ist vorbereitet, aber der Mail-Zustellweg ist noch nicht freigeschaltet.'
        }, 503);
    }

    const headers = {
        'content-type': 'application/json; charset=utf-8'
    };

    if (env.CONTACT_WEBHOOK_TOKEN) {
        headers.authorization = `Bearer ${env.CONTACT_WEBHOOK_TOKEN}`;
    }

    const upstream = await fetch(env.CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(submission)
    });

    if (!upstream.ok) {
        return jsonResponse({ ok: false, error: 'mail_delivery_failed' }, 502);
    }

    return jsonResponse({ ok: true });
}

export async function onRequestGet() {
    return jsonResponse({ ok: false, error: 'method_not_allowed' }, 405);
}

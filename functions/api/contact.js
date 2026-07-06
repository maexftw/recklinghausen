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

const verifyTurnstile = async ({ token, secret, remoteIp }) => {
    if (!secret) {
        return { enabled: false, ok: true };
    }

    if (!token) {
        return { enabled: true, ok: false, error: 'captcha_required' };
    }

    const formData = new FormData();
    formData.append('secret', secret);
    formData.append('response', token);
    if (remoteIp) {
        formData.append('remoteip', remoteIp);
    }

    let result = {};
    try {
        const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            body: formData
        });
        result = await response.json().catch(() => ({}));
    } catch (error) {
        return { enabled: true, ok: false, error: 'captcha_failed' };
    }

    return {
        enabled: true,
        ok: Boolean(result.success),
        error: result.success ? undefined : 'captcha_failed'
    };
};

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
        to: 'info@rlc1952.de',
        source: 'rlc1952-contact-form',
        submittedAt: new Date().toISOString()
    };

    if (!submission.firstName || !submission.lastName || !isEmail(submission.email) || !submission.message) {
        return jsonResponse({ ok: false, error: 'missing_required_fields' }, 422);
    }

    submission.cc = submission.email;

    const captcha = await verifyTurnstile({
        token: clean(payload.turnstileToken, 2048),
        secret: env.TURNSTILE_SECRET_KEY,
        remoteIp: request.headers.get('CF-Connecting-IP')
    });

    if (!captcha.ok) {
        return jsonResponse({ ok: false, error: captcha.error }, 422);
    }

    submission.captcha = {
        provider: 'cloudflare-turnstile',
        verified: captcha.enabled
    };

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

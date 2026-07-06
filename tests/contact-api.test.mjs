import assert from 'node:assert/strict';
import { onRequestPost } from '../functions/api/contact.js';

const validPayload = {
    firstName: 'Max',
    lastName: 'Mustermann',
    email: 'max@example.com',
    subject: 'Probetraining',
    context: 'U14',
    message: 'Ich moechte ein Probetraining vereinbaren.',
    website: '',
    turnstileToken: 'token'
};

const makeRequest = (payload) => new Request('https://rlc1952.de/api/contact', {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
        'CF-Connecting-IP': '127.0.0.1'
    },
    body: JSON.stringify(payload)
});

let forwardedPayload;
globalThis.fetch = async (url, options = {}) => {
    if (String(url).includes('/siteverify')) {
        return Response.json({ success: true });
    }

    forwardedPayload = JSON.parse(options.body);
    return Response.json({ ok: true });
};

let response = await onRequestPost({
    request: makeRequest(validPayload),
    env: {
        CONTACT_WEBHOOK_URL: 'https://example.com/webhook',
        TURNSTILE_SECRET_KEY: 'secret'
    }
});

assert.equal(response.status, 200);
assert.equal(forwardedPayload.to, 'info@rlc1952.de');
assert.equal(forwardedPayload.cc, validPayload.email);
assert.deepEqual(forwardedPayload.captcha, {
    provider: 'cloudflare-turnstile',
    verified: true
});

globalThis.fetch = async (url) => {
    assert.ok(String(url).includes('/siteverify'));
    return Response.json({ success: false });
};

response = await onRequestPost({
    request: makeRequest(validPayload),
    env: {
        CONTACT_WEBHOOK_URL: 'https://example.com/webhook',
        TURNSTILE_SECRET_KEY: 'secret'
    }
});

assert.equal(response.status, 422);
assert.equal(await response.json().then((body) => body.error), 'captcha_failed');

console.log('contact-api selftest ok');

/**
 * RLC 1952 - GDPR Cookie Consent
 * Blocks Tailwaind/Google Fonts until accepted.
 */

window.cookieConsent = {
    init: function () {
        if (localStorage.getItem('cookieConsent') === 'accepted') {
            this.unblockResources();
        } else {
            this.showBanner();
        }
    },

    showBanner: function () {
        if (document.getElementById('cookie-banner')) return;

        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.className = 'fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 p-6 z-[9999] shadow-2xl transform transition-transform duration-300';
        banner.innerHTML = `
            <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div class="text-slate-300 text-sm leading-relaxed max-w-2xl">
                    <strong class="text-white block mb-1 font-display">Datenschutzeinstellungen</strong>
                    Wir nutzen externe Technologien (Google Fonts, Tailwind CSS), um das Design unserer Website darzustellen. 
                    Dabei werden IP-Adressen an die Anbieter in den USA übertragen. Ohne Ihre Zustimmung bleibt die Seite unformatiert.
                </div>
                <div class="flex gap-4 shrink-0">
                    <button id="btn-decline" class="px-6 py-2.5 rounded-xl border border-slate-600 text-slate-300 font-bold text-sm hover:bg-slate-800 transition-colors">
                        Nur Essenziell
                    </button>
                    <button id="btn-accept" class="px-6 py-2.5 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:bg-opacity-90 transition-colors">
                        Alles Akzeptieren
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(banner);

        // Native styles for the banner since Tailwind might be blocked
        banner.style.fontFamily = 'system-ui, -apple-system, sans-serif';
        const btns = banner.querySelectorAll('button');
        btns.forEach(btn => btn.style.cursor = 'pointer');

        document.getElementById('btn-accept').addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            this.unblockResources();
            this.hideBanner();
        });

        document.getElementById('btn-decline').addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            this.hideBanner();
        });
    },

    hideBanner: function () {
        const banner = document.getElementById('cookie-banner');
        if (banner) banner.remove();
    },

    unblockResources: function () {
        // Unblock Scripts
        const scripts = document.querySelectorAll('script[data-type="functional"]');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            if (script.src) {
                newScript.src = script.src;
            } else {
                newScript.textContent = script.textContent;
            }
            document.head.appendChild(newScript);
            script.remove();
        });

        // Unblock CSS Links
        const links = document.querySelectorAll('link[data-type="functional"]');
        links.forEach(link => {
            if (link.dataset.href) {
                link.href = link.dataset.href;
                link.rel = "stylesheet";
                // Google Fonts preconnects
                if (link.getAttribute('href').includes('fonts.')) {
                    // Keep them as is or re-add? Usually link rel="stylesheet" is enough.
                }
            }
            link.removeAttribute('data-type');
            link.removeAttribute('data-href');
        });

        // Reload components if needed (e.g. Tailwind config needs to re-run?)
        // Since we load Tailwind via script, it should init itself.
        console.log('Resources unblocked.');
    },

    reset: function () {
        localStorage.removeItem('cookieConsent');
        location.reload();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.cookieConsent.init();
});

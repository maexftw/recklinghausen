
// RLC 1952 - Common Initialization
// This script sets up Tailwind and injects shared components.

const DESIGN_SYSTEM = {
    colors: {
        primary: '#0f8f7b',
        secondary: '#1b4353',
        'background-light': '#F9FAFB',
        'background-dark': '#111827',
        slate: {
            50: '#f7faf9',
            100: '#f0f4f4',
            200: '#e5eaea',
            400: '#618986',
            900: '#111817'
        }
    },
    fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        sans: ['Inter', 'sans-serif']
    },
    borderRadius: {
        DEFAULT: '0.5rem',
        xl: '1rem',
        '2xl': '1.5rem'
    }
};

if (typeof tailwind !== 'undefined') {
    tailwind.config = {
        theme: {
            extend: {
                colors: DESIGN_SYSTEM.colors,
                fontFamily: DESIGN_SYSTEM.fontFamily,
                borderRadius: DESIGN_SYSTEM.borderRadius,
                screens: {
                    'xs': '480px',
                }
            },
        },
    };
}

document.addEventListener('DOMContentLoaded', () => {
    initSharedComponents();
});

function getSharedBasePath() {
    const pathname = window.location.pathname || '/';
    const normalizedPath = pathname.endsWith('/') ? pathname : pathname.replace(/[^/]*$/, '');
    const segments = normalizedPath
        .split('/')
        .filter((segment) => segment && segment !== '.');

    if (segments.length === 0) {
        return '';
    }

    return '../'.repeat(segments.length);
}

function initSharedComponents() {
    if (document.documentElement.dataset.sharedComponentsInitialized === 'true') {
        return;
    }

    const basePath = getSharedBasePath();

    ensureSharedStyles(basePath);

    const ctaTarget = `${basePath}pages/contact.html#contact`;
    const headerHTML = `
    <header class="site-shell border-b border-slate-200">
        <div class="site-shell__inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="site-shell__bar">
                <a href="${basePath}index.html" class="site-wordmark" aria-label="RLC 1952 Startseite">
                    <img src="${basePath}RLC-Logo_vector/RLC-Logo_vector_transparent.svg" alt="RLC 1952" class="site-logo-image" />
                </a>
                <div class="site-shell__cluster">
                    <nav class="site-nav hidden lg:flex" aria-label="Hauptnavigation">
                        <a class="site-nav-link text-sm font-semibold transition-colors" href="${basePath}index.html">Startseite</a>
                        <a class="site-nav-link text-sm font-semibold transition-colors" href="${basePath}pages/news.html">Aktuelles</a>
                        <a class="site-nav-link text-sm font-semibold transition-colors" href="${basePath}pages/training.html">Training</a>
                        <a class="site-nav-link text-sm font-semibold transition-colors" href="${basePath}pages/team.html">Unser Team</a>
                        <a class="site-nav-link text-sm font-semibold transition-colors" href="${basePath}pages/facilities.html">Sportstätten</a>
                        <a class="site-nav-link text-sm font-semibold transition-colors" href="${basePath}pages/gallery.html">Fotos</a>
                        <a class="site-nav-link text-sm font-semibold transition-colors" href="${basePath}pages/sponsors.html">Partner</a>
                        <a class="site-nav-link text-sm font-semibold transition-colors" href="${basePath}pages/contact.html">Kontakt</a>
                    </nav>
                    <div class="site-shell__actions">
                        <a href="${ctaTarget}" class="site-cta site-cta--header-main px-5 py-2.5 font-bold text-sm">
                            Mitmachen
                        </a>
                        <button id="mobile-menu-button" class="site-icon-button site-mobile-toggle lg:hidden p-2" aria-label="Hauptmenü öffnen" aria-expanded="false" aria-controls="mobile-menu" aria-haspopup="true">
                            <span class="material-icons-round">menu</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div id="mobile-menu" class="site-mobile-panel hidden lg:hidden bg-white border-b border-slate-200" hidden>
            <div class="site-mobile-panel__inner px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="${ctaTarget}" class="site-cta site-cta--mobile px-5 py-2.5 font-bold text-sm">
                    Mitmachen
                </a>
                <a class="site-mobile-link block px-3 py-4 text-base font-semibold" href="${basePath}index.html">Startseite</a>
                <a class="site-mobile-link block px-3 py-4 text-base font-semibold" href="${basePath}pages/news.html">Aktuelles</a>
                <a class="site-mobile-link block px-3 py-4 text-base font-semibold" href="${basePath}pages/training.html">Training</a>
                <a class="site-mobile-link block px-3 py-4 text-base font-semibold" href="${basePath}pages/team.html">Unser Team</a>
                <a class="site-mobile-link block px-3 py-4 text-base font-semibold" href="${basePath}pages/facilities.html">Sportstätten</a>
                <a class="site-mobile-link block px-3 py-4 text-base font-semibold" href="${basePath}pages/gallery.html">Fotos</a>
                <a class="site-mobile-link block px-3 py-4 text-base font-semibold" href="${basePath}pages/sponsors.html">Partner</a>
                <a class="site-mobile-link block px-3 py-4 text-base font-semibold" href="${basePath}pages/contact.html">Kontakt</a>
            </div>
        </div>
    </header>
    `;

    const footerHTML = `
    <footer class="site-footer py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div class="col-span-1 md:col-span-2">
                    <div class="flex items-center gap-3 mb-6">
                        <span class="font-display font-black text-2xl tracking-tighter">RLC<span class="text-primary">1952</span></span>
                    </div>
                    <p class="text-slate-400 max-w-sm mb-8 leading-relaxed">
                        Seit über 70 Jahren die Heimat für Leichtathletik in Recklinghausen. Wir fördern Talente und leben Gemeinschaft.
                    </p>
                    <div class="site-footer__social-row">
                        <a href="https://www.instagram.com/rlc_1952/" class="site-social-link" target="_blank" rel="noopener" aria-label="Instagram">
                            <span class="site-placeholder-icon" aria-hidden="true">
                                <img src="https://www.svgrepo.com/show/521711/instagram.svg" class="site-social-icon" alt="Instagram Logo">
                            </span>
                        </a>
                    </div>
                </div>
                <div>
                    <h4 class="font-bold mb-6 uppercase tracking-widest text-xs text-primary">Verein</h4>
                    <ul class="space-y-4 text-slate-400 text-sm">
                        <li><a href="${basePath}pages/team.html" class="site-footer-link transition-colors focus:outline-none">Unser Team</a></li>
                        <li><a href="${basePath}pages/training.html" class="site-footer-link transition-colors focus:outline-none">Trainingszeiten</a></li>
                        <li><a href="${basePath}pages/stats.html" class="site-footer-link transition-colors focus:outline-none">Rekorde & Bestenlisten</a></li>
                        <li><a href="${basePath}pages/gallery.html" class="site-footer-link transition-colors focus:outline-none">Bildergalerie</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold mb-6 uppercase tracking-widest text-xs text-primary">Rechtliches</h4>
                    <ul class="space-y-4 text-slate-400 text-sm">
                        <li><a href="${basePath}pages/contact.html#imprint" class="site-footer-link transition-colors focus:outline-none">Impressum</a></li>
                        <li><a href="${basePath}pages/contact.html#privacy" class="site-footer-link transition-colors focus:outline-none">Datenschutz</a></li>
                        <li><a href="${basePath}pages/contact.html#contact" class="site-footer-link transition-colors focus:outline-none">Kontakt</a></li>
                        <li><a href="${basePath}pages/sponsors.html" class="site-footer-link transition-colors focus:outline-none">Sponsoren</a></li>
                    </ul>
                </div>
            </div>
            <div class="site-footer__divider mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs">
                <p>&copy; 2026 Recklinghäuser Leichtathletik Club 1952 e.V.</p>
                <p class="mt-4 md:mt-0 italic">Mit Leidenschaft für die Leichtathletik entwickelt</p>
            </div>
        </div>
    </footer>
    `;

    // Inject into body
    const body = document.body;
    const headerPlaceholder = document.querySelector('[data-shared-shell-placeholder]');
    const footerPlaceholder = document.querySelector('[data-shared-footer-placeholder]');
    const existingHeader = document.querySelector('.site-shell');
    const existingFooter = document.querySelector('.site-footer');

    if (!existingHeader && headerPlaceholder) {
        headerPlaceholder.outerHTML = headerHTML;
    } else if (!existingHeader) {
        body.insertAdjacentHTML('afterbegin', headerHTML);
    }

    if (!existingFooter && footerPlaceholder) {
        footerPlaceholder.outerHTML = footerHTML;
    } else if (!existingFooter) {
        body.insertAdjacentHTML('beforeend', footerHTML);
    }

    document.documentElement.dataset.sharedComponentsInitialized = 'true';

    enforceLightTheme();
    highlightActiveNavigation();
    initMobileMenu();
}

function ensureSharedStyles(basePath) {
    const stylesheets = [
        `${basePath}assets/css/design-tokens.css`,
        `${basePath}assets/css/shell.css`
    ];

    stylesheets.forEach((href) => {
        const existingLink = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).find((link) => link.getAttribute('href') === href);
        if (!existingLink) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
        }
    });

}

function enforceLightTheme() {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');

    try {
        localStorage.removeItem('theme');
    } catch (error) {
        console.warn('Theme preference cleanup unavailable.', error);
    }
}

function highlightActiveNavigation() {
    const currentPath = window.location.pathname || '';
    const navLinks = document.querySelectorAll('.site-nav-link, .site-mobile-link');
    const isNewsDetailPath = /\/pages\/news\/[^/]+\.html$/.test(currentPath);

    navLinks.forEach((link) => {
        const href = link.getAttribute('href') || '';
        if (!href) {
            return;
        }

        const resolvedHref = new URL(href, window.location.href).pathname;
        const isIndex = /\/(?:index\.html)?$/.test(currentPath) && /\/index\.html$/.test(resolvedHref);
        const isNewsArchiveMatch = isNewsDetailPath && /\/pages\/news\.html$/.test(resolvedHref);
        const isCurrent = currentPath === resolvedHref || isIndex || isNewsArchiveMatch;

        link.classList.toggle('is-active', isCurrent);
        if (isCurrent) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        if (menuBtn.dataset.mobileMenuBound === 'true') {
            return;
        }

        menuBtn.dataset.mobileMenuBound = 'true';
        const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

        const updateMenuState = (isOpen) => {
            mobileMenu.hidden = !isOpen;
            mobileMenu.classList.toggle('hidden', !isOpen);
            menuBtn.setAttribute('aria-expanded', String(isOpen));
            menuBtn.setAttribute('aria-label', isOpen ? 'Hauptmenü schließen' : 'Hauptmenü öffnen');

            const icon = menuBtn.querySelector('.material-icons-round');
            if (icon) {
                icon.textContent = isOpen ? 'close' : 'menu';
            }
        };

        const closeMenu = () => {
            updateMenuState(false);
            menuBtn.focus();
        };

        updateMenuState(false);

        menuBtn.addEventListener('click', () => {
            const willOpen = menuBtn.getAttribute('aria-expanded') !== 'true';
            updateMenuState(willOpen);

            if (willOpen) {
                const firstLink = mobileMenu.querySelector(focusableSelector);
                firstLink?.focus();
            }
        });

        mobileMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => updateMenuState(false));
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
                closeMenu();
            }
        });

        document.addEventListener('click', (event) => {
            const isMenuOpen = menuBtn.getAttribute('aria-expanded') === 'true';
            if (!isMenuOpen) {
                return;
            }

            if (!mobileMenu.contains(event.target) && !menuBtn.contains(event.target)) {
                updateMenuState(false);
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024) {
                updateMenuState(false);
            }
        });
    }
}


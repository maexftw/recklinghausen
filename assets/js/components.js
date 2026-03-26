
// RLC 1952 - Common Initialization
// This script sets up Tailwind and injects shared components.

const DESIGN_SYSTEM = {
    colors: {
        primary: '#00B29A',
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
        darkMode: "class",
        theme: {
            extend: {
                colors: DESIGN_SYSTEM.colors,
                fontFamily: DESIGN_SYSTEM.fontFamily,
                borderRadius: DESIGN_SYSTEM.borderRadius,
            },
        },
    };
}

document.addEventListener('DOMContentLoaded', () => {
    initSharedComponents();
    initDarkMode();
});

function initSharedComponents() {
    const isRoot = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || !window.location.pathname.includes('/pages/');
    const basePath = isRoot ? '' : '../';

    ensureSharedStyles(basePath);

    const headerHTML = `
    <header class="site-shell border-b border-slate-200 dark:border-slate-800">
        <div class="site-shell__inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="site-shell__bar flex justify-between items-center h-20">
                <div class="flex items-center space-x-3">
                    <a href="${basePath}index.html" class="site-wordmark flex items-center gap-3 focus:outline-none">
                        <div class="flex flex-col leading-tight">
                            <span class="font-display font-black text-2xl tracking-tighter text-slate-900 dark:text-white">RLC<span class="text-primary">1952</span></span>
                            <span class="site-submark font-semibold opacity-80">Recklinghausen</span>
                        </div>
                    </a>
                </div>
                <nav class="hidden lg:flex items-center space-x-8">
                    <a class="site-nav-link text-sm font-semibold transition-colors focus:outline-none" href="${basePath}index.html">Startseite</a>
                    <a class="site-nav-link text-sm font-semibold transition-colors focus:outline-none" href="${basePath}pages/news.html">Aktuelles</a>
                    <a class="site-nav-link text-sm font-semibold transition-colors focus:outline-none" href="${basePath}pages/training.html">Training</a>
                    <a class="site-nav-link text-sm font-semibold transition-colors focus:outline-none" href="${basePath}pages/team.html">Verein</a>
                    <a class="site-nav-link text-sm font-semibold transition-colors focus:outline-none" href="${basePath}pages/facilities.html">Sportstätten</a>
                    <a class="site-nav-link text-sm font-semibold transition-colors focus:outline-none" href="${basePath}pages/stats.html">Statistiken</a>
                    <a class="site-nav-link text-sm font-semibold transition-colors focus:outline-none" href="${basePath}pages/gallery.html">Fotos</a>
                    <a class="site-nav-link text-sm font-semibold transition-colors focus:outline-none" href="${basePath}pages/sponsors.html">Partner</a>
                    <a class="site-nav-link text-sm font-semibold transition-colors focus:outline-none" href="${basePath}pages/scope-contract.html">Scope/Vertrag</a>
                    <a class="site-nav-link text-sm font-semibold transition-colors focus:outline-none" href="${basePath}pages/contact.html">Kontakt</a>
                </nav>
                <div class="flex items-center space-x-4">
                    <button id="theme-toggle" class="site-icon-button p-2 transition-colors focus:outline-none" aria-label="Farbthema umschalten">
                        <span class="material-icons-round" id="theme-toggle-icon">dark_mode</span>
                    </button>
                    <a href="${basePath}pages/register.html" class="site-cta px-5 py-2.5 font-bold text-sm focus:outline-none">
                        Mitmachen
                    </a>
                    <button id="mobile-menu-button" class="site-icon-button lg:hidden p-2 focus:outline-none" aria-label="Hauptmenü öffnen" aria-expanded="false" aria-controls="mobile-menu" aria-haspopup="true">
                        <span class="material-icons-round">menu</span>
                    </button>
                </div>
            </div>
        </div>
        <!-- Mobile Menu -->
        <div id="mobile-menu" class="site-mobile-panel hidden lg:hidden bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800" hidden>
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a class="site-mobile-link block px-3 py-4 text-base font-semibold focus:outline-none" href="${basePath}index.html">Startseite</a>
                <a class="site-mobile-link block px-3 py-4 text-base font-semibold focus:outline-none" href="${basePath}pages/news.html">Aktuelles</a>
                <a class="site-mobile-link block px-3 py-4 text-base font-semibold focus:outline-none" href="${basePath}pages/training.html">Training</a>
                <a class="site-mobile-link block px-3 py-4 text-base font-semibold focus:outline-none" href="${basePath}pages/team.html">Verein</a>
                <a class="site-mobile-link block px-3 py-4 text-base font-semibold focus:outline-none" href="${basePath}pages/facilities.html">Sportstätten</a>
                <a class="site-mobile-link block px-3 py-4 text-base font-semibold focus:outline-none" href="${basePath}pages/stats.html">Statistiken</a>
                <a class="site-mobile-link block px-3 py-4 text-base font-semibold focus:outline-none" href="${basePath}pages/gallery.html">Fotos</a>
                <a class="site-mobile-link block px-3 py-4 text-base font-semibold focus:outline-none" href="${basePath}pages/sponsors.html">Partner</a>
                <a class="site-mobile-link block px-3 py-4 text-base font-semibold focus:outline-none" href="${basePath}pages/scope-contract.html">Scope/Vertrag</a>
                <a class="site-mobile-link block px-3 py-4 text-base font-semibold focus:outline-none" href="${basePath}pages/contact.html">Kontakt</a>
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
                    <div class="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                        <div class="flex space-x-4" aria-label="Social-Media-Platzhalter">
                        <span class="site-placeholder-icon w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400" aria-hidden="true">
                            <img src="https://www.svgrepo.com/show/521711/instagram.svg" class="w-5 h-5 invert" alt="Instagram Logo">
                        </span>
                        <span class="site-placeholder-icon w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400" aria-hidden="true">
                            <img src="https://www.svgrepo.com/show/521654/facebook.svg" class="w-5 h-5 invert" alt="Facebook Logo">
                        </span>
                        </div>
                        <p class="site-pill-note">Offizielle Social-Media-Links folgen nach redaktioneller Freigabe.</p>
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
                        <li><a href="${basePath}pages/scope-contract.html" class="site-footer-link transition-colors focus:outline-none">Scope/Vertrag</a></li>
                        <li><a href="${basePath}pages/contact.html#contact" class="site-footer-link transition-colors focus:outline-none">Kontakt</a></li>
                        <li><a href="${basePath}pages/sponsors.html" class="site-footer-link transition-colors focus:outline-none">Sponsoren</a></li>
                    </ul>
                </div>
            </div>
            <div class="site-footer__divider mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs">
                <p>&copy; 2024 Recklinghäuser Leichtathletik Club 1952 e.V.</p>
                <p class="mt-4 md:mt-0 italic">Mit Leidenschaft für die Leichtathletik entwickelt</p>
            </div>
        </div>
    </footer>
    `;

    // Inject into body
    const body = document.body;
    const headerPlaceholder = document.querySelector('header');
    const footerPlaceholder = document.querySelector('footer');

    if (headerPlaceholder) {
        headerPlaceholder.outerHTML = headerHTML;
    } else {
        body.insertAdjacentHTML('afterbegin', headerHTML);
    }

    if (footerPlaceholder) {
        footerPlaceholder.outerHTML = footerHTML;
    } else {
        body.insertAdjacentHTML('beforeend', footerHTML);
    }

    // Initialize Menu after injection
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

function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
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

function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');

    // Check for saved theme or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        if (themeToggleIcon) themeToggleIcon.textContent = 'light_mode';
    } else {
        document.documentElement.classList.remove('dark');
        if (themeToggleIcon) themeToggleIcon.textContent = 'dark_mode';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.theme = 'light';
                if (themeToggleIcon) themeToggleIcon.textContent = 'dark_mode';
            } else {
                document.documentElement.classList.add('dark');
                localStorage.theme = 'dark';
                if (themeToggleIcon) themeToggleIcon.textContent = 'light_mode';
            }
        });
    }
}


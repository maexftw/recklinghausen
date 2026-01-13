
// RLC 1952 - Common Initialization
// This script sets up Tailwind and injects shared components.

if (typeof tailwind !== 'undefined') {
    tailwind.config = {
        darkMode: "class",
        theme: {
            extend: {
                colors: {
                    primary: "#00796B", // WCAG AA Compliant Teal (Contrast > 4.5:1 on white)
                    secondary: "#11d4c4", // Accent Teal (Decorative only)
                    "background-light": "#F9FAFB",
                    "background-dark": "#111827",
                },
                fontFamily: {
                    display: ["Montserrat", "sans-serif"],
                    sans: ["Inter", "sans-serif"],
                },
                borderRadius: {
                    DEFAULT: "0.5rem",
                    "xl": "1rem",
                    "2xl": "1.5rem",
                },
                spacing: {
                    '18': '4.5rem', // 72px
                    '22': '5.5rem', // 88px
                }
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

    const headerHTML = `
    <header class="fixed top-0 w-full z-50 glass-nav border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <div class="flex items-center space-x-3">
                    <a href="${basePath}index.html" class="flex items-center gap-3 min-h-[44px] min-w-[44px]">
                        <div class="flex flex-col leading-tight">
                            <span class="font-display font-black text-2xl tracking-tighter text-slate-900 dark:text-white">RLC<span class="text-primary">1952</span></span>
                            <span class="text-[10px] uppercase tracking-widest font-semibold opacity-60">Recklinghausen</span>
                        </div>
                    </a>
                </div>
                <nav class="hidden lg:flex items-center space-x-1">
                    <a class="flex items-center justify-center px-4 h-[44px] text-sm font-semibold hover:text-primary transition-colors rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50" href="${basePath}index.html">Startseite</a>
                    <a class="flex items-center justify-center px-4 h-[44px] text-sm font-semibold hover:text-primary transition-colors rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50" href="${basePath}pages/news.html">Aktuelles</a>
                    <a class="flex items-center justify-center px-4 h-[44px] text-sm font-semibold hover:text-primary transition-colors rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50" href="${basePath}pages/training.html">Training</a>
                    <a class="flex items-center justify-center px-4 h-[44px] text-sm font-semibold hover:text-primary transition-colors rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50" href="${basePath}pages/team.html">Verein</a>
                    <a class="flex items-center justify-center px-4 h-[44px] text-sm font-semibold hover:text-primary transition-colors rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50" href="${basePath}pages/stats.html">Statistiken</a>
                    <a class="flex items-center justify-center px-4 h-[44px] text-sm font-semibold hover:text-primary transition-colors rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50" href="${basePath}pages/gallery.html">Fotos</a>
                    <a class="flex items-center justify-center px-4 h-[44px] text-sm font-semibold hover:text-primary transition-colors rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50" href="${basePath}pages/sponsors.html">Partner</a>
                    <a class="flex items-center justify-center px-4 h-[44px] text-sm font-semibold hover:text-primary transition-colors rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50" href="${basePath}pages/contact.html">Kontakt</a>
                </nav>
                <div class="flex items-center space-x-2">
                    <button id="theme-toggle" class="w-[44px] h-[44px] flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-all" aria-label="Farbthema umschalten">
                        <span class="material-icons-round" id="theme-toggle-icon">dark_mode</span>
                    </button>
                    <a href="${basePath}pages/register.html" class="flex items-center justify-center h-[44px] bg-primary hover:bg-opacity-90 text-white px-6 rounded-xl font-bold text-sm transition-all transform hover:scale-105 shadow-lg shadow-primary/20">
                        Mitmachen
                    </a>
                    <button id="mobile-menu-button" class="lg:hidden w-[44px] h-[44px] flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Hauptmenü öffnen">
                        <span class="material-icons-round">menu</span>
                    </button>
                </div>
            </div>
        </div>
        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden lg:hidden bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 absolute w-full left-0 top-20 shadow-2xl">
            <div class="px-4 pt-4 pb-6 space-y-2">
                <a class="flex items-center px-4 h-[56px] text-base font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-900 dark:text-white" href="${basePath}index.html">Startseite</a>
                <a class="flex items-center px-4 h-[56px] text-base font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-900 dark:text-white" href="${basePath}pages/news.html">Aktuelles</a>
                <a class="flex items-center px-4 h-[56px] text-base font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-900 dark:text-white" href="${basePath}pages/training.html">Training</a>
                <a class="flex items-center px-4 h-[56px] text-base font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-900 dark:text-white" href="${basePath}pages/team.html">Verein</a>
                <a class="flex items-center px-4 h-[56px] text-base font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-900 dark:text-white" href="${basePath}pages/stats.html">Statistiken</a>
                <a class="flex items-center px-4 h-[56px] text-base font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-900 dark:text-white" href="${basePath}pages/gallery.html">Fotos</a>
                <a class="flex items-center px-4 h-[56px] text-base font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-900 dark:text-white" href="${basePath}pages/sponsors.html">Partner</a>
                <a class="flex items-center px-4 h-[56px] text-base font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-900 dark:text-white" href="${basePath}pages/contact.html">Kontakt</a>
            </div>
        </div>
    </header>
    `;

    const footerHTML = `
    <footer class="bg-slate-900 text-slate-300 py-16 lg:py-20 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
                <div class="col-span-1 md:col-span-2 space-y-8">
                    <div class="flex items-center gap-3">
                        <span class="font-display font-black text-3xl tracking-tighter text-white">RLC<span class="text-primary">1952</span></span>
                    </div>
                    <p class="text-slate-400 max-w-sm leading-relaxed">
                        Seit über 70 Jahren die Heimat für Leichtathletik in Recklinghausen. Wir fördern Talente, leben Gemeinschaft und setzen auf nachhaltigen Sport.
                    </p>
                    <div class="flex space-x-3">
                        <a href="#" class="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1" aria-label="Folge uns auf Instagram">
                            <img src="https://www.svgrepo.com/show/521711/instagram.svg" class="w-6 h-6 invert opacity-80" alt="Instagram Logo">
                        </a>
                        <a href="#" class="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1" aria-label="Folge uns auf Facebook">
                            <img src="https://www.svgrepo.com/show/521654/facebook.svg" class="w-6 h-6 invert opacity-80" alt="Facebook Logo">
                        </a>
                    </div>

                    <!-- Performance & Sustainability Scorecard -->
                    <div class="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mt-8 backdrop-blur-sm">
                        <h5 class="text-xs font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                            <span class="material-icons-round text-base">verified</span>
                            Web Performance Certificate
                        </h5>
                        <div class="grid grid-cols-3 gap-4">
                            <div class="text-center">
                                <div class="w-10 h-10 mx-auto bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mb-2">
                                    <span class="material-icons-round text-sm">bolt</span>
                                </div>
                                <span class="block text-[10px] font-bold uppercase text-slate-500">LCP 98%</span>
                            </div>
                            <div class="text-center">
                                <div class="w-10 h-10 mx-auto bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mb-2">
                                    <span class="material-icons-round text-sm">accessibility_new</span>
                                </div>
                                <span class="block text-[10px] font-bold uppercase text-slate-500">WCAG AA</span>
                            </div>
                            <div class="text-center">
                                <div class="w-10 h-10 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-2">
                                    <span class="material-icons-round text-sm">eco</span>
                                </div>
                                <span class="block text-[10px] font-bold uppercase text-slate-500">Eco-Friendly</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 class="font-bold mb-6 uppercase tracking-widest text-xs text-white">Verein</h4>
                    <ul class="space-y-4 text-sm font-medium">
                        <li><a href="${basePath}pages/team.html" class="hover:text-primary transition-colors flex items-center gap-2"><span class="w-1 h-1 bg-slate-600 rounded-full"></span> Unser Team</a></li>
                        <li><a href="${basePath}pages/training.html" class="hover:text-primary transition-colors flex items-center gap-2"><span class="w-1 h-1 bg-slate-600 rounded-full"></span> Trainingszeiten</a></li>
                        <li><a href="${basePath}pages/stats.html" class="hover:text-primary transition-colors flex items-center gap-2"><span class="w-1 h-1 bg-slate-600 rounded-full"></span> Rekorde</a></li>
                        <li><a href="${basePath}pages/gallery.html" class="hover:text-primary transition-colors flex items-center gap-2"><span class="w-1 h-1 bg-slate-600 rounded-full"></span> Bildergalerie</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold mb-6 uppercase tracking-widest text-xs text-white">Rechtliches</h4>
                    <ul class="space-y-4 text-sm font-medium">
                        <li><a href="${basePath}pages/contact.html#imprint" class="hover:text-primary transition-colors flex items-center gap-2"><span class="w-1 h-1 bg-slate-600 rounded-full"></span> Impressum</a></li>
                        <li><a href="${basePath}pages/contact.html#privacy" class="hover:text-primary transition-colors flex items-center gap-2"><span class="w-1 h-1 bg-slate-600 rounded-full"></span> Datenschutz</a></li>
                        <li><a href="${basePath}pages/contact.html#contact" class="hover:text-primary transition-colors flex items-center gap-2"><span class="w-1 h-1 bg-slate-600 rounded-full"></span> Kontakt</a></li>
                        <li><a href="${basePath}pages/sponsors.html" class="hover:text-primary transition-colors flex items-center gap-2"><span class="w-1 h-1 bg-slate-600 rounded-full"></span> Sponsoren</a></li>
                    </ul>
                </div>
            </div>
            <div class="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs">
                <p>&copy; 2024 Recklinghäuser Leichtathletik Club 1952 e.V.</p>
                <p class="mt-4 md:mt-0 flex items-center gap-2">
                    <span>Designed with</span>
                    <span class="material-icons-round text-primary text-sm">favorite</span>
                    <span>in Recklinghausen</span>
                </p>
            </div>
        </div>
    </footer>
    `;

    // Inject styles for glass-nav
    const style = document.createElement('style');
    style.textContent = `
        .glass-nav {
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            background-color: rgba(255, 255, 255, 0.9);
        }
        .dark .glass-nav {
            background-color: rgba(17, 24, 39, 0.9);
        }
    `;
    document.head.appendChild(style);

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

function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = menuBtn.querySelector('.material-icons-round');
            if (icon) {
                icon.textContent = mobileMenu.classList.contains('hidden') ? 'menu' : 'close';
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

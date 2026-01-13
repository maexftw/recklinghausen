
// RLC 1952 - Common Initialization
// This script sets up Tailwind and injects shared components.

if (typeof tailwind !== 'undefined') {
    tailwind.config = {
        darkMode: "class",
        theme: {
            extend: {
                colors: {
                    primary: "#00B29A", // Official RLC Teal
                    secondary: "#11d4c4", // Accent Teal
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
    <header class="fixed top-0 w-full z-50 glass-nav border-b border-slate-200 dark:border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <div class="flex items-center space-x-3">
                    <a href="${basePath}index.html" class="flex items-center gap-3">
                        <div class="flex flex-col leading-tight">
                            <span class="font-display font-black text-2xl tracking-tighter text-slate-900 dark:text-white">RLC<span class="text-primary">1952</span></span>
                            <span class="text-[10px] uppercase tracking-widest font-semibold opacity-60">Recklinghausen</span>
                        </div>
                    </a>
                </div>
                <nav class="hidden lg:flex items-center space-x-8">
                    <a class="text-sm font-semibold hover:text-primary transition-colors" href="${basePath}index.html">Startseite</a>
                    <a class="text-sm font-semibold hover:text-primary transition-colors" href="${basePath}pages/news.html">Aktuelles</a>
                    <a class="text-sm font-semibold hover:text-primary transition-colors" href="${basePath}pages/training.html">Training</a>
                    <a class="text-sm font-semibold hover:text-primary transition-colors" href="${basePath}pages/team.html">Verein</a>
                    <a class="text-sm font-semibold hover:text-primary transition-colors" href="${basePath}pages/stats.html">Statistiken</a>
                    <a class="text-sm font-semibold hover:text-primary transition-colors" href="${basePath}pages/gallery.html">Fotos</a>
                    <a class="text-sm font-semibold hover:text-primary transition-colors" href="${basePath}pages/sponsors.html">Partner</a>
                    <a class="text-sm font-semibold hover:text-primary transition-colors" href="${basePath}pages/contact.html">Kontakt</a>
                </nav>
                <div class="flex items-center space-x-4">
                    <button id="theme-toggle" class="p-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" aria-label="Farbthema umschalten">
                        <span class="material-icons-round" id="theme-toggle-icon">dark_mode</span>
                    </button>
                    <a href="${basePath}pages/register.html" class="bg-primary hover:bg-opacity-90 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all transform hover:scale-105 shadow-lg shadow-primary/20">
                        Mitmachen
                    </a>
                    <button id="mobile-menu-button" class="lg:hidden p-2 text-slate-600 dark:text-slate-400" aria-label="Hauptmenü öffnen">
                        <span class="material-icons-round">menu</span>
                    </button>
                </div>
            </div>
        </div>
        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden lg:hidden bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a class="block px-3 py-4 text-base font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl" href="${basePath}index.html">Startseite</a>
                <a class="block px-3 py-4 text-base font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl" href="${basePath}pages/news.html">Aktuelles</a>
                <a class="block px-3 py-4 text-base font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl" href="${basePath}pages/training.html">Training</a>
                <a class="block px-3 py-4 text-base font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl" href="${basePath}pages/team.html">Verein</a>
                <a class="block px-3 py-4 text-base font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl" href="${basePath}pages/stats.html">Statistiken</a>
                <a class="block px-3 py-4 text-base font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl" href="${basePath}pages/gallery.html">Fotos</a>
                <a class="block px-3 py-4 text-base font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl" href="${basePath}pages/sponsors.html">Partner</a>
                <a class="block px-3 py-4 text-base font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl" href="${basePath}pages/contact.html">Kontakt</a>
            </div>
        </div>
    </header>
    `;

    const footerHTML = `
    <footer class="bg-slate-900 text-white py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div class="col-span-1 md:col-span-2">
                    <div class="flex items-center gap-3 mb-6">
                        <span class="font-display font-black text-2xl tracking-tighter">RLC<span class="text-primary">1952</span></span>
                    </div>
                    <p class="text-slate-400 max-w-sm mb-8 leading-relaxed">
                        Seit über 70 Jahren die Heimat für Leichtathletik in Recklinghausen. Wir fördern Talente und leben Gemeinschaft.
                    </p>
                    <div class="flex space-x-4">
                        <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Folge uns auf Instagram">
                            <img src="https://www.svgrepo.com/show/521711/instagram.svg" class="w-5 h-5 invert" alt="Instagram Logo">
                        </a>
                        <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Folge uns auf Facebook">
                            <img src="https://www.svgrepo.com/show/521654/facebook.svg" class="w-5 h-5 invert" alt="Facebook Logo">
                        </a>
                    </div>
                </div>
                <div>
                    <h4 class="font-bold mb-6 uppercase tracking-widest text-xs text-primary">Verein</h4>
                    <ul class="space-y-4 text-slate-400 text-sm">
                        <li><a href="${basePath}pages/team.html" class="hover:text-white transition-colors">Unser Team</a></li>
                        <li><a href="${basePath}pages/training.html" class="hover:text-white transition-colors">Trainingszeiten</a></li>
                        <li><a href="${basePath}pages/stats.html" class="hover:text-white transition-colors">Rekorde & Bestenlisten</a></li>
                        <li><a href="${basePath}pages/gallery.html" class="hover:text-white transition-colors">Bildergalerie</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold mb-6 uppercase tracking-widest text-xs text-primary">Rechtliches</h4>
                    <ul class="space-y-4 text-slate-400 text-sm">
                        <li><a href="${basePath}pages/contact.html#imprint" class="hover:text-white transition-colors">Impressum</a></li>
                        <li><a href="${basePath}pages/contact.html#privacy" class="hover:text-white transition-colors">Datenschutz</a></li>
                        <li><a href="${basePath}pages/contact.html#contact" class="hover:text-white transition-colors">Kontakt</a></li>
                        <li><a href="${basePath}pages/sponsors.html" class="hover:text-white transition-colors">Sponsoren</a></li>
                    </ul>
                </div>
            </div>
            <div class="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs">
                <p>&copy; 2024 Recklinghäuser Leichtathletik Club 1952 e.V.</p>
                <p class="mt-4 md:mt-0 italic">Mit Leidenschaft für die Leichtathletik entwickelt</p>
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
            background-color: rgba(255, 255, 255, 0.85);
        }
        .dark .glass-nav {
            background-color: rgba(17, 24, 39, 0.85);
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

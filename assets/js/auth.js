// Authentifizierungs- und Vorschau-Logik für den internen Bereich

const SESSION_KEY = 'internal_user_session';
const INTERNAL_PREVIEW_COPY = 'Der interne Bereich ist aktuell nur eine lokale Vorschau. Die Rollenumschaltung dient ausschließlich zur UI-Demo und ersetzt keine serverseitige Authentifizierung.';
const DEFAULT_PERMISSIONS = {
    member: {
        access: true,
        features: ['view_training_plans', 'view_announcements', 'view_documents'],
        admin_features: false
    },
    admin: {
        access: true,
        features: ['view_training_plans', 'view_announcements', 'view_documents', 'edit_content', 'manage_users', 'view_statistics'],
        admin_features: true
    }
};

function checkAuthStatus() {
    try {
        const session = sessionStorage.getItem(SESSION_KEY);
        return session ? JSON.parse(session) : null;
    } catch (error) {
        sessionStorage.removeItem(SESSION_KEY);
        return null;
    }
}

function getPermissions(role) {
    return DEFAULT_PERMISSIONS[role] || DEFAULT_PERMISSIONS.member;
}

function saveSession(session) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function login(username, role) {
    const normalizedUsername = (username || '').trim();
    const normalizedRole = role === 'admin' ? 'admin' : 'member';

    if (!normalizedUsername) {
        return { success: false, message: 'Bitte geben Sie einen Namen für die Vorschau-Sitzung ein.' };
    }

    if (normalizedUsername.length < 2) {
        return { success: false, message: 'Der Name muss mindestens 2 Zeichen lang sein.' };
    }

    const session = {
        username: normalizedUsername,
        role: normalizedRole,
        loginTime: new Date().toISOString(),
        previewMode: true,
        permissions: getPermissions(normalizedRole)
    };

    saveSession(session);
    return { success: true, role: normalizedRole, session };
}

function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = './index.html?logged_out=1';
}

function isInternalPage() {
    return window.location.pathname.includes('/pages/internal/');
}

function isInternalIndexPage() {
    return /\/pages\/internal\/index\.html$/i.test(window.location.pathname) || window.location.pathname.endsWith('/pages/internal/');
}

function updateNavigation() {
    // Prüfen, ob der interne Bereich bereits in der Navigation vorhanden ist
    const existingLink = document.querySelector('.main-nav ul li a[href="./pages/internal/index.html"], .main-nav ul li a[href="../../pages/internal/index.html"]');

    if (!existingLink) {
        const internalLink = document.createElement('li');
        // Überprüfen, ob wir in der internen Navigation sind
        const isInternalPage = window.location.pathname.includes('/pages/internal/');
        
        if (isInternalPage) {
            // Für interne Seiten: Link zur Startseite des internen Bereichs
            internalLink.innerHTML = '<a href="../../pages/internal/index.html">Interner Bereich</a>';
        } else {
            // Für öffentliche Seiten: Link zur internen Startseite
            internalLink.innerHTML = '<a href="./pages/internal/index.html">Interner Bereich</a>';
        }

        const navList = document.querySelector('.main-nav ul');
        if (navList) {
            navList.appendChild(internalLink);
        }
    }
}

function renderPreviewNotice() {
    const container = document.querySelector('.internal-main .container');
    if (!container || document.getElementById('auth-preview-notice')) {
        return;
    }

    const notice = document.createElement('div');
    notice.id = 'auth-preview-notice';
    notice.setAttribute('role', 'note');
    notice.className = 'content-section';
    notice.innerHTML = `
        <h2>Hinweis zur Zugriffssicherheit</h2>
        <p>${INTERNAL_PREVIEW_COPY}</p>
    `;

    const heading = container.querySelector('h1');
    if (heading) {
        heading.insertAdjacentElement('afterend', notice);
    } else {
        container.prepend(notice);
    }
}

function setVisibility(element, isVisible) {
    if (!element) {
        return;
    }

    element.hidden = !isVisible;
    element.setAttribute('aria-hidden', String(!isVisible));
}

function applyRoleAccess(session) {
    const isAdmin = session && session.role === 'admin';

    document.querySelectorAll('[data-requires-role="admin"]').forEach((element) => {
        setVisibility(element, isAdmin);
    });

    document.querySelectorAll('[data-disabled-until-server-auth="true"]').forEach((element) => {
        element.setAttribute('aria-disabled', 'true');
        element.classList.add('is-disabled');
    });
}

function protectInternalSubpages() {
    if (!isInternalPage() || isInternalIndexPage()) {
        return;
    }

    const session = checkAuthStatus();
    if (!session) {
        window.location.href = './index.html?auth=required';
        return;
    }

    renderPreviewNotice();
    applyRoleAccess(session);
}

function updateStatusMessage(message, tone = 'info') {
    const element = document.getElementById('login-error');
    if (!element) {
        return;
    }

    element.textContent = message || '';
    element.dataset.tone = tone;
}

function showDashboard() {
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const session = checkAuthStatus();

    renderPreviewNotice();

    if (!loginSection || !dashboardSection) {
        applyRoleAccess(session);
        return;
    }

    if (!session) {
        setVisibility(loginSection, true);
        setVisibility(dashboardSection, false);
        return;
    }

    setVisibility(loginSection, false);
    setVisibility(dashboardSection, true);

    const currentUserElement = document.getElementById('current-user');
    const userRoleElement = document.getElementById('user-role');

    if (currentUserElement) {
        currentUserElement.textContent = session.username;
    }

    if (userRoleElement) {
        userRoleElement.textContent = session.role === 'admin' ? 'Administrator-Vorschau' : 'Mitglieds-Vorschau';
    }

    applyRoleAccess(session);

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn && !logoutBtn.hasAttribute('data-listener-added')) {
        logoutBtn.addEventListener('click', logout);
        logoutBtn.setAttribute('data-listener-added', 'true');
    }
}

function handleLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (!loginForm || loginForm.hasAttribute('data-listener-added')) {
        return;
    }

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username')?.value;
        const role = document.getElementById('role')?.value;
        const result = login(username, role);

        if (!result.success) {
            updateStatusMessage(result.message, 'error');
            return;
        }

        updateStatusMessage('Vorschau-Zugang aktiviert. Änderungen in Verwaltungsansichten bleiben lokal im Browser und werden nicht gespeichert.', 'success');
        showDashboard();
    });

    loginForm.setAttribute('data-listener-added', 'true');
}

function applyQueryMessage() {
    const params = new URLSearchParams(window.location.search);

    if (params.get('auth') === 'required') {
        updateStatusMessage('Bitte starten Sie zuerst eine Vorschau-Sitzung, um interne Unterseiten zu öffnen.', 'error');
    }

    if (params.get('logged_out') === '1') {
        updateStatusMessage('Sie haben die Vorschau-Sitzung beendet.', 'info');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
    protectInternalSubpages();
    applyQueryMessage();
    showDashboard();
    handleLoginForm();
});

window.login = login;
window.logout = logout;
window.checkAuthStatus = checkAuthStatus;

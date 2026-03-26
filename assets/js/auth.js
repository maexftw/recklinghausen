// Authentifizierungslogik für den internen Bereich

// Benutzerdaten (in einer echten Anwendung würden diese aus einer Datenbank kommen)
const users = [
    { username: 'member1', password: 'member123', role: 'member' },
    { username: 'admin1', password: 'admin123', role: 'admin' },
    { username: 'member2', password: 'member456', role: 'member' }
];

// Session Storage für die Authentifizierung
const SESSION_KEY = 'internal_user_session';

// Funktion zum Einloggen
function login(username, password) {
    // Suche nach dem Benutzer
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Speichere die Session
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({
            username: user.username,
            role: user.role,
            loginTime: new Date().toISOString()
        }));
        
        return { success: true, role: user.role };
    } else {
        return { success: false, message: 'Ungültiger Benutzername oder Passwort' };
    }
}

// Funktion zum Ausloggen
function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = './index.html';
}

// Funktion zur Überprüfung des Login-Status
function checkAuthStatus() {
    const session = sessionStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
}

// Funktion zum Aktualisieren der Navigation basierend auf dem Login-Status
function updateNavigation() {
    // Prüfe, ob der Link bereits existiert
    const existingLink = document.querySelector('.main-nav ul li a[href="./pages/internal/index.html"]');
    
    if (!existingLink) {
        const internalLink = document.createElement('li');
        internalLink.innerHTML = '<a href="./pages/internal/index.html">Interner Bereich</a>';
        
        const navList = document.querySelector('.main-nav ul');
        
        // Füge den Link zur Navigation hinzu
        if (navList) {
            // Reduce layout thrashing by batching DOM operations
            const fragment = document.createDocumentFragment();
            fragment.appendChild(internalLink);
            navList.appendChild(fragment);
        }
    }
}

// Funktion zum Anzeigen der Dashboard-Inhalte basierend auf Berechtigungen
function showDashboard() {
    const session = checkAuthStatus();
    
    if (session) {
        // Verstecke den Login-Bereich und zeige das Dashboard
        const loginSection = document.getElementById('login-section');
        const dashboardSection = document.getElementById('dashboard-section');
        
        // Reduce layout thrashing by batching DOM operations
        if (loginSection) {
            loginSection.classList.remove('block');
            loginSection.classList.add('hidden');
        }
        if (dashboardSection) {
            dashboardSection.classList.remove('hidden');
            dashboardSection.classList.add('block');
        }
        
        // Aktualisiere die Benutzerinformationen
        const currentUserElement = document.getElementById('current-user');
        const userRoleElement = document.getElementById('user-role');
        
        if (currentUserElement) currentUserElement.textContent = session.username;
        if (userRoleElement) userRoleElement.textContent = session.role === 'admin' ? 'Administrator' : 'Mitglied';
        
        // Zeige entsprechende Inhalte basierend auf Berechtigungen
        const memberContent = document.getElementById('member-content');
        const adminContent = document.getElementById('admin-content');
        
        if (memberContent) {
            memberContent.classList.remove('hidden');
            memberContent.classList.add('block');
        }
        if (adminContent) {
            if (session.role === 'admin') {
                adminContent.classList.remove('hidden');
                adminContent.classList.add('block');
            } else {
                adminContent.classList.remove('block');
                adminContent.classList.add('hidden');
            }
        }
        
        // Füge Logout-Button hinzu
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            // Only add event listener once to prevent multiple listeners
            if (!logoutBtn.hasAttribute('data-listener-added')) {
                logoutBtn.addEventListener('click', function() {
                    logout();
                });
                logoutBtn.setAttribute('data-listener-added', 'true');
            }
        }
    } else {
        // Zeige Login-Bereich an, wenn nicht angemeldet
        const loginSection = document.getElementById('login-section');
        const dashboardSection = document.getElementById('dashboard-section');
        
        if (loginSection) {
            loginSection.classList.remove('hidden');
            loginSection.classList.add('block');
        }
        if (dashboardSection) {
            dashboardSection.classList.remove('block');
            dashboardSection.classList.add('hidden');
        }
    }
}

// Funktion zum Behandeln des Login-Formulars
function handleLoginForm() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorElement = document.getElementById('login-error');
            
            // Login-Prüfung
            const result = login(username, password);
            
            if (result.success) {
                // Batch DOM operations to reduce layout thrashing
                if (errorElement) {
                    errorElement.textContent = '';
                }
                showDashboard();
            } else {
                // Batch DOM operations to reduce layout thrashing
                if (errorElement) {
                    errorElement.textContent = result.message;
                }
            }
        });
    }
}

// Initialisierung beim Laden der Seite
document.addEventListener('DOMContentLoaded', function() {
    // Aktualisiere die Navigation
    updateNavigation();
    
    // Zeige Dashboard-Inhalte basierend auf Authentifizierungsstatus
    showDashboard();
    
    // Behandle Login-Formular
    handleLoginForm();
});

// Exportiere Funktionen für andere Module
window.login = login;
window.logout = logout;
window.checkAuthStatus = checkAuthStatus;
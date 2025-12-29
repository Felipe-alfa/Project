// User Login State (simulado - false = não logado, true = logado)
let isLoggedIn = false;

// Toggle Dropdown
function toggleDropdown() {
    const dropdown = document.getElementById('dropdownMenu');
    if (!dropdown) return;
    
    dropdown.classList.toggle('active');
    
    if (dropdown.classList.contains('active')) {
        updateDropdownContent();
    }
}

// Update Dropdown Content based on login state
function updateDropdownContent() {
    const content = document.getElementById('dropdownContent');
    if (!content) return;
    
    if (isLoggedIn) {
        // Usuário LOGADO
        content.innerHTML = `
            <div class="dropdown-item" onclick="openProfile()">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <span>Configurar perfil</span>
            </div>
            <div class="dropdown-item" onclick="goToMyPages()">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
                <span>Minhas landing pages</span>
            </div>
            <div class="dropdown-item" onclick="openHelp()">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
                <span>Ajuda / Suporte</span>
            </div>
            <div class="dropdown-item" onclick="openSettings()">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                </svg>
                <span>Configurações</span>
            </div>
        `;
    } else {
        // Usuário NÃO LOGADO
        content.innerHTML = `
            <div class="dropdown-item" onclick="showCreateAccount()">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <span>Criar conta</span>
            </div>
            <div class="dropdown-item" onclick="showLogin()">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/>
                </svg>
                <span>Entrar</span>
            </div>
            <div class="dropdown-item" onclick="openSettings()">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                </svg>
                <span>Configurações do site</span>
            </div>
            <div class="dropdown-item" onclick="openHelp()">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
                <span>Ajuda / Suporte</span>
            </div>
        `;
    }
}

// Show Create Account
function showCreateAccount() {
    closeDropdown();
    alert('🎉 Funcionalidade de criar conta em desenvolvimento!\n\nEm breve você poderá:\n• Criar sua conta gratuita\n• Salvar suas landing pages\n• Acessar templates premium\n• E muito mais!');
}

// Show Login (simula login)
function showLogin() {
    closeDropdown();
    const login = confirm('🔐 Deseja fazer login?\n\nClique OK para simular login (modo demo)');
    
    if (login) {
        isLoggedIn = true;
        alert('✅ Login realizado com sucesso!\n\nBem-vindo ao Leadify! Agora você tem acesso a todas as funcionalidades.');
        // Atualiza o dropdown se estiver aberto
        const dropdown = document.getElementById('dropdownMenu');
        if (dropdown && dropdown.classList.contains('active')) {
            updateDropdownContent();
        }
    }
}

// Open Profile Modal (CONFIGURAR PERFIL)
function openProfile() {
    closeDropdown();
    const profileModal = document.getElementById('profileModal');
    if (profileModal) {
        profileModal.classList.add('active');
    } else {
        alert('⚙️ Configurar Perfil\n\nAqui você poderá:\n• Editar dados do perfil\n• Alterar senha\n• Gerenciar assinatura/plano\n• Preferências do usuário');
    }
}

// Close Profile Modal
function closeProfile() {
    const profileModal = document.getElementById('profileModal');
    if (profileModal) {
        profileModal.classList.remove('active');
    }
}

// Go to My Pages
function goToMyPages() {
    closeDropdown();
    alert('📄 Minhas Landing Pages\n\nAqui você encontrará todas as landing pages que criou.\n\nRedirecionando...');
    window.location.href = 'index.html';
}

// Open Help
function openHelp() {
    closeDropdown();
    alert('❓ Ajuda / Suporte\n\nPrecisa de ajuda?\n\n• Tutoriais em vídeo\n• Base de conhecimento\n• Chat ao vivo\n• Email: suporte@leadify.com\n\nEstamos aqui para ajudar!');
}

// Open Settings
function openSettings() {
    closeDropdown();
    window.location.href = 'settings.html';
}

// Close Dropdown
function closeDropdown() {
    const dropdown = document.getElementById('dropdownMenu');
    if (dropdown) {
        dropdown.classList.remove('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('dropdownMenu');
    const profileBtn = document.querySelector('.profile-btn');
    
    if (dropdown && profileBtn && !dropdown.contains(event.target) && !profileBtn.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});

// Close profile modal when clicking outside
if (document.getElementById('profileModal')) {
    document.getElementById('profileModal').addEventListener('click', function(event) {
        if (event.target === this) {
            closeProfile();
        }
    });
}

// Exit Editor - volta para index.html
function exitEditor() {
    window.location.href = 'index.html';
}

// Initialize dropdown on page load
document.addEventListener('DOMContentLoaded', function() {
    updateDropdownContent();
});
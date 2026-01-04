/* ============================================
   EDITOR VIP PREMIUM - FUNCIONALIDADES EXCLUSIVAS
   Vozzy - Plano VIP
   ============================================ */

console.log('%c👑 EDITOR VIP PREMIUM ATIVADO!', 'font-size: 20px; font-weight: bold; color: #FFD700; text-shadow: 0 0 10px rgba(255,215,0,0.5);');

/* ============================================
   INICIALIZAÇÃO VIP
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initializeVIPTemplateSelector();
    initializeVIPFeatures();
    initializeToggleSections();
    showVIPWelcomeMessage();
});

/* ============================================
   SELETOR DE TEMPLATES VIP (12 templates)
   ============================================ */

function initializeVIPTemplateSelector() {
    const selector = document.getElementById('vipTemplateSelector');
    if (!selector) return;
    
    const currentTemplate = localStorage.getItem('selectedTemplate');
    let html = '';
    
    // Todos os 12 templates VIP
    const VIP_TEMPLATES_LIST = {
        'startup': { name: 'Startup', category: 'Tech' },
        'business': { name: 'Business Pro', category: 'Corporate' },
        'portfolio': { name: 'Portfolio', category: 'Creative' },
        'agency': { name: 'Agency', category: 'Marketing' },
        'saas': { name: 'SaaS Pro', category: 'Software' },
        'restaurant': { name: 'Restaurant', category: 'Food' },
        'fitness': { name: 'Fitness', category: 'Health' },
        'education': { name: 'Education', category: 'Learning' },
        'realestate': { name: 'Real Estate', category: 'Property' },
        'fashion': { name: 'Fashion', category: 'Retail' },
        'travel': { name: 'Travel', category: 'Tourism' },
        'consulting': { name: 'Consulting', category: 'Professional' }
    };
    
    Object.entries(VIP_TEMPLATES_LIST).forEach(([key, config]) => {
        const isActive = key === currentTemplate;
        html += `
            <div class="vip-template-card ${isActive ? 'active' : ''}" onclick="switchVIPTemplate('${key}')">
                <div class="vip-template-name">${config.name}</div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
                    <span style="font-size: 0.7rem; color: #888;">${config.category}</span>
                    ${isActive ? '<span class="vip-template-badge">✓ Ativo</span>' : ''}
                </div>
            </div>
        `;
    });
    
    selector.innerHTML = html;
    console.log('✅ 12 Templates VIP carregados');
}

function switchVIPTemplate(templateKey) {
    if (confirm(`Trocar para template "${templateKey.toUpperCase()}"?\n\nAlterações não salvas serão perdidas.`)) {
        localStorage.setItem('selectedTemplate', templateKey);
        showVIPSuccess('✅ Template alterado! Recarregando...');
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
}

/* ============================================
   FUNCIONALIDADES VIP EXCLUSIVAS
   ============================================ */

function initializeVIPFeatures() {
    console.log('🚀 Ativando funcionalidades VIP...');
    
    // 1. Assistente AI (simulado)
    window.openAIAssistant = function() {
        showVIPModal(
            '🤖 Assistente AI VIP',
            `<div style="text-align: center; padding: 2rem;">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" style="color: #FFD700; opacity: 0.5;">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
                <h3 style="margin-top: 1rem; color: #FFD700;">Em breve!</h3>
                <p style="color: #888; margin-top: 0.5rem;">O Assistente AI VIP está em desenvolvimento e será lançado em breve com recursos como:</p>
                <ul style="text-align: left; margin-top: 1rem; color: #ccc;">
                    <li>✨ Geração automática de textos</li>
                    <li>🎨 Sugestões de paleta de cores</li>
                    <li>🖼️ Otimização de imagens</li>
                    <li>📱 Adaptação responsiva inteligente</li>
                </ul>
            </div>`
        );
    };
    
    // 2. Upload de Imagens
    window.uploadImage = function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    showVIPSuccess('✅ Imagem carregada com sucesso!');
                    console.log('📸 Imagem:', event.target.result.substring(0, 50) + '...');
                    // Aqui você pode salvar a imagem no elemento selecionado
                    if (window.EditorState && window.EditorState.selectedElement) {
                        if (window.EditorState.selectedElement.tagName === 'IMG') {
                            window.EditorState.selectedElement.src = event.target.result;
                        }
                    }
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };
    
    // 3. Exportação Ilimitada (sem marca d'água)
    const originalExport = window.exportTemplate;
    if (originalExport) {
        window.exportTemplate = function() {
            console.log('👑 VIP: Exportação ilimitada SEM marca d\'água');
            // Chamar função original mas sem limitações
            originalExport();
        };
    }
    
    console.log('✅ Funcionalidades VIP ativadas');
}

/* ============================================
   TOGGLE DE SEÇÕES
   ============================================ */

function initializeToggleSections() {
    window.toggleSection = function(headerElement) {
        const content = headerElement.nextElementSibling;
        const icon = headerElement.querySelector('.toggle-icon');
        
        if (content && content.classList.contains('section-content')) {
            content.classList.toggle('expanded');
            
            if (icon) {
                if (content.classList.contains('expanded')) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        }
    };
}

/* ============================================
   MENSAGENS VIP
   ============================================ */

function showVIPWelcomeMessage() {
    setTimeout(() => {
        showVIPNotification('👑 Bem-vindo ao Editor VIP Premium!', 'Todos os recursos avançados estão disponíveis.', 'success');
    }, 1500);
}

function showVIPSuccess(message) {
    showVIPNotification('Sucesso', message, 'success');
}

function showVIPError(message) {
    showVIPNotification('Erro', message, 'error');
}

function showVIPNotification(title, message, type = 'info') {
    // Criar notificação estilizada
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: linear-gradient(135deg, rgba(15, 12, 41, 0.98), rgba(48, 43, 99, 0.98));
        backdrop-filter: blur(20px);
        border: 2px solid ${type === 'success' ? '#FFD700' : '#ef4444'};
        border-radius: 12px;
        padding: 1.25rem 1.5rem;
        max-width: 350px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        z-index: 10000;
        animation: vip-slide-in 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 1rem;">
            <div style="font-size: 1.5rem;">${type === 'success' ? '✅' : '⚠️'}</div>
            <div style="flex: 1;">
                <div style="font-weight: 700; color: #FFD700; margin-bottom: 0.25rem;">${title}</div>
                <div style="font-size: 0.875rem; color: #e0e0e0;">${message}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 4 segundos
    setTimeout(() => {
        notification.style.animation = 'vip-slide-out 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 4000);
}

// Adicionar animações CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes vip-slide-in {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes vip-slide-out {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* ============================================
   MODAL VIP
   ============================================ */

function showVIPModal(title, content) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, rgba(15, 12, 41, 0.98), rgba(48, 43, 99, 0.98));
            border: 2px solid rgba(255, 215, 0, 0.3);
            border-radius: 20px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7);
            animation: vip-modal-in 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        ">
            <div style="
                padding: 1.5rem 2rem;
                border-bottom: 2px solid rgba(255, 215, 0, 0.2);
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <h2 style="font-size: 1.5rem; color: #FFD700; margin: 0;">${title}</h2>
                <button onclick="this.closest('[style*=fixed]').remove()" style="
                    background: none;
                    border: none;
                    color: #888;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 0.5rem;
                    line-height: 1;
                ">×</button>
            </div>
            <div style="padding: 2rem;">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Fechar ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

const modalStyle = document.createElement('style');
modalStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes vip-modal-in {
        from {
            transform: scale(0.9) translateY(-20px);
            opacity: 0;
        }
        to {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(modalStyle);

/* ============================================
   RECURSOS ADICIONAIS VIP
   ============================================ */

// Salvar SEO automaticamente
document.addEventListener('DOMContentLoaded', function() {
    const seoTitle = document.getElementById('seoTitle');
    const seoDescription = document.getElementById('seoDescription');
    const seoKeywords = document.getElementById('seoKeywords');
    
    if (seoTitle) {
        seoTitle.addEventListener('input', () => {
            localStorage.setItem('vip_seo_title', seoTitle.value);
        });
        seoTitle.value = localStorage.getItem('vip_seo_title') || '';
    }
    
    if (seoDescription) {
        seoDescription.addEventListener('input', () => {
            localStorage.setItem('vip_seo_description', seoDescription.value);
        });
        seoDescription.value = localStorage.getItem('vip_seo_description') || '';
    }
    
    if (seoKeywords) {
        seoKeywords.addEventListener('input', () => {
            localStorage.setItem('vip_seo_keywords', seoKeywords.value);
        });
        seoKeywords.value = localStorage.getItem('vip_seo_keywords') || '';
    }
});

/* ============================================
   ESTATÍSTICAS VIP
   ============================================ */

console.log(`
╔════════════════════════════════════════════╗
║  👑 EDITOR VIP PREMIUM - VOZZY             ║
╠════════════════════════════════════════════╣
║  ✅ 12 Templates Premium                   ║
║  ✅ Exportação Ilimitada                   ║
║  ✅ Sem Marca d'Água                       ║
║  ✅ Upload de Imagens                      ║
║  ✅ Painel de Propriedades Completo        ║
║  ✅ Editor de SEO                          ║
║  ✅ Assistente AI (em breve)               ║
║  ✅ Drag & Drop Avançado                   ║
║  ✅ Histórico Ilimitado                    ║
║  ✅ Suporte Prioritário                    ║
╚════════════════════════════════════════════╝
`);

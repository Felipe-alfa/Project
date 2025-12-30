/* ============================================
   LEADIFY - SISTEMA DE MONETIZAÇÃO
   Gerencia limites de edição, upsell e marca d'água
   ============================================ */

const MonetizationSystem = {
    // Configurações
    config: {
        maxFreeEdits: 2, // Máximo de edições gratuitas (APENAS Editor Gratuito)
        watermarkText: 'Leadify',
        checkoutUrlRemoveWatermark: 'https://pay.kiwify.com.br/remover-marca-dagua', // R$ 9,99
        checkoutUrlVipPlan: 'https://pay.kiwify.com.br/plano-vip', // Plano VIP completo
        enableWatermark: true,
        enableEditLimit: true
    },

    // Detectar se está no Editor VIP ou Gratuito
    isVipEditor() {
        // Verifica pela URL ou por flag no localStorage
        const currentPage = window.location.pathname;
        const isVip = currentPage.includes('editor-vip') || localStorage.getItem('editorType') === 'vip';
        return isVip;
    },

    // Inicializar sistema
    init() {
        console.log('💰 Sistema de Monetização Iniciado');
        
        // Se for Editor VIP, desabilitar limites
        if (this.isVipEditor()) {
            console.log('👑 Editor VIP - Edições ilimitadas ativadas');
            this.config.enableEditLimit = false;
            this.config.enableWatermark = false;
            return; // Não executar resto do sistema
        }
        
        // Editor Gratuito - aplicar limites
        console.log('🆓 Editor Gratuito - Limites ativos');
        this.checkEditCount();
        this.updateEditsCounter();
        this.showWatermark();
        this.setupEventListeners();
    },

    // Obter chave única para o template
    getTemplateKey() {
        const templateId = localStorage.getItem('selectedTemplate') || 'default';
        return `leadify_edits_${templateId}`;
    },

    // Obter contador de edições
    getEditCount() {
        const key = this.getTemplateKey();
        const count = parseInt(localStorage.getItem(key)) || 0;
        return count;
    },

    // Incrementar contador de edições
    incrementEditCount() {
        const key = this.getTemplateKey();
        const currentCount = this.getEditCount();
        const newCount = currentCount + 1;
        localStorage.setItem(key, newCount);
        
        console.log(`📝 Edições: ${newCount}/${this.config.maxFreeEdits}`);
        
        this.updateEditsCounter();
        this.checkEditLimit();
        
        return newCount;
    },

    // Verificar se atingiu o limite
    hasReachedLimit() {
        return this.getEditCount() >= this.config.maxFreeEdits;
    },

    // Edições restantes
    getRemainingEdits() {
        const remaining = this.config.maxFreeEdits - this.getEditCount();
        return Math.max(0, remaining);
    },

    // Verificar limite de edições
    checkEditCount() {
        const remaining = this.getRemainingEdits();
        
        if (remaining === 0) {
            this.lockEditor();
        } else if (remaining === 1) {
            this.showFinalEditWarning();
        }
    },

    // Atualizar contador visual
    updateEditsCounter() {
        const remaining = this.getRemainingEdits();
        let counterElement = document.getElementById('editsCounter');
        
        // Criar elemento se não existir
        if (!counterElement) {
            const headerRight = document.querySelector('.header-right');
            if (headerRight) {
                counterElement = document.createElement('div');
                counterElement.id = 'editsCounter';
                counterElement.className = 'edits-counter';
                headerRight.insertBefore(counterElement, headerRight.firstChild);
            }
        }
        
        if (counterElement) {
            if (remaining > 0) {
                counterElement.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    <span class="counter-text">${remaining} ${remaining === 1 ? 'edição restante' : 'edições restantes'}</span>
                `;
                counterElement.className = remaining === 1 ? 'edits-counter warning' : 'edits-counter';
            } else {
                counterElement.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <span class="counter-text">Limite atingido</span>
                `;
                counterElement.className = 'edits-counter blocked';
            }
        }
    },

    // Bloquear editor
    lockEditor() {
        console.log('🔒 Editor bloqueado - Limite de edições atingido');
        
        // Desabilitar contenteditable
        const iframe = document.getElementById('previewFrame');
        if (iframe && iframe.contentDocument) {
            const editableElements = iframe.contentDocument.querySelectorAll('[contenteditable="true"]');
            editableElements.forEach(el => {
                el.setAttribute('contenteditable', 'false');
                el.style.cursor = 'not-allowed';
                el.style.opacity = '0.6';
            });
        }
        
        // Desabilitar botão salvar
        const saveButton = Array.from(document.querySelectorAll('button')).find(btn => 
            btn.textContent.includes('Salvar')
        );
        if (saveButton) {
            saveButton.disabled = true;
            saveButton.style.opacity = '0.5';
            saveButton.style.cursor = 'not-allowed';
        }
        
        // Mostrar modal de upgrade
        this.showUpgradeModal('limit');
    },

    // Aviso de última edição
    showFinalEditWarning() {
        // Criar banner de aviso
        let warningBanner = document.getElementById('finalEditWarning');
        
        if (!warningBanner) {
            warningBanner = document.createElement('div');
            warningBanner.id = 'finalEditWarning';
            warningBanner.className = 'final-edit-warning';
            warningBanner.innerHTML = `
                <div class="warning-content">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    <div class="warning-text">
                        <strong>⚠️ ATENÇÃO:</strong> Esta será sua edição final neste template!
                    </div>
                    <button class="warning-close" onclick="MonetizationSystem.closeWarningBanner()">✕</button>
                </div>
            `;
            
            document.body.insertBefore(warningBanner, document.body.firstChild);
        }
    },

    // Fechar banner de aviso
    closeWarningBanner() {
        const banner = document.getElementById('finalEditWarning');
        if (banner) {
            banner.remove();
        }
    },

    // Verificar antes de salvar (2ª edição)
    checkBeforeSave() {
        const currentCount = this.getEditCount();
        const remaining = this.getRemainingEdits();
        
        // Se for a última edição, mostrar confirmação
        if (remaining === 1) {
            return new Promise((resolve) => {
                this.showConfirmationModal(resolve);
            });
        }
        
        // Se já atingiu o limite
        if (remaining === 0) {
            this.showUpgradeModal('save_blocked');
            return Promise.resolve(false);
        }
        
        return Promise.resolve(true);
    },

    // Modal de confirmação (2ª edição)
    showConfirmationModal(callback) {
        const modal = document.createElement('div');
        modal.className = 'monetization-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content confirmation-modal">
                <div class="modal-header">
                    <h2>⚠️ Confirmação Necessária</h2>
                </div>
                <div class="modal-body">
                    <div class="confirmation-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" stroke-width="2">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                            <line x1="12" y1="9" x2="12" y2="13"/>
                            <line x1="12" y1="17" x2="12.01" y2="17"/>
                        </svg>
                    </div>
                    <h3>Esta será sua edição final!</h3>
                    <p>Após confirmar, você <strong>não poderá</strong> mais editar este template sem fazer upgrade para o plano VIP.</p>
                    <ul class="confirmation-list">
                        <li>✓ Você poderá visualizar o template</li>
                        <li>✓ Você poderá exportar a landing page</li>
                        <li>✗ Não será possível fazer novas alterações</li>
                    </ul>
                    <div class="confirmation-tip">
                        <strong>💡 Dica:</strong> Revise tudo com cuidado antes de confirmar!
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="MonetizationSystem.closeConfirmationModal(false)">
                        Cancelar e Revisar
                    </button>
                    <button class="btn-primary" onclick="MonetizationSystem.closeConfirmationModal(true)">
                        Confirmar Edição Final
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Guardar callback
        this.confirmationCallback = callback;
    },

    // Fechar modal de confirmação
    closeConfirmationModal(confirmed) {
        const modal = document.querySelector('.monetization-modal');
        if (modal) {
            modal.remove();
        }
        
        if (this.confirmationCallback) {
            this.confirmationCallback(confirmed);
            this.confirmationCallback = null;
        }
    },

    // Modal de Upgrade/Upsell
    showUpgradeModal(trigger = 'default') {
        // Remover modal anterior se existir
        const existingModal = document.querySelector('.upgrade-modal');
        if (existingModal) existingModal.remove();
        
        let title, message, features;
        
        if (trigger === 'limit') {
            title = '🔒 Limite de Edições Atingido';
            message = 'Você utilizou suas 2 edições gratuitas. Faça upgrade para continuar editando!';
            features = [
                '✨ Edições ilimitadas',
                '🎨 Todos os templates VIP',
                '🚫 Sem marca d\'água',
                '📱 Suporte prioritário',
                '🔄 Atualizações automáticas'
            ];
        } else if (trigger === 'watermark') {
            title = '🎨 Remova a Marca D\'água';
            message = 'Deixe sua landing page 100% profissional removendo a marca d\'água!';
            features = [
                '🚫 Sem marca d\'água',
                '✨ Design limpo e profissional',
                '🎨 Edições ilimitadas',
                '👑 Acesso VIP completo',
                '📈 Converta mais visitantes'
            ];
        } else {
            title = '👑 Desbloqueie o Poder Total';
            message = 'Upgrade para VIP e tenha acesso completo a todos os recursos!';
            features = [
                '✨ Edições ilimitadas',
                '🎨 Todos os templates',
                '🚫 Sem marca d\'água',
                '📱 Suporte prioritário'
            ];
        }
        
        const modal = document.createElement('div');
        modal.className = 'monetization-modal upgrade-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="MonetizationSystem.closeUpgradeModal()"></div>
            <div class="modal-content">
                <button class="modal-close" onclick="MonetizationSystem.closeUpgradeModal()">✕</button>
                <div class="modal-header">
                    <h2>${title}</h2>
                </div>
                <div class="modal-body">
                    <p class="upgrade-message">${message}</p>
                    <div class="upgrade-features">
                        ${features.map(feature => `<div class="feature-item">${feature}</div>`).join('')}
                    </div>
                    <div class="upgrade-pricing">
                        <div class="price-tag">
                            <span class="price-label">Plano VIP</span>
                            <span class="price-value">R$ 29,90<span>/mês</span></span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="MonetizationSystem.closeUpgradeModal()">
                        Continuar sem Upgrade
                    </button>
                    <button class="btn-primary large" onclick="MonetizationSystem.goToCheckout()">
                        <span>Fazer Upgrade Agora</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    },

    // Fechar modal de upgrade
    closeUpgradeModal() {
        const modal = document.querySelector('.upgrade-modal');
        if (modal) {
            modal.remove();
        }
    },

    // Ir para checkout
    goToCheckout() {
        window.open(this.config.checkoutUrlVipPlan, '_blank');
    },

    // Adicionar marca d'água no preview
    showWatermark() {
        if (!this.config.enableWatermark) return;
        
        const iframe = document.getElementById('previewFrame');
        if (!iframe) {
            console.warn('⚠️ Preview frame não encontrado');
            return;
        }
        
        // Função para adicionar marca d'água
        const addWatermark = () => {
            try {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                
                // Remover marca d'água existente
                const existing = iframeDoc.getElementById('leadify-watermark');
                if (existing) {
                    existing.remove();
                }
                
                // Criar nova marca d'água
                const watermark = iframeDoc.createElement('div');
                watermark.id = 'leadify-watermark';
                watermark.innerHTML = `
                    <div class="watermark-content">
                        <span>Made with</span>
                        <strong>Leadify</strong>
                        <button class="watermark-remove-btn" onclick="parent.MonetizationSystem.showWatermarkUpsellModal()" title="Remover marca d'água">
                            ✕
                        </button>
                    </div>
                `;
                
                // Adicionar estilos
                const style = iframeDoc.createElement('style');
                style.textContent = `
                    #leadify-watermark {
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        z-index: 999999;
                        padding: 12px 20px;
                        background: rgba(255, 255, 255, 0.95);
                        border: 2px solid #667eea;
                        border-radius: 50px;
                        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                        font-size: 14px;
                        backdrop-filter: blur(10px);
                        transition: all 0.3s ease;
                    }
                    #leadify-watermark:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 25px rgba(102, 126, 234, 0.4);
                    }
                    #leadify-watermark .watermark-content {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        color: #333;
                    }
                    #leadify-watermark strong {
                        color: #667eea;
                        font-weight: 700;
                    }
                    #leadify-watermark .watermark-remove-btn {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 24px;
                        height: 24px;
                        margin-left: 8px;
                        background: rgba(102, 126, 234, 0.1);
                        border: 1px solid rgba(102, 126, 234, 0.3);
                        border-radius: 50%;
                        color: #667eea;
                        font-size: 14px;
                        cursor: pointer;
                        transition: all 0.2s ease;
                    }
                    #leadify-watermark .watermark-remove-btn:hover {
                        background: #667eea;
                        color: white;
                        transform: rotate(90deg);
                    }
                `;
                
                if (!iframeDoc.getElementById('leadify-watermark-style')) {
                    style.id = 'leadify-watermark-style';
                    iframeDoc.head.appendChild(style);
                }
                
                if (iframeDoc.body) {
                    iframeDoc.body.appendChild(watermark);
                    console.log('💧 Marca d\'água adicionada');
                } else {
                    console.warn('⚠️ Body do iframe não encontrado');
                }
            } catch (error) {
                console.error('❌ Erro ao adicionar marca d\'água:', error);
            }
        };
        
        // Adicionar marca d'água imediatamente se já carregado
        if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            addWatermark();
        }
        
        // Também adicionar quando carregar
        iframe.addEventListener('load', addWatermark);
        
        // Observar mudanças no iframe (quando template é recarregado)
        const observer = new MutationObserver(() => {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            if (iframeDoc.body && !iframeDoc.getElementById('leadify-watermark')) {
                setTimeout(addWatermark, 100);
            }
        });
        
        // Iniciar observação
        if (iframe.contentDocument) {
            observer.observe(iframe.contentDocument, {
                childList: true,
                subtree: true
            });
        }
    },

    // Modal de Upsell da Marca d'Água (2 opções)
    showWatermarkUpsellModal() {
        // Remover modal anterior se existir
        const existingModal = document.querySelector('.watermark-upsell-modal');
        if (existingModal) existingModal.remove();
        
        const modal = document.createElement('div');
        modal.className = 'monetization-modal watermark-upsell-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="MonetizationSystem.closeWatermarkUpsellModal()"></div>
            <div class="modal-content">
                <button class="modal-close" onclick="MonetizationSystem.closeWatermarkUpsellModal()">✕</button>
                <div class="modal-header">
                    <h2>🎨 Remover Marca D'água</h2>
                </div>
                <div class="modal-body">
                    <p class="upsell-intro">Escolha a melhor opção para você:</p>
                    
                    <!-- Opção 1: Remover apenas marca d'água -->
                    <div class="upsell-option">
                        <div class="option-header">
                            <div class="option-icon">🚫</div>
                            <div class="option-info">
                                <h3>Apenas Remover Marca D'água</h3>
                                <p class="option-description">Ideal se você já está satisfeito com sua landing page</p>
                            </div>
                        </div>
                        <div class="option-features">
                            <div class="feature">✅ Remove a marca d'água</div>
                            <div class="feature">✅ Landing page 100% profissional</div>
                            <div class="feature disabled">❌ Limite de 2 edições mantido</div>
                            <div class="feature disabled">❌ Sem acesso ao Editor VIP</div>
                        </div>
                        <div class="option-pricing">
                            <div class="price-tag">
                                <span class="price-value">R$ 9,99<span class="price-label"> pagamento único</span></span>
                            </div>
                            <button class="btn-primary" onclick="MonetizationSystem.goToCheckoutRemoveWatermark()">
                                Remover Marca D'água
                            </button>
                        </div>
                    </div>
                    
                    <!-- Opção 2: Plano VIP Completo -->
                    <div class="upsell-option featured">
                        <div class="option-badge">🔥 MAIS POPULAR</div>
                        <div class="option-header">
                            <div class="option-icon">👑</div>
                            <div class="option-info">
                                <h3>Plano VIP Completo</h3>
                                <p class="option-description">Acesso total sem limites</p>
                            </div>
                        </div>
                        <div class="option-features">
                            <div class="feature">✅ Remove a marca d'água</div>
                            <div class="feature">✅ Edições ilimitadas</div>
                            <div class="feature">✅ Acesso ao Editor VIP</div>
                            <div class="feature">✅ Todos os templates VIP</div>
                            <div class="feature">✅ Suporte prioritário</div>
                            <div class="feature">✅ Atualizações constantes</div>
                        </div>
                        <div class="option-pricing">
                            <div class="price-tag">
                                <span class="price-value">R$ 29,90<span class="price-label">/mês</span></span>
                                <span class="price-note">Cancele quando quiser</span>
                            </div>
                            <button class="btn-primary large" onclick="MonetizationSystem.goToCheckoutVipPlan()">
                                Assinar Plano VIP
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    },

    // Fechar modal de upsell da marca d'água
    closeWatermarkUpsellModal() {
        const modal = document.querySelector('.watermark-upsell-modal');
        if (modal) {
            modal.remove();
        }
    },

    // Ir para checkout - Remover marca d'água (R$ 9,99)
    goToCheckoutRemoveWatermark() {
        window.open(this.config.checkoutUrlRemoveWatermark, '_blank');
    },

    // Ir para checkout - Plano VIP
    goToCheckoutVipPlan() {
        window.open(this.config.checkoutUrlVipPlan, '_blank');
    },

    // Remover marca d'água (apenas para usuários pagos)
    removeWatermark() {
        const iframe = document.getElementById('previewFrame');
        if (iframe && iframe.contentDocument) {
            const watermark = iframe.contentDocument.getElementById('leadify-watermark');
            if (watermark) {
                watermark.remove();
            }
        }
    },

    // Setup event listeners
    setupEventListeners() {
        // Interceptar salvamento
        const originalSave = window.saveTemplate;
        if (originalSave) {
            window.saveTemplate = async () => {
                const canSave = await this.checkBeforeSave();
                if (canSave) {
                    this.incrementEditCount();
                    originalSave();
                    
                    // Mostrar CTA após salvar
                    if (this.getRemainingEdits() === 0) {
                        setTimeout(() => {
                            this.showUpgradeModal('limit');
                        }, 1000);
                    }
                }
            };
        }
        
        // Interceptar exportação
        const originalExport = window.exportTemplate;
        if (originalExport) {
            window.exportTemplate = () => {
                // Mostrar modal de upgrade se tiver marca d'água
                if (this.config.enableWatermark) {
                    this.showUpgradeModal('watermark');
                }
                
                // Continuar com exportação normal
                originalExport();
            };
        }
    },

    // Resetar contador (apenas para testes)
    resetEditCount() {
        const key = this.getTemplateKey();
        localStorage.removeItem(key);
        console.log('🔄 Contador resetado');
        this.updateEditsCounter();
        window.location.reload();
    }
};

// Adicionar estilos para o sistema de monetização
const monetizationStyles = document.createElement('style');
monetizationStyles.textContent = `
    /* Contador de Edições */
    .edits-counter {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.625rem 1.25rem;
        background: rgba(102, 126, 234, 0.1);
        border: 1px solid rgba(102, 126, 234, 0.2);
        border-radius: 50px;
        font-size: 0.875rem;
        font-weight: 500;
        color: #667eea;
        margin-right: 1rem;
    }
    
    .edits-counter.warning {
        background: rgba(255, 193, 7, 0.1);
        border-color: rgba(255, 193, 7, 0.3);
        color: #ff9800;
    }
    
    .edits-counter.blocked {
        background: rgba(244, 67, 54, 0.1);
        border-color: rgba(244, 67, 54, 0.3);
        color: #f44336;
    }
    
    .edits-counter svg {
        width: 16px;
        height: 16px;
    }
    
    /* Banner de Aviso Final */
    .final-edit-warning {
        position: fixed;
        top: 80px;
        left: 0;
        right: 0;
        z-index: 999;
        background: linear-gradient(135deg, #ff9800 0%, #ff5722 100%);
        color: white;
        padding: 1rem;
        box-shadow: 0 4px 20px rgba(255, 152, 0, 0.3);
        animation: slideDown 0.4s ease-out;
    }
    
    .warning-content {
        max-width: 1320px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .warning-text {
        flex: 1;
        font-size: 0.95rem;
    }
    
    .warning-close {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.25rem;
        transition: all 0.3s;
    }
    
    .warning-close:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: rotate(90deg);
    }
    
    /* Modal de Monetização */
    .monetization-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease-out;
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(5px);
    }
    
    .modal-content {
        position: relative;
        z-index: 1;
        background: white;
        border-radius: 24px;
        max-width: 600px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.4s ease-out;
    }
    
    .modal-close {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
        background: rgba(0, 0, 0, 0.1);
        border: none;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.25rem;
        color: #666;
        transition: all 0.3s;
    }
    
    .modal-close:hover {
        background: rgba(0, 0, 0, 0.15);
        transform: rotate(90deg);
    }
    
    .modal-header {
        padding: 2rem 2rem 1rem;
        border-bottom: 1px solid #eee;
    }
    
    .modal-header h2 {
        font-size: 1.75rem;
        color: #333;
        margin: 0;
    }
    
    .modal-body {
        padding: 2rem;
    }
    
    .confirmation-icon {
        text-align: center;
        margin-bottom: 1.5rem;
    }
    
    .confirmation-modal h3 {
        text-align: center;
        font-size: 1.5rem;
        color: #333;
        margin-bottom: 1rem;
    }
    
    .confirmation-modal p {
        text-align: center;
        color: #666;
        line-height: 1.6;
        margin-bottom: 1.5rem;
    }
    
    .confirmation-list {
        list-style: none;
        padding: 1.5rem;
        background: #f8f9fa;
        border-radius: 12px;
        margin-bottom: 1.5rem;
    }
    
    .confirmation-list li {
        padding: 0.75rem 0;
        color: #333;
        font-size: 0.95rem;
        border-bottom: 1px solid #e0e0e0;
    }
    
    .confirmation-list li:last-child {
        border-bottom: none;
    }
    
    .confirmation-tip {
        padding: 1rem;
        background: rgba(102, 126, 234, 0.1);
        border-left: 4px solid #667eea;
        border-radius: 8px;
        color: #333;
        font-size: 0.9rem;
    }
    
    .upgrade-message {
        font-size: 1.125rem;
        color: #666;
        text-align: center;
        margin-bottom: 2rem;
        line-height: 1.6;
    }
    
    .upgrade-features {
        display: grid;
        gap: 1rem;
        margin-bottom: 2rem;
    }
    
    .feature-item {
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 12px;
        font-size: 1rem;
        color: #333;
        transition: all 0.3s;
    }
    
    .feature-item:hover {
        background: rgba(102, 126, 234, 0.1);
        transform: translateX(5px);
    }
    
    .upgrade-pricing {
        text-align: center;
        padding: 2rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 16px;
        margin-bottom: 2rem;
    }
    
    .price-tag {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .price-label {
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.9);
        font-weight: 500;
    }
    
    .price-value {
        font-size: 3rem;
        font-weight: bold;
        color: white;
    }
    
    .price-value span {
        font-size: 1.25rem;
        color: rgba(255, 255, 255, 0.8);
    }
    
    .modal-footer {
        padding: 1.5rem 2rem 2rem;
        border-top: 1px solid #eee;
        display: flex;
        gap: 1rem;
        justify-content: center;
    }
    
    .modal-footer .btn-primary.large {
        padding: 1.25rem 2.5rem;
        font-size: 1.125rem;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-100%);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Modal de Upsell da Marca d'Água */
    .watermark-upsell-modal .modal-content {
        max-width: 800px;
    }
    
    .upsell-intro {
        text-align: center;
        font-size: 1.125rem;
        color: #666;
        margin-bottom: 2rem;
    }
    
    .upsell-option {
        background: #f8f9fa;
        border: 2px solid #e9ecef;
        border-radius: 16px;
        padding: 2rem;
        margin-bottom: 1.5rem;
        transition: all 0.3s;
        position: relative;
    }
    
    .upsell-option:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
    
    .upsell-option.featured {
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
        border-color: #667eea;
        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.2);
    }
    
    .option-badge {
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%);
        padding: 0.5rem 1.5rem;
        background: linear-gradient(135deg, #ff9800 0%, #ff5722 100%);
        color: white;
        font-size: 0.875rem;
        font-weight: 700;
        border-radius: 50px;
        box-shadow: 0 4px 12px rgba(255, 152, 0, 0.4);
    }
    
    .option-header {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
        margin-bottom: 1.5rem;
    }
    
    .option-icon {
        font-size: 3rem;
        line-height: 1;
    }
    
    .option-info h3 {
        font-size: 1.5rem;
        color: #333;
        margin-bottom: 0.5rem;
    }
    
    .option-description {
        color: #666;
        font-size: 0.95rem;
    }
    
    .option-features {
        display: grid;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
    }
    
    .option-features .feature {
        padding: 0.75rem;
        background: white;
        border-radius: 8px;
        font-size: 0.95rem;
        color: #333;
    }
    
    .option-features .feature.disabled {
        opacity: 0.6;
        background: transparent;
    }
    
    .option-pricing {
        text-align: center;
    }
    
    .option-pricing .price-tag {
        margin-bottom: 1rem;
    }
    
    .option-pricing .price-value {
        font-size: 2.5rem;
        font-weight: 700;
        color: #333;
        display: block;
        margin-bottom: 0.5rem;
    }
    
    .option-pricing .price-label {
        font-size: 1rem;
        color: #666;
    }
    
    .option-pricing .price-note {
        display: block;
        font-size: 0.875rem;
        color: #999;
        margin-top: 0.5rem;
    }
    
    .option-pricing button {
        width: 100%;
        padding: 1rem 2rem;
        font-size: 1.125rem;
        font-weight: 600;
    }
`;
document.head.appendChild(monetizationStyles);

// Auto-inicializar quando o documento estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => MonetizationSystem.init(), 500);
    });
} else {
    setTimeout(() => MonetizationSystem.init(), 500);
}

console.log('%c💰 Sistema de Monetização Carregado', 'color: #10b981; font-weight: bold; font-size: 14px;');
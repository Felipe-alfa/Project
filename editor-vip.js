/* ============================================
   EDITOR VIP PREMIUM - JAVASCRIPT 100% FUNCIONAL
   Carrega templates via iframe.src (SEM FETCH!)
   ============================================ */

// Global State
const EditorState = {
    currentTemplate: null,
    selectedElement: null,
    device: 'desktop',
    isDirty: false
};

/* ============================================
   🔄 HISTORY MANAGER - SISTEMA UNDO/REDO
   Sistema robusto de histórico com state management
   ============================================ */

const HistoryManager = {
    // Configuração
    config: {
        maxHistorySize: 30,           // Limite de ações no histórico
        groupingDelay: 1000,          // Tempo para agrupar ações (ms)
        saveDebounceDelay: 500        // Delay para salvar estado
    },
    
    // Estado do histórico
    state: {
        past: [],                      // Estados anteriores
        present: null,                 // Estado atual
        future: [],                    // Estados após undo
        lastSaveTime: 0,               // Timestamp do último save
        isGrouping: false,             // Se está agrupando ações
        groupingTimer: null,           // Timer para agrupamento
        isRestoring: false             // Flag para evitar loops
    },
    
    // Inicializa o sistema
    init() {
        console.log('🔄 History Manager inicializado');
        this.setupKeyboardShortcuts();
        this.updateButtons();
    },
    
    // Configura atalhos de teclado
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+Z ou Cmd+Z (Mac) - Undo
            if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                this.undo();
            }
            
            // Ctrl+Shift+Z ou Ctrl+Y - Redo
            if ((e.ctrlKey || e.metaKey) && (e.shiftKey && e.key === 'z' || e.key === 'y')) {
                e.preventDefault();
                this.redo();
            }
        });
        
        console.log('⌨️ Atalhos configurados: Ctrl+Z (Undo) | Ctrl+Shift+Z ou Ctrl+Y (Redo)');
    },
    
    // Captura o estado atual do iframe
    captureState() {
        const iframe = document.getElementById('previewFrame');
        if (!iframe || !iframe.contentDocument) {
            return null;
        }
        
        const doc = iframe.contentDocument;
        if (!doc || !doc.body) {
            return null;
        }
        
        // Salva apenas o HTML do body (leve e eficiente)
        return {
            html: doc.body.innerHTML,
            timestamp: Date.now(),
            device: EditorState.device
        };
    },
    
    // Salva estado no histórico
    saveState(forceImmediate = false) {
        // Evita loops durante restore
        if (this.state.isRestoring) {
            return;
        }
        
        // Captura estado atual
        const currentState = this.captureState();
        if (!currentState) {
            return;
        }
        
        // Se não há estado presente, inicializa
        if (!this.state.present) {
            this.state.present = currentState;
            this.updateButtons();
            return;
        }
        
        // Verifica se houve mudança real
        if (this.state.present.html === currentState.html) {
            return; // Sem mudanças, não salva
        }
        
        // Controle de agrupamento de ações rápidas
        const timeSinceLastSave = Date.now() - this.state.lastSaveTime;
        
        if (!forceImmediate && timeSinceLastSave < this.config.groupingDelay) {
            // Agrupa ações rápidas (ex: digitação contínua)
            clearTimeout(this.state.groupingTimer);
            this.state.groupingTimer = setTimeout(() => {
                this._commitState(currentState);
            }, this.config.saveDebounceDelay);
            return;
        }
        
        // Commit imediato
        this._commitState(currentState);
    },
    
    // Commit do estado no histórico
    _commitState(newState) {
        // Adiciona estado atual ao passado
        this.state.past.push(this.state.present);
        
        // Limita tamanho do histórico
        if (this.state.past.length > this.config.maxHistorySize) {
            this.state.past.shift(); // Remove o mais antigo
        }
        
        // Atualiza presente
        this.state.present = newState;
        
        // Limpa futuro (novo caminho)
        this.state.future = [];
        
        // Atualiza timestamp
        this.state.lastSaveTime = Date.now();
        
        // Atualiza botões
        this.updateButtons();
        
        console.log(`💾 Estado salvo - Histórico: ${this.state.past.length} ações`);
    },
    
    // UNDO - Desfazer ação
    undo() {
        if (this.state.past.length === 0) {
            console.log('⚠️ Nada para desfazer');
            return;
        }
        
        // Move presente para futuro
        this.state.future.unshift(this.state.present);
        
        // Pega último estado do passado
        const previousState = this.state.past.pop();
        this.state.present = previousState;
        
        // Restaura estado
        this.restoreState(previousState);
        
        // Atualiza botões
        this.updateButtons();
        
        console.log(`↶ UNDO executado - Restam ${this.state.past.length} ações`);
        
        // Feedback visual
        this.showFeedback('↶ Desfeito');
    },
    
    // REDO - Refazer ação
    redo() {
        if (this.state.future.length === 0) {
            console.log('⚠️ Nada para refazer');
            return;
        }
        
        // Move presente para passado
        this.state.past.push(this.state.present);
        
        // Pega próximo estado do futuro
        const nextState = this.state.future.shift();
        this.state.present = nextState;
        
        // Restaura estado
        this.restoreState(nextState);
        
        // Atualiza botões
        this.updateButtons();
        
        console.log(`↷ REDO executado - Restam ${this.state.future.length} ações futuras`);
        
        // Feedback visual
        this.showFeedback('↷ Refeito');
    },
    
    // Restaura um estado no iframe
    restoreState(state) {
        if (!state) return;
        
        // Flag para evitar loops
        this.state.isRestoring = true;
        
        const iframe = document.getElementById('previewFrame');
        if (!iframe || !iframe.contentDocument) {
            this.state.isRestoring = false;
            return;
        }
        
        const doc = iframe.contentDocument;
        if (!doc || !doc.body) {
            this.state.isRestoring = false;
            return;
        }
        
        // Restaura HTML
        doc.body.innerHTML = state.html;
        
        // Reaplica editabilidade
        setTimeout(() => {
            makeTemplateEditable(doc);
            this.state.isRestoring = false;
        }, 100);
        
        // Marca como modificado
        EditorState.isDirty = true;
    },
    
    // Atualiza estado dos botões
    updateButtons() {
        const undoBtn = document.querySelector('[onclick="undo()"]');
        const redoBtn = document.querySelector('[onclick="redo()"]');
        
        if (undoBtn) {
            if (this.state.past.length > 0) {
                undoBtn.disabled = false;
                undoBtn.style.opacity = '1';
                undoBtn.title = `Desfazer (Ctrl+Z) - ${this.state.past.length} ações`;
            } else {
                undoBtn.disabled = true;
                undoBtn.style.opacity = '0.4';
                undoBtn.title = 'Nada para desfazer';
            }
        }
        
        if (redoBtn) {
            if (this.state.future.length > 0) {
                redoBtn.disabled = false;
                redoBtn.style.opacity = '1';
                redoBtn.title = `Refazer (Ctrl+Shift+Z) - ${this.state.future.length} ações`;
            } else {
                redoBtn.disabled = true;
                redoBtn.style.opacity = '0.4';
                redoBtn.title = 'Nada para refazer';
            }
        }
    },
    
    // Feedback visual temporário
    showFeedback(message) {
        // Remove feedback anterior se existir
        const existing = document.querySelector('.history-feedback');
        if (existing) existing.remove();
        
        // Cria novo feedback
        const feedback = document.createElement('div');
        feedback.className = 'history-feedback';
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.85);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            font-size: 0.875rem;
            font-weight: 600;
            z-index: 10000;
            animation: slideUp 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(feedback);
        
        // Remove após 1.5s
        setTimeout(() => {
            feedback.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => feedback.remove(), 300);
        }, 1500);
    },
    
    // Limpa histórico
    clear() {
        this.state.past = [];
        this.state.present = null;
        this.state.future = [];
        this.updateButtons();
        console.log('🗑️ Histórico limpo');
    },
    
    // Inicializa histórico com estado inicial
    initializeWithCurrentState() {
        const initialState = this.captureState();
        if (initialState) {
            this.state.present = initialState;
            this.state.past = [];
            this.state.future = [];
            this.updateButtons();
            console.log('✅ Histórico inicializado com estado inicial');
        }
    }
};

// Funções globais para os botões
function undo() {
    HistoryManager.undo();
}

function redo() {
    HistoryManager.redo();
}

/* ============================================
   🎯 DRAG & DROP MANAGER - SISTEMA DE SEÇÕES
   Sistema profissional de arrastar e soltar seções
   ============================================ */

const DragDropManager = {
    // Estado do drag
    state: {
        isDragging: false,
        draggedElement: null,
        draggedSection: null,
        ghostElement: null,
        dropIndicator: null,
        startY: 0,
        currentY: 0,
        scrollInterval: null,
        isMobile: false
    },
    
    // Configuração
    config: {
        scrollSpeed: 10,
        scrollZone: 100,
        animationDuration: 300
    },
    
    // Inicializa o sistema
    init() {
        this.state.isMobile = window.innerWidth <= 768;
        
        // Não inicializa em mobile por enquanto
        if (this.state.isMobile) {
            console.log('📱 Drag & Drop desabilitado em mobile');
            return;
        }
        
        console.log('🎯 Drag & Drop Manager inicializado');
        this.createDropIndicator();
    },
    
    // Cria indicador visual de drop
    createDropIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'drop-indicator';
        indicator.style.cssText = `
            position: absolute;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            border-radius: 2px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s ease;
            z-index: 10000;
            box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
        `;
        indicator.style.display = 'none';
        this.state.dropIndicator = indicator;
    },
    
    // Habilita drag em seções do iframe
    enableDragOnSections(doc) {
        if (this.state.isMobile) return;
        
        // Busca todas as seções importantes
        const sections = Array.from(doc.body.children).filter(el => {
            const tag = el.tagName.toLowerCase();
            const isSection = ['header', 'nav', 'main', 'section', 'article', 'aside', 'footer'].includes(tag);
            
            // Também considera divs com classes/ids semânticas
            if (tag === 'div' && (el.id || el.className)) {
                const combined = ((el.id || '') + ' ' + (el.className || '')).toLowerCase();
                const keywords = ['hero', 'about', 'feature', 'service', 'testimonial', 
                                 'pricing', 'contact', 'cta', 'gallery', 'team', 'faq', 'section'];
                return keywords.some(keyword => combined.includes(keyword));
            }
            
            return isSection;
        });
        
        sections.forEach(section => {
            this.makeSectionDraggable(section, doc);
        });
        
        console.log(`✅ ${sections.length} seções habilitadas para drag & drop`);
    },
    
    // Torna uma seção draggable
    makeSectionDraggable(section, doc) {
        // Adiciona atributo draggable
        section.setAttribute('draggable', 'true');
        section.style.cursor = 'move';
        
        // Adiciona handle visual (opcional)
        const handle = document.createElement('div');
        handle.className = 'drag-handle';
        handle.innerHTML = '⋮⋮';
        handle.style.cssText = `
            position: absolute;
            top: 10px;
            left: 10px;
            width: 30px;
            height: 30px;
            background: rgba(102, 126, 234, 0.9);
            color: white;
            border-radius: 6px;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
            font-weight: bold;
            cursor: move;
            z-index: 1000;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            transition: all 0.2s ease;
        `;
        
        // Posiciona seção relativa para o handle
        if (window.getComputedStyle(section).position === 'static') {
            section.style.position = 'relative';
        }
        
        section.appendChild(handle);
        
        // Mostra handle no hover
        section.addEventListener('mouseenter', () => {
            handle.style.display = 'flex';
        });
        
        section.addEventListener('mouseleave', () => {
            if (!this.state.isDragging) {
                handle.style.display = 'none';
            }
        });
        
        // Eventos de drag
        section.addEventListener('dragstart', (e) => this.handleDragStart(e, section, doc));
        section.addEventListener('dragend', (e) => this.handleDragEnd(e, section, doc));
        
        // Eventos de drop na seção
        section.addEventListener('dragover', (e) => this.handleDragOver(e, section, doc));
        section.addEventListener('drop', (e) => this.handleDrop(e, section, doc));
    },
    
    // Inicia o drag
    handleDragStart(e, section, doc) {
        this.state.isDragging = true;
        this.state.draggedSection = section;
        this.state.startY = e.clientY;
        
        // Adiciona classe de dragging
        section.classList.add('dragging');
        section.style.opacity = '0.5';
        
        // Cria ghost element
        this.createGhostElement(section);
        
        // Define dados de transferência
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', section.innerHTML);
        
        // Adiciona indicador ao body do iframe
        if (!doc.body.contains(this.state.dropIndicator)) {
            doc.body.appendChild(this.state.dropIndicator);
        }
        this.state.dropIndicator.style.display = 'block';
        
        // Inicia auto-scroll
        this.startAutoScroll();
        
        console.log('🎯 Drag iniciado:', section.tagName);
    },
    
    // Finaliza o drag
    handleDragEnd(e, section, doc) {
        this.state.isDragging = false;
        
        // Remove classe de dragging
        section.classList.remove('dragging');
        section.style.opacity = '';
        
        // Remove ghost
        if (this.state.ghostElement) {
            this.state.ghostElement.remove();
            this.state.ghostElement = null;
        }
        
        // Esconde indicador
        this.state.dropIndicator.style.opacity = '0';
        setTimeout(() => {
            this.state.dropIndicator.style.display = 'none';
        }, 200);
        
        // Para auto-scroll
        this.stopAutoScroll();
        
        // Esconde todos os handles
        const handles = doc.querySelectorAll('.drag-handle');
        handles.forEach(h => h.style.display = 'none');
        
        console.log('🎯 Drag finalizado');
    },
    
    // Durante o drag over
    handleDragOver(e, section, doc) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        if (!this.state.isDragging || section === this.state.draggedSection) {
            return;
        }
        
        // Calcula posição do mouse relativa à seção
        const rect = section.getBoundingClientRect();
        const mouseY = e.clientY - rect.top;
        const threshold = rect.height / 2;
        
        // Determina se deve inserir antes ou depois
        const insertBefore = mouseY < threshold;
        
        // Posiciona indicador
        this.showDropIndicator(section, insertBefore, doc);
    },
    
    // Drop da seção
    handleDrop(e, targetSection, doc) {
        e.preventDefault();
        e.stopPropagation();
        
        if (!this.state.draggedSection || targetSection === this.state.draggedSection) {
            return;
        }
        
        // Salva estado antes da mudança
        HistoryManager.saveState(true);
        
        // Calcula posição do mouse relativa à seção
        const rect = targetSection.getBoundingClientRect();
        const mouseY = e.clientY - rect.top;
        const threshold = rect.height / 2;
        
        // Determina se deve inserir antes ou depois
        const insertBefore = mouseY < threshold;
        
        // Move a seção
        if (insertBefore) {
            targetSection.parentNode.insertBefore(this.state.draggedSection, targetSection);
        } else {
            targetSection.parentNode.insertBefore(this.state.draggedSection, targetSection.nextSibling);
        }
        
        // Animação suave
        this.state.draggedSection.style.transition = 'transform 0.3s ease';
        this.state.draggedSection.style.transform = 'scale(1.02)';
        setTimeout(() => {
            this.state.draggedSection.style.transform = '';
            setTimeout(() => {
                this.state.draggedSection.style.transition = '';
            }, 300);
        }, 100);
        
        // Salva estado após mudança
        setTimeout(() => {
            HistoryManager.saveState(true);
        }, 400);
        
        // Atualiza árvore de camadas
        setTimeout(() => {
            generateLayersTree(doc);
        }, 500);
        
        console.log('✅ Seção movida com sucesso');
    },
    
    // Mostra indicador de drop
    showDropIndicator(section, insertBefore, doc) {
        const rect = section.getBoundingClientRect();
        const iframeRect = doc.defaultView.frameElement.getBoundingClientRect();
        
        let top;
        if (insertBefore) {
            top = rect.top - iframeRect.top;
        } else {
            top = rect.bottom - iframeRect.top;
        }
        
        this.state.dropIndicator.style.top = top + 'px';
        this.state.dropIndicator.style.opacity = '1';
    },
    
    // Cria elemento ghost para feedback visual
    createGhostElement(section) {
        const ghost = section.cloneNode(true);
        ghost.style.cssText = `
            position: fixed;
            top: -9999px;
            left: -9999px;
            opacity: 0.8;
            pointer-events: none;
        `;
        document.body.appendChild(ghost);
        this.state.ghostElement = ghost;
    },
    
    // Auto-scroll durante drag
    startAutoScroll() {
        const iframe = document.getElementById('previewFrame');
        if (!iframe || !iframe.contentWindow) return;
        
        this.state.scrollInterval = setInterval(() => {
            if (!this.state.isDragging) {
                this.stopAutoScroll();
                return;
            }
            
            const win = iframe.contentWindow;
            const mouseY = this.state.currentY;
            const windowHeight = window.innerHeight;
            
            // Scroll para cima
            if (mouseY < this.config.scrollZone) {
                win.scrollBy(0, -this.config.scrollSpeed);
            }
            
            // Scroll para baixo
            if (mouseY > windowHeight - this.config.scrollZone) {
                win.scrollBy(0, this.config.scrollSpeed);
            }
        }, 50);
    },
    
    // Para auto-scroll
    stopAutoScroll() {
        if (this.state.scrollInterval) {
            clearInterval(this.state.scrollInterval);
            this.state.scrollInterval = null;
        }
    },
    
    // Atualiza posição do mouse
    updateMousePosition(e) {
        this.state.currentY = e.clientY;
    }
};

// Event listener global para rastrear mouse
document.addEventListener('mousemove', (e) => {
    DragDropManager.updateMousePosition(e);
});

/* ============================================
   🎨 ELEMENT DRAG & DROP MANAGER
   Sistema de arrastar elementos da sidebar para o canvas
   ============================================ */

const ElementDragDropManager = {
    // Estado
    state: {
        isDragging: false,
        draggedElementType: null,
        dropPreview: null,
        targetContainer: null,
        isMobile: false
    },
    
    // Biblioteca de elementos disponíveis
    elements: {
        heading: {
            icon: '📝',
            label: 'Título',
            html: '<h2 style="margin: 20px 0; font-size: 2rem; font-weight: bold;">Novo Título</h2>'
        },
        paragraph: {
            icon: '📄',
            label: 'Parágrafo',
            html: '<p style="margin: 15px 0; line-height: 1.6;">Clique para editar este parágrafo. Adicione seu conteúdo aqui.</p>'
        },
        button: {
            icon: '🔘',
            label: 'Botão',
            html: '<button style="padding: 12px 32px; background: #667eea; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 1rem;">Clique Aqui</button>'
        },
        image: {
            icon: '🖼️',
            label: 'Imagem',
            html: '<img src="https://via.placeholder.com/400x300/667eea/ffffff?text=Imagem" alt="Nova imagem" style="max-width: 100%; height: auto; border-radius: 8px; margin: 15px 0;">'
        },
        video: {
            icon: '🎥',
            label: 'Vídeo',
            html: '<div style="position: relative; padding-bottom: 56.25%; height: 0; margin: 20px 0;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 8px;" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe></div>'
        },
        icon: {
            icon: '⭐',
            label: 'Ícone',
            html: '<div style="display: inline-flex; align-items: center; justify-content: center; width: 60px; height: 60px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border-radius: 12px; font-size: 2rem; margin: 10px;">⭐</div>'
        },
        divider: {
            icon: '➖',
            label: 'Divisor',
            html: '<hr style="border: none; border-top: 2px solid #e5e7eb; margin: 30px 0;">'
        },
        spacer: {
            icon: '⬜',
            label: 'Espaço',
            html: '<div style="height: 40px;"></div>'
        },
        container: {
            icon: '📦',
            label: 'Container',
            html: '<div style="padding: 30px; background: #f9fafb; border-radius: 12px; margin: 20px 0; border: 2px dashed #d1d5db;"><p style="text-align: center; color: #9ca3af;">Arraste elementos aqui</p></div>'
        },
        card: {
            icon: '🎴',
            label: 'Card',
            html: '<div style="padding: 24px; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin: 20px 0;"><h3 style="margin: 0 0 12px 0; font-size: 1.5rem;">Título do Card</h3><p style="margin: 0; color: #6b7280;">Conteúdo do card aqui.</p></div>'
        }
    },
    
    // Inicializa o sistema
    init() {
        this.state.isMobile = window.innerWidth <= 768;
        
        if (this.state.isMobile) {
            console.log('📱 Element Drag & Drop desabilitado em mobile');
            return;
        }
        
        this.populateElementsGrid();
        this.createDropPreview();
        console.log('🎨 Element Drag & Drop Manager inicializado');
    },
    
    // Popula a grid de elementos
    populateElementsGrid() {
        const grid = document.querySelector('.elements-grid');
        if (!grid) return;
        
        // Limpa grid
        grid.innerHTML = '';
        
        // Adiciona cada elemento
        Object.keys(this.elements).forEach(key => {
            const element = this.elements[key];
            const item = document.createElement('div');
            item.className = 'element-item';
            item.dataset.elementType = key;
            item.draggable = true;
            
            item.innerHTML = `
                <div class="element-icon">${element.icon}</div>
                <span class="element-label">${element.label}</span>
            `;
            
            // Eventos de drag
            item.addEventListener('dragstart', (e) => this.handleDragStart(e, key));
            item.addEventListener('dragend', (e) => this.handleDragEnd(e));
            
            grid.appendChild(item);
        });
        
        console.log(`✅ ${Object.keys(this.elements).length} elementos adicionados à grid`);
    },
    
    // Cria preview de drop
    createDropPreview() {
        const preview = document.createElement('div');
        preview.className = 'element-drop-preview';
        preview.style.cssText = `
            position: absolute;
            border: 2px dashed #667eea;
            background: rgba(102, 126, 234, 0.1);
            border-radius: 8px;
            pointer-events: none;
            display: none;
            z-index: 9999;
            padding: 10px;
            min-height: 40px;
        `;
        preview.innerHTML = '<p style="margin: 0; color: #667eea; font-size: 0.875rem;">Solte aqui</p>';
        this.state.dropPreview = preview;
    },
    
    // Inicia drag do elemento
    handleDragStart(e, elementType) {
        this.state.isDragging = true;
        this.state.draggedElementType = elementType;
        
        const element = this.elements[elementType];
        
        // Visual feedback
        e.target.style.opacity = '0.5';
        
        // Set drag data
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('text/html', element.html);
        e.dataTransfer.setData('elementType', elementType);
        
        console.log('🎨 Arrastando elemento:', element.label);
    },
    
    // Finaliza drag
    handleDragEnd(e) {
        this.state.isDragging = false;
        this.state.draggedElementType = null;
        
        // Remove visual feedback
        e.target.style.opacity = '';
        
        // Remove preview
        if (this.state.dropPreview && this.state.dropPreview.parentNode) {
            this.state.dropPreview.remove();
        }
    },
    
    // Habilita drop zones no iframe
    enableDropZones(doc) {
        if (this.state.isMobile || !doc) return;
        
        // Adiciona drop preview ao documento
        if (!doc.body.contains(this.state.dropPreview)) {
            doc.body.appendChild(this.state.dropPreview);
        }
        
        // Busca containers válidos para drop (seções, divs com classes específicas)
        const dropZones = Array.from(doc.body.querySelectorAll('section, main, div[class*="container"], div[class*="wrapper"], div[id], article, aside'));
        
        dropZones.forEach(zone => {
            // Remove listeners antigos
            zone.removeEventListener('dragover', this.handleDragOver);
            zone.removeEventListener('dragleave', this.handleDragLeave);
            zone.removeEventListener('drop', this.handleDrop);
            
            // Adiciona novos listeners
            zone.addEventListener('dragover', (e) => this.handleDragOver(e, zone, doc));
            zone.addEventListener('dragleave', (e) => this.handleDragLeave(e, zone));
            zone.addEventListener('drop', (e) => this.handleDrop(e, zone, doc));
        });
        
        // Também permite drop direto no body
        doc.body.addEventListener('dragover', (e) => this.handleDragOver(e, doc.body, doc));
        doc.body.addEventListener('drop', (e) => this.handleDrop(e, doc.body, doc));
        
        console.log(`✅ ${dropZones.length} drop zones habilitadas`);
    },
    
    // Durante drag over
    handleDragOver(e, zone, doc) {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
        
        // Mostra preview
        const preview = doc.querySelector('.element-drop-preview');
        if (preview) {
            preview.style.display = 'block';
            
            // Posiciona preview baseado no mouse
            const rect = zone.getBoundingClientRect();
            const scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;
            
            preview.style.top = (e.clientY - rect.top + scrollTop) + 'px';
            preview.style.left = '20px';
            preview.style.right = '20px';
        }
        
        // Destaca zona
        zone.style.outline = '2px dashed #667eea';
        zone.style.outlineOffset = '4px';
    },
    
    // Quando sai da zona
    handleDragLeave(e, zone) {
        e.preventDefault();
        zone.style.outline = '';
    },
    
    // Drop do elemento
    handleDrop(e, zone, doc) {
        e.preventDefault();
        e.stopPropagation();
        
        // Remove outline
        zone.style.outline = '';
        
        // Pega dados do elemento
        const elementType = e.dataTransfer.getData('elementType');
        const elementHTML = e.dataTransfer.getData('text/html');
        
        if (!elementType || !elementHTML) return;
        
        // Salva estado antes
        HistoryManager.saveState(true);
        
        // Cria wrapper para o novo elemento
        const wrapper = doc.createElement('div');
        wrapper.className = 'editor-element-wrapper';
        wrapper.dataset.elementType = elementType;
        wrapper.style.cssText = 'position: relative; transition: all 0.2s ease;';
        wrapper.innerHTML = elementHTML;
        
        // Insere no local do drop
        const rect = zone.getBoundingClientRect();
        const clickY = e.clientY - rect.top;
        
        // Encontra elemento mais próximo do clique
        const children = Array.from(zone.children);
        let insertBefore = null;
        
        for (let child of children) {
            const childRect = child.getBoundingClientRect();
            const childY = childRect.top - rect.top;
            
            if (childY > clickY) {
                insertBefore = child;
                break;
            }
        }
        
        // Insere elemento
        if (insertBefore) {
            zone.insertBefore(wrapper, insertBefore);
        } else {
            zone.appendChild(wrapper);
        }
        
        // Animação de entrada
        wrapper.style.opacity = '0';
        wrapper.style.transform = 'scale(0.8)';
        setTimeout(() => {
            wrapper.style.opacity = '1';
            wrapper.style.transform = 'scale(1)';
        }, 10);
        
        // Torna editável
        makeElementEditable(wrapper, doc);
        
        // Salva estado depois
        setTimeout(() => {
            HistoryManager.saveState(true);
            generateLayersTree(doc);
        }, 400);
        
        // Feedback visual
        showFeedback('✅ Elemento adicionado!', 'success');
        
        console.log('✅ Elemento inserido:', elementType);
    }
};

/* ============================================
   🎨 TEMPLATE COLOR MANAGER
   Sistema de customização de cores do template
   ============================================ */

const TemplateColorManager = {
    // Cores padrão do template
    currentColors: {
        primary: '#667eea',
        secondary: '#764ba2',
        accent: '#10b981',
        text: '#111827',
        background: '#ffffff',
        backgroundAlt: '#f9fafb'
    },
    
    // Propriedades de controle
    saveTimeout: null,
    hasSavedInitialState: false,
    
    // Inicializa o sistema
    init() {
        this.detectTemplateColors();
        this.createColorPanel();
        console.log('🎨 Template Color Manager inicializado');
    },
    
    // Detecta cores do template atual
    detectTemplateColors() {
        const iframe = document.getElementById('previewFrame');
        if (!iframe || !iframe.contentDocument) return;
        
        const doc = iframe.contentDocument;
        
        // Detecta cor primária de botões
        const buttons = doc.querySelectorAll('button, .btn, [class*="button"], [class*="cta"]');
        if (buttons.length > 0) {
            const btnStyle = window.getComputedStyle(buttons[0]);
            const bgColor = btnStyle.backgroundColor;
            if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
                this.currentColors.primary = this.rgbToHex(bgColor);
            }
        }
        
        // Detecta cor de links
        const links = doc.querySelectorAll('a:not(.btn):not(.button)');
        if (links.length > 0) {
            const linkStyle = window.getComputedStyle(links[0]);
            const linkColor = linkStyle.color;
            if (linkColor && linkColor !== 'rgba(0, 0, 0, 0)') {
                this.currentColors.secondary = this.rgbToHex(linkColor);
            }
        }
        
        // Detecta cor de texto
        const paragraphs = doc.querySelectorAll('p, body');
        if (paragraphs.length > 0) {
            const textStyle = window.getComputedStyle(paragraphs[0]);
            const textColor = textStyle.color;
            if (textColor) {
                this.currentColors.text = this.rgbToHex(textColor);
            }
        }
        
        console.log('🎨 Cores detectadas:', this.currentColors);
    },
    
    // Cria painel de cores
    createColorPanel() {
        const panel = document.getElementById('colorPanel');
        if (!panel) return;
        
        panel.innerHTML = `
            <div class="property-group">
                <div class="property-group-title">🎨 Cores do Template</div>
                
                ${this.createColorInput('primary', 'Cor Primária', this.currentColors.primary)}
                ${this.createColorInput('secondary', 'Cor Secundária', this.currentColors.secondary)}
                ${this.createColorInput('accent', 'Cor de Destaque', this.currentColors.accent)}
                ${this.createColorInput('text', 'Cor do Texto', this.currentColors.text)}
                ${this.createColorInput('background', 'Fundo Principal', this.currentColors.background)}
                ${this.createColorInput('backgroundAlt', 'Fundo Alternativo', this.currentColors.backgroundAlt)}
                
                <p style="font-size: 0.75rem; color: #6b7280; margin-top: 1rem; text-align: center;">
                    ✨ As cores são aplicadas em tempo real!
                </p>
                
                <button class="btn-secondary" style="width: 100%; margin-top: 0.5rem;" onclick="TemplateColorManager.resetColors()">
                    <span>↺</span>
                    Resetar Cores
                </button>
            </div>
        `;
    },
    
    // Cria input de cor
    createColorInput(key, label, value) {
        return `
            <div class="property-item">
                <label class="property-label">${label}</label>
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                    <input 
                        type="color" 
                        class="property-color" 
                        id="color-${key}"
                        value="${value}"
                        oninput="TemplateColorManager.updateColorRealTime('${key}', this.value)"
                    >
                    <input 
                        type="text" 
                        class="property-input" 
                        value="${value}"
                        id="color-text-${key}"
                        style="flex: 1; font-family: monospace; font-size: 0.8125rem;"
                        oninput="TemplateColorManager.updateColorFromTextRealTime('${key}', this.value)"
                    >
                </div>
            </div>
        `;
    },
    
    // Atualiza cor
    updateColor(key, value) {
        this.currentColors[key] = value;
        const textInput = document.getElementById(`color-text-${key}`);
        if (textInput) {
            textInput.value = value;
        }
    },
    
    // Atualiza cor do input de texto
    updateColorFromText(key, value) {
        if (value.match(/^#[0-9A-F]{6}$/i)) {
            this.currentColors[key] = value;
            const colorInput = document.getElementById(`color-${key}`);
            if (colorInput) {
                colorInput.value = value;
            }
        }
    },
    
    // ===== NOVO: TEMPO REAL =====
    
    // Atualiza cor em tempo real (color picker)
    updateColorRealTime(key, value) {
        this.currentColors[key] = value;
        const textInput = document.getElementById(`color-text-${key}`);
        if (textInput) {
            textInput.value = value;
        }
        // Aplica IMEDIATAMENTE
        this.applyColorInstantly(key, value);
    },
    
    // Atualiza cor em tempo real (text input)
    updateColorFromTextRealTime(key, value) {
        if (value.match(/^#[0-9A-F]{6}$/i)) {
            this.currentColors[key] = value;
            const colorInput = document.getElementById(`color-${key}`);
            if (colorInput) {
                colorInput.value = value;
            }
            // Aplica IMEDIATAMENTE
            this.applyColorInstantly(key, value);
        }
    },
    
    // Aplica UMA cor específica instantaneamente
    applyColorInstantly(key, color) {
        const iframe = document.getElementById('previewFrame');
        if (!iframe || !iframe.contentDocument) return;
        
        const doc = iframe.contentDocument;
        
        // Salva estado antes (com debounce)
        clearTimeout(this.saveTimeout);
        if (!this.hasSavedInitialState) {
            HistoryManager.saveState(true);
            this.hasSavedInitialState = true;
        }
        
        switch(key) {
            case 'primary':
                // Botões
                doc.querySelectorAll('button, .btn, [class*="button"], [class*="cta"]').forEach(el => {
                    el.style.setProperty('background-color', color, 'important');
                    el.style.setProperty('background', color, 'important');
                    el.style.setProperty('border-color', color, 'important');
                });
                // Links
                doc.querySelectorAll('a:not(.btn):not(.button)').forEach(el => {
                    el.style.setProperty('color', color, 'important');
                });
                // Bordas coloridas
                doc.querySelectorAll('[style*="border"]').forEach(el => {
                    const borderColor = window.getComputedStyle(el).borderColor;
                    if (borderColor && borderColor !== 'rgba(0, 0, 0, 0)' && borderColor !== 'rgb(0, 0, 0)') {
                        el.style.setProperty('border-color', color, 'important');
                    }
                });
                break;
                
            case 'secondary':
                // Gradientes
                doc.querySelectorAll('*').forEach(el => {
                    const bgImage = window.getComputedStyle(el).backgroundImage;
                    if (bgImage && bgImage.includes('gradient')) {
                        el.style.setProperty('background-image', `linear-gradient(135deg, ${this.currentColors.primary}, ${color})`, 'important');
                    }
                });
                break;
                
            case 'accent':
                // Ícones e destaques
                doc.querySelectorAll('.icon, [class*="icon"], svg').forEach(el => {
                    if (!el.closest('button')) {
                        el.style.setProperty('color', color, 'important');
                        el.style.setProperty('fill', color, 'important');
                    }
                });
                break;
                
            case 'text':
                // Headings
                doc.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(el => {
                    el.style.setProperty('color', color, 'important');
                });
                // Parágrafos
                doc.querySelectorAll('p, li, span').forEach(el => {
                    if (!el.closest('button') && !el.closest('.btn')) {
                        el.style.setProperty('color', color, 'important');
                    }
                });
                break;
                
            case 'background':
                // Seções pares
                doc.querySelectorAll('section, .section, [class*="bg-"]').forEach((el, i) => {
                    if (i % 2 === 0) {
                        const currentBg = window.getComputedStyle(el).backgroundColor;
                        if (currentBg && currentBg !== 'rgba(0, 0, 0, 0)' && currentBg !== 'transparent') {
                            el.style.setProperty('background-color', color, 'important');
                        }
                    }
                });
                break;
                
            case 'backgroundAlt':
                // Seções ímpares
                doc.querySelectorAll('section, .section, [class*="bg-"]').forEach((el, i) => {
                    if (i % 2 === 1) {
                        const currentBg = window.getComputedStyle(el).backgroundColor;
                        if (currentBg && currentBg !== 'rgba(0, 0, 0, 0)' && currentBg !== 'transparent') {
                            el.style.setProperty('background-color', color, 'important');
                        }
                    }
                });
                break;
        }
        
        // Salva estado depois (com debounce de 1 segundo)
        this.saveTimeout = setTimeout(() => {
            HistoryManager.saveState(true);
            this.hasSavedInitialState = false;
        }, 1000);
    },
    
    // Aplica cores ao template
    applyColors() {
        const iframe = document.getElementById('previewFrame');
        if (!iframe || !iframe.contentDocument) return;
        
        const doc = iframe.contentDocument;
        
        // Salva estado antes
        HistoryManager.saveState(true);
        
        const primary = this.currentColors.primary;
        const secondary = this.currentColors.secondary;
        const accent = this.currentColors.accent;
        const text = this.currentColors.text;
        const bg = this.currentColors.background;
        const bgAlt = this.currentColors.backgroundAlt;
        
        // 1. BOTÕES - Aplica cor primária
        const buttons = doc.querySelectorAll('button, .btn, [class*="button"], [class*="cta"], input[type="submit"]');
        buttons.forEach(btn => {
            btn.style.setProperty('background-color', primary, 'important');
            btn.style.setProperty('background', primary, 'important');
            btn.style.setProperty('border-color', primary, 'important');
        });
        
        // 2. LINKS - Aplica cor primária
        const links = doc.querySelectorAll('a:not(.btn):not(.button)');
        links.forEach(link => {
            link.style.setProperty('color', primary, 'important');
        });
        
        // 3. HEADINGS - Aplica cor de texto
        const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(heading => {
            heading.style.setProperty('color', text, 'important');
        });
        
        // 4. PARÁGRAFOS - Aplica cor de texto
        const paragraphs = doc.querySelectorAll('p, li, span');
        paragraphs.forEach(p => {
            if (!p.closest('button') && !p.closest('.btn')) {
                p.style.setProperty('color', text, 'important');
            }
        });
        
        // 5. BACKGROUNDS - Aplica cores de fundo
        const sections = doc.querySelectorAll('section, .section, [class*="bg-"]');
        sections.forEach((section, index) => {
            const currentBg = window.getComputedStyle(section).backgroundColor;
            if (currentBg && currentBg !== 'rgba(0, 0, 0, 0)' && currentBg !== 'transparent') {
                // Alterna entre bg principal e alternativo
                if (index % 2 === 0) {
                    section.style.setProperty('background-color', bg, 'important');
                } else {
                    section.style.setProperty('background-color', bgAlt, 'important');
                }
            }
        });
        
        // 6. GRADIENTES - Atualiza gradientes existentes
        const allElements = doc.querySelectorAll('*');
        allElements.forEach(el => {
            const bgImage = window.getComputedStyle(el).backgroundImage;
            if (bgImage && bgImage.includes('gradient')) {
                el.style.setProperty('background-image', `linear-gradient(135deg, ${primary}, ${secondary})`, 'important');
            }
        });
        
        // 7. ÍCONES E DESTAQUES - Aplica cor de destaque
        const icons = doc.querySelectorAll('.icon, [class*="icon"], svg');
        icons.forEach(icon => {
            if (!icon.closest('button')) {
                icon.style.setProperty('color', accent, 'important');
                icon.style.setProperty('fill', accent, 'important');
            }
        });
        
        // 8. BORDAS - Atualiza bordas coloridas
        const bordered = doc.querySelectorAll('[style*="border"]');
        bordered.forEach(el => {
            const borderColor = window.getComputedStyle(el).borderColor;
            if (borderColor && borderColor !== 'rgba(0, 0, 0, 0)' && borderColor !== 'rgb(0, 0, 0)') {
                el.style.setProperty('border-color', primary, 'important');
            }
        });
        
        // Salva estado depois
        setTimeout(() => {
            HistoryManager.saveState(true);
        }, 100);
        
        showFeedback('🎨 Cores aplicadas com sucesso!', 'success');
        console.log('🎨 Cores aplicadas:', this.currentColors);
    },
    
    // Reseta cores padrão
    resetColors() {
        this.currentColors = {
            primary: '#667eea',
            secondary: '#764ba2',
            accent: '#10b981',
            text: '#111827',
            background: '#ffffff',
            backgroundAlt: '#f9fafb'
        };
        
        this.createColorPanel();
        showFeedback('↺ Cores resetadas', 'success');
    },
    
    // Converte RGB para HEX
    rgbToHex(rgb) {
        const result = rgb.match(/\d+/g);
        if (!result || result.length < 3) return '#667eea';
        
        const r = parseInt(result[0]);
        const g = parseInt(result[1]);
        const b = parseInt(result[2]);
        
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }
};

// VIP Templates Configuration - MAPEAMENTO CORRETO COM NOVA ESTRUTURA
const VIP_TEMPLATES = {
    luxuryHotel: { name: 'Luxury Hotel Premium', folder: 'luxury-hotel' },
    techStartup: { name: 'Tech Startup Pro', folder: 'tech-startup' },
    fashionBrand: { name: 'Fashion Elite', folder: 'fashion-elite' },
    medicalClinic: { name: 'Medical Pro', folder: 'medical-pro' },
    financeApp: { name: 'Finance Premium', folder: 'finance-premium' },
    realEstate: { name: 'Real Estate Luxo', folder: 'real-estate-luxury' },
    // Novos templates de profissões
    barbeiro: { name: 'Barbearia Premium', folder: 'barbeiro' },
    eletricista: { name: 'Eletricista Pro', folder: 'eletricista' },
    manicure: { name: 'Nail Studio', folder: 'manicure' },
    personal: { name: 'Fit Pro Personal', folder: 'personal' },
    fotografo: { name: 'Photo Studio', folder: 'fotografo' },
    marmitas: { name: 'Fit Meals', folder: 'marmitas' }
};

// Initialize Editor
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c👑 Editor VIP Premium Iniciado', 'font-size: 16px; font-weight: bold; color: #667eea;');
    
    // Inicializa History Manager
    HistoryManager.init();
    
    // Inicializa Drag & Drop Manager
    DragDropManager.init();
    
    // Inicializa Element Drag & Drop Manager
    ElementDragDropManager.init();
    
    // Inicializa Template Color Manager
    TemplateColorManager.init();
    
    initializeEditor();
});

async function initializeEditor() {
    try {
        // Get selected template from localStorage
        const selectedTemplate = localStorage.getItem('selectedTemplate');
        
        if (!selectedTemplate) {
            showError('Nenhum template selecionado. Redirecionando...');
            setTimeout(() => window.location.href = 'index.html', 2000);
            return;
        }

        // Check if template exists in VIP templates
        const templateConfig = VIP_TEMPLATES[selectedTemplate];
        
        if (!templateConfig) {
            showError('Template VIP não encontrado: ' + selectedTemplate);
            console.error('Templates disponíveis:', Object.keys(VIP_TEMPLATES));
            setTimeout(() => window.location.href = 'index.html', 3000);
            return;
        }

        EditorState.currentTemplate = selectedTemplate;
        
        // Update header
        document.getElementById('templateNameDisplay').textContent = templateConfig.name;
        
        // Load template via iframe.src (SEM FETCH!)
        loadTemplate(templateConfig);
        
        // Initialize editor features
        setupKeyboardShortcuts();
        
        // Hide loading
        setTimeout(() => {
            document.getElementById('loadingOverlay').classList.add('hidden');
        }, 1000);
        
    } catch (error) {
        console.error('Error initializing editor:', error);
        showError('Erro ao carregar o editor: ' + error.message);
    }
}

// Load VIP Template - USANDO IFRAME.SRC (SEM FETCH!)
function loadTemplate(config) {
    try {
        const iframe = document.getElementById('previewFrame');
        
        // Caminho correto: /templates/vip/{folder}/index.html
        const templatePath = `templates/vip/${config.folder}/index.html`;
        
        console.log('🔥 Carregando template via iframe.src:', templatePath);
        
        // MÉTODO CORRETO: Usar iframe.src diretamente
        iframe.src = templatePath;
        
        // Aguardar carregamento do iframe
        iframe.onload = function() {
            console.log('✅ Template carregado com sucesso:', config.name);
            
            // Tentar tornar editável após carregar
            setTimeout(() => {
                try {
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                    if (iframeDoc) {
                        makeTemplateEditable(iframeDoc);
                        generateLayersTree(iframeDoc);
                        HistoryManager.initializeWithCurrentState();
                        DragDropManager.enableDragOnSections(iframeDoc);
                        ElementDragDropManager.enableDropZones(iframeDoc);
                        TemplateColorManager.detectTemplateColors();
                        TemplateColorManager.createColorPanel();
                    }
                } catch (e) {
                    console.warn('Não foi possível tornar o template editável:', e);
                }
            }, 500);
        };
        
        iframe.onerror = function() {
            console.error('❌ Erro ao carregar template:', templatePath);
            showError('Erro ao carregar o template. Verifique se o arquivo existe.');
        };
        
    } catch (error) {
        console.error('Error loading template:', error);
        showError('Erro ao carregar template: ' + error.message);
    }
}

// Make template editable
function makeTemplateEditable(doc) {
    // Add contenteditable to text elements
    const editableSelectors = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'button', 'li'];
    
    editableSelectors.forEach(selector => {
        const elements = doc.querySelectorAll(selector);
        elements.forEach(el => {
            // Skip if inside script or style
            if (el.closest('script, style, head')) return;
            
            el.setAttribute('contenteditable', 'true');
            el.style.cursor = 'text';
            
            // Add click handler
            el.addEventListener('click', function(e) {
                e.stopPropagation();
                selectElement(this);
            });
            
            // Add hover effect
            el.addEventListener('mouseenter', function() {
                if (this !== EditorState.selectedElement) {
                    this.style.outline = '2px dashed #667eea';
                    this.style.outlineOffset = '2px';
                }
            });
            
            el.addEventListener('mouseleave', function() {
                if (this !== EditorState.selectedElement) {
                    this.style.outline = '';
                    this.style.outlineOffset = '';
                }
            });
            
            // ✨ LISTENER PARA SALVAR HISTÓRICO AUTOMATICAMENTE
            el.addEventListener('input', function() {
                // Salva estado após edição (com debounce)
                HistoryManager.saveState();
            });
            
            // Salva ao perder foco (força commit imediato)
            el.addEventListener('blur', function() {
                HistoryManager.saveState(true); // Force immediate
            });
        });
    });
}

// Select Element
function selectElement(element) {
    // Deselect previous
    if (EditorState.selectedElement) {
        EditorState.selectedElement.style.outline = '';
        EditorState.selectedElement.style.outlineOffset = '';
    }
    
    // Select new
    EditorState.selectedElement = element;
    element.style.outline = '3px solid #667eea';
    element.style.outlineOffset = '2px';
    
    // Show properties panel
    showElementProperties(element);
}

// Show Element Properties
function showElementProperties(element) {
    const propertiesContent = document.getElementById('propertiesContent');
    const tagName = element.tagName.toLowerCase();
    
    // Get computed styles
    const styles = window.getComputedStyle(element);
    
    let html = `
        <div class="property-group">
            <div class="property-group-title">Elemento Selecionado</div>
            <div style="padding: 0.75rem; background: rgba(102,126,234,0.1); border-radius: 8px; margin-bottom: 1.5rem;">
                <strong style="color: #667eea;">${tagName.toUpperCase()}</strong>
            </div>
            
            ${element.textContent && !element.querySelector('img, video') ? `
            <div class="property-item">
                <label class="property-label">📝 Texto</label>
                <textarea class="property-textarea" rows="3" onchange="updateElementText(this.value)">${element.textContent.trim()}</textarea>
            </div>
            ` : ''}
            
            <div class="property-item">
                <label class="property-label">🎨 Cor do Texto</label>
                <input type="color" class="property-input property-color" value="${rgbToHex(styles.color)}" onchange="updateElementStyle('color', this.value)">
            </div>
            
            <div class="property-item">
                <label class="property-label">🖌️ Cor de Fundo</label>
                <input type="color" class="property-input property-color" value="${rgbToHex(styles.backgroundColor)}" onchange="updateElementStyle('backgroundColor', this.value)">
            </div>
        </div>
    `;
    
    propertiesContent.innerHTML = html;
}

// Update Element Functions
function updateElementText(value) {
    if (EditorState.selectedElement) {
        EditorState.selectedElement.textContent = value;
        EditorState.isDirty = true;
        HistoryManager.saveState();
    }
}

function updateElementStyle(property, value) {
    if (EditorState.selectedElement) {
        EditorState.selectedElement.style[property] = value;
        EditorState.isDirty = true;
        HistoryManager.saveState();
    }
}

// Mapa de ícones por tipo de elemento
const ELEMENT_ICONS = {
    // Seções
    'header': '🏠',
    'nav': '🧭',
    'section': '📄',
    'main': '📱',
    'article': '📰',
    'aside': '📌',
    'footer': '⬇️',
    
    // Textos
    'h1': '📝',
    'h2': '📝',
    'h3': '📝',
    'h4': '📝',
    'h5': '📝',
    'h6': '📝',
    'p': '📄',
    'span': '✏️',
    
    // Mídia
    'img': '🖼️',
    'video': '▶️',
    'picture': '🖼️',
    'svg': '🎨',
    
    // Interação
    'button': '🔘',
    'a': '🔗',
    'input': '✍️',
    'textarea': '📝',
    'form': '📋',
    
    // Containers
    'div': '📦',
    'container': '📦',
    'wrapper': '📦',
    
    // Default
    'default': '•'
};

// Detecta nome amigável do elemento
function getFriendlyName(element) {
    const tag = element.tagName.toLowerCase();
    
    // 1. Verifica atributo data-layer-name (prioridade máxima)
    if (element.dataset.layerName) {
        return element.dataset.layerName;
    }
    
    // 2. Verifica ID semântico
    if (element.id) {
        const id = element.id.toLowerCase();
        if (id.includes('hero')) return 'Hero Section';
        if (id.includes('about')) return 'Sobre';
        if (id.includes('feature')) return 'Features';
        if (id.includes('service')) return 'Serviços';
        if (id.includes('testimonial')) return 'Depoimentos';
        if (id.includes('pricing')) return 'Preços';
        if (id.includes('contact')) return 'Contato';
        if (id.includes('cta')) return 'Call to Action';
        if (id.includes('gallery')) return 'Galeria';
        if (id.includes('team')) return 'Equipe';
        if (id.includes('faq')) return 'FAQ';
        if (id.includes('footer')) return 'Rodapé';
        if (id.includes('header')) return 'Cabeçalho';
        if (id.includes('nav')) return 'Menu';
    }
    
    // 3. Verifica classes semânticas
    if (element.className) {
        const className = element.className.toLowerCase();
        if (className.includes('hero')) return 'Hero Section';
        if (className.includes('about')) return 'Sobre';
        if (className.includes('feature')) return 'Features';
        if (className.includes('service')) return 'Serviços';
        if (className.includes('testimonial')) return 'Depoimentos';
        if (className.includes('pricing')) return 'Preços';
        if (className.includes('contact')) return 'Contato';
        if (className.includes('cta')) return 'CTA';
        if (className.includes('gallery')) return 'Galeria';
        if (className.includes('team')) return 'Equipe';
        if (className.includes('faq')) return 'FAQ';
        if (className.includes('card')) return 'Card';
        if (className.includes('button') || className.includes('btn')) return 'Botão';
    }
    
    // 4. Detecta por tag HTML semântica
    if (tag === 'header') return 'Cabeçalho';
    if (tag === 'nav') return 'Menu';
    if (tag === 'footer') return 'Rodapé';
    if (tag === 'aside') return 'Barra Lateral';
    if (tag === 'main') return 'Conteúdo Principal';
    if (tag === 'article') return 'Artigo';
    
    // 5. Detecta título
    if (tag.match(/^h[1-6]$/)) {
        const text = element.textContent.trim().substring(0, 30);
        return text ? `Título: ${text}...` : 'Título';
    }
    
    // 6. Detecta parágrafo
    if (tag === 'p') {
        const text = element.textContent.trim().substring(0, 25);
        return text ? `Texto: ${text}...` : 'Parágrafo';
    }
    
    // 7. Detecta botão
    if (tag === 'button' || tag === 'a' && element.className.includes('btn')) {
        const text = element.textContent.trim();
        return text ? `Botão: ${text}` : 'Botão';
    }
    
    // 8. Detecta link
    if (tag === 'a') {
        const text = element.textContent.trim();
        return text ? `Link: ${text}` : 'Link';
    }
    
    // 9. Detecta imagem
    if (tag === 'img') {
        const alt = element.alt || element.title || 'Sem descrição';
        return `Imagem: ${alt}`;
    }
    
    // 10. Detecta vídeo
    if (tag === 'video') return 'Vídeo';
    
    // 11. Detecta formulário
    if (tag === 'form') return 'Formulário';
    if (tag === 'input') {
        const type = element.type || 'text';
        const placeholder = element.placeholder || '';
        return placeholder ? `Campo: ${placeholder}` : `Campo ${type}`;
    }
    if (tag === 'textarea') return 'Campo de Texto';
    
    // 12. Seção genérica
    if (tag === 'section') {
        return 'Seção';
    }
    
    // 13. Container genérico
    if (tag === 'div') {
        return 'Container';
    }
    
    // Default
    return tag.toUpperCase();
}

// Verifica se elemento deve ser exibido
function shouldShowElement(element) {
    const tag = element.tagName.toLowerCase();
    
    // NUNCA mostrar
    const ignoreTags = ['script', 'style', 'link', 'meta', 'noscript', 'br', 'hr'];
    if (ignoreTags.includes(tag)) return false;
    
    // Ignorar divs muito pequenas (wrappers técnicos)
    if (tag === 'div') {
        const rect = element.getBoundingClientRect();
        if (rect.width < 10 || rect.height < 10) return false;
    }
    
    // Ignorar elementos ocultos
    const styles = window.getComputedStyle(element);
    if (styles.display === 'none' || styles.visibility === 'hidden') return false;
    
    // Ignorar marca d'água do Vozzy
    if (element.id === 'vozzy-watermark') return false;
    
    return true;
}

// Verifica se é uma seção importante
function isImportantSection(element) {
    const tag = element.tagName.toLowerCase();
    const semanticTags = ['header', 'nav', 'main', 'section', 'article', 'aside', 'footer'];
    
    if (semanticTags.includes(tag)) return true;
    
    // Verifica se div tem classes/ids semânticas
    if (tag === 'div' && (element.id || element.className)) {
        const id = (element.id || '').toLowerCase();
        const className = (element.className || '').toLowerCase();
        const combined = id + ' ' + className;
        
        const keywords = ['hero', 'about', 'feature', 'service', 'testimonial', 
                         'pricing', 'contact', 'cta', 'gallery', 'team', 'faq', 'section'];
        
        return keywords.some(keyword => combined.includes(keyword));
    }
    
    return false;
}

// Gera ícone baseado no elemento
function getElementIcon(element) {
    const tag = element.tagName.toLowerCase();
    const className = (element.className || '').toLowerCase();
    const id = (element.id || '').toLowerCase();
    
    // Prioridade: ícone específico por classe/id
    if (className.includes('hero') || id.includes('hero')) return '🦸';
    if (className.includes('pricing') || id.includes('pricing')) return '💰';
    if (className.includes('testimonial') || id.includes('testimonial')) return '💬';
    if (className.includes('contact') || id.includes('contact')) return '📧';
    if (className.includes('cta')) return '🎯';
    if (className.includes('gallery')) return '🖼️';
    if (className.includes('team')) return '👥';
    if (className.includes('faq')) return '❓';
    
    // Ícone por tag
    return ELEMENT_ICONS[tag] || ELEMENT_ICONS['default'];
}

// Generate Layers Tree - VERSÃO SIMPLIFICADA
function generateLayersTree(doc) {
    const layersTree = document.getElementById('layersTree');
    
    if (!doc || !doc.body) {
        layersTree.innerHTML = '<p style="padding: 1rem; text-align: center; color: var(--text-muted);">Aguardando template...</p>';
        return;
    }
    
    let html = '';
    let layerIdCounter = 0;
    
    // Estrutura: Página > Seções > Elementos
    html += '<div class="layer-group" data-level="0">';
    html += `
        <div class="layer-header" onclick="toggleLayerGroup(this)">
            <span class="layer-toggle">▼</span>
            <span class="layer-icon">📄</span>
            <span class="layer-title">Página Completa</span>
        </div>
        <div class="layer-children expanded">
    `;
    
    // Processar apenas seções importantes (nível 1)
    const sections = Array.from(doc.body.children).filter(shouldShowElement);
    
    sections.forEach(section => {
        if (!shouldShowElement(section)) return;
        
        const isSection = isImportantSection(section);
        const friendlyName = getFriendlyName(section);
        const icon = getElementIcon(section);
        const layerId = `layer-${layerIdCounter++}`;
        
        // Contar elementos filhos válidos
        const validChildren = Array.from(section.querySelectorAll('*')).filter(child => {
            const tag = child.tagName.toLowerCase();
            return shouldShowElement(child) && 
                   (tag.match(/^h[1-6]$/) || ['p', 'button', 'a', 'img', 'video', 'input', 'textarea'].includes(tag));
        });
        
        const hasChildren = validChildren.length > 0;
        
        html += '<div class="layer-group" data-level="1">';
        html += `
            <div class="layer-item ${isSection ? 'section-layer' : ''}" 
                 data-layer-id="${layerId}"
                 onclick="selectLayerElement(event, this)"
                 onmouseenter="highlightElement(event, this)"
                 onmouseleave="unhighlightElement()">
                ${hasChildren ? `<span class="layer-toggle" onclick="event.stopPropagation(); toggleLayerGroup(this.parentElement)">▶</span>` : '<span class="layer-spacer"></span>'}
                <span class="layer-icon">${icon}</span>
                <span class="layer-title">${friendlyName}</span>
            </div>
        `;
        
        // Adicionar filhos (nível 2) - apenas elementos importantes
        if (hasChildren) {
            html += '<div class="layer-children">';
            
            validChildren.slice(0, 20).forEach(child => { // Limitar a 20 para performance
                const childName = getFriendlyName(child);
                const childIcon = getElementIcon(child);
                const childId = `layer-${layerIdCounter++}`;
                
                html += `
                    <div class="layer-item child-layer" 
                         data-layer-id="${childId}"
                         onclick="selectLayerElement(event, this)"
                         onmouseenter="highlightElement(event, this)"
                         onmouseleave="unhighlightElement()">
                        <span class="layer-spacer"></span>
                        <span class="layer-icon">${childIcon}</span>
                        <span class="layer-title">${childName}</span>
                    </div>
                `;
                
                // Armazenar referência ao elemento real
                setTimeout(() => {
                    const layerEl = document.querySelector(`[data-layer-id="${childId}"]`);
                    if (layerEl) layerEl._realElement = child;
                }, 0);
            });
            
            html += '</div>';
        }
        
        html += '</div>';
        
        // Armazenar referência ao elemento real
        setTimeout(() => {
            const layerEl = document.querySelector(`[data-layer-id="${layerId}"]`);
            if (layerEl) layerEl._realElement = section;
        }, 0);
    });
    
    html += '</div></div>';
    
    layersTree.innerHTML = html || '<p style="padding: 1rem; text-align: center; color: var(--text-muted);">Nenhuma camada disponível</p>';
}

// Toggle grupo de camadas
function toggleLayerGroup(element) {
    const parent = element.closest('.layer-group');
    if (!parent) return;
    
    const children = parent.querySelector('.layer-children');
    const toggle = element.querySelector('.layer-toggle');
    
    if (children) {
        children.classList.toggle('expanded');
        if (toggle) {
            toggle.textContent = children.classList.contains('expanded') ? '▼' : '▶';
        }
    }
}

// Seleciona elemento da camada
function selectLayerElement(event, layerItem) {
    event.stopPropagation();
    
    // Remove seleção anterior
    document.querySelectorAll('.layer-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Adiciona nova seleção
    layerItem.classList.add('selected');
    
    // Pega elemento real
    const realElement = layerItem._realElement;
    if (realElement) {
        // Foca no elemento (futura implementação de edição)
        EditorState.selectedElement = realElement;
        console.log('✅ Elemento selecionado:', realElement);
        
        // Scroll até o elemento no iframe
        realElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Highlight temporário
        const originalOutline = realElement.style.outline;
        realElement.style.outline = '3px solid #667eea';
        realElement.style.outlineOffset = '2px';
        
        setTimeout(() => {
            realElement.style.outline = originalOutline;
        }, 2000);
    }
}

// Highlight elemento no hover
function highlightElement(event, layerItem) {
    event.stopPropagation();
    
    const realElement = layerItem._realElement;
    if (realElement) {
        realElement.style.outline = '2px dashed #667eea';
        realElement.style.outlineOffset = '2px';
    }
}

// Remove highlight
function unhighlightElement() {
    const iframe = document.getElementById('previewFrame');
    if (!iframe || !iframe.contentDocument) return;
    
    // Remove todos os outlines temporários
    const allElements = iframe.contentDocument.querySelectorAll('*');
    allElements.forEach(el => {
        if (el.style.outline && el.style.outline.includes('dashed')) {
            el.style.outline = '';
        }
    });
}

// Device Switching
function changeDevice(device) {
    EditorState.device = device;
    
    // Update buttons
    document.querySelectorAll('.device-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.device === device) {
            btn.classList.add('active');
        }
    });
    
    // Update canvas
    const wrapper = document.getElementById('canvasWrapper');
    wrapper.className = 'canvas-wrapper';
    
    if (device === 'tablet') {
        wrapper.classList.add('device-tablet');
    } else if (device === 'mobile') {
        wrapper.classList.add('device-mobile');
    }
}

// Tab Switching
function switchTab(tabName) {
    document.querySelectorAll('.sidebar-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        }
    });
    
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    document.getElementById(tabName + '-panel').classList.add('active');
}

// Save Template
function saveTemplate() {
    const iframe = document.getElementById('previewFrame');
    const doc = iframe.contentDocument;
    
    if (doc) {
        const html = doc.documentElement.outerHTML;
        localStorage.setItem('vip_template_' + EditorState.currentTemplate, html);
        EditorState.isDirty = false;
        
        showSuccess('✅ Template salvo com sucesso!');
    }
}

// Export Template
function exportTemplate() {
    const iframe = document.getElementById('previewFrame');
    const doc = iframe.contentDocument;
    
    if (doc) {
        const html = doc.documentElement.outerHTML;
        
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${EditorState.currentTemplate}-edited.html`;
        a.click();
        URL.revokeObjectURL(url);
        
        showSuccess('✅ Template exportado com sucesso!');
    }
}

// Preview Template
function previewTemplate() {
    const iframe = document.getElementById('previewFrame');
    const win = window.open(iframe.src, '_blank');
}

// Refresh Layers
function refreshLayers() {
    const iframe = document.getElementById('previewFrame');
    const doc = iframe.contentDocument;
    if (doc) generateLayersTree(doc);
}

// Close Properties
function closeProperties() {
    document.getElementById('propertiesContent').innerHTML = `
        <div class="no-selection">
            <p>Selecione um elemento para editar</p>
        </div>
    `;
    
    if (EditorState.selectedElement) {
        EditorState.selectedElement.style.outline = '';
        EditorState.selectedElement = null;
    }
}

// Keyboard Shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveTemplate();
        }
    });
}

// Utility Functions
function rgbToHex(rgb) {
    if (!rgb || rgb === 'transparent' || rgb === 'rgba(0, 0, 0, 0)') return '#ffffff';
    
    const values = rgb.match(/\d+/g);
    if (!values) return '#ffffff';
    
    const hex = values.slice(0, 3).map(x => {
        const val = parseInt(x).toString(16);
        return val.length === 1 ? '0' + val : val;
    }).join('');
    
    return '#' + hex;
}

function showSuccess(message) {
    alert(message);
}

function showError(message) {
    alert('❌ ' + message);
}

// Global feedback function for ElementDragDrop and TemplateColor
function showFeedback(message, type = 'info') {
    // Remove feedback anterior se existir
    const existing = document.querySelector('.global-feedback');
    if (existing) existing.remove();
    
    // Cria novo feedback
    const feedback = document.createElement('div');
    feedback.className = 'global-feedback';
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#667eea'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-size: 0.875rem;
        font-weight: 500;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(feedback);
    
    // Remove após 3 segundos
    setTimeout(() => {
        feedback.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => feedback.remove(), 300);
    }, 3000);
}

/* ============================================
   ✏️ SISTEMA DE EDIÇÃO FÁCIL - DUPLO CLIQUE
   ============================================ */

// Torna elemento facilmente editável
function makeElementEditable(wrapper, doc) {
    const elementType = wrapper.dataset.elementType;
    
    // Encontra o elemento real dentro do wrapper
    let editableElement = wrapper.querySelector('h1, h2, h3, h4, h5, h6, p, button, span, a');
    
    if (!editableElement) {
        editableElement = wrapper.firstElementChild;
    }
    
    // IMAGENS - Duplo clique abre modal
    const images = wrapper.querySelectorAll('img');
    images.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('dblclick', function(e) {
            e.stopPropagation();
            openImageModal(this);
        });
        
        // Tooltip
        img.title = '🖼️ Duplo clique para configurar';
    });
    
    // VÍDEOS - Duplo clique abre modal
    const videoContainers = wrapper.querySelectorAll('div[style*="padding-bottom: 56.25%"], div[style*="position: relative"]');
    videoContainers.forEach(container => {
        if (container.querySelector('iframe') || container.querySelector('video')) {
            container.style.cursor = 'pointer';
            container.addEventListener('dblclick', function(e) {
                e.stopPropagation();
                openVideoModal(this);
            });
            
            // Tooltip
            container.title = '🎥 Duplo clique para configurar';
        }
    });
    
    // TEXTO - Duplo clique ativa edição inline
    if (editableElement && (elementType === 'heading' || elementType === 'paragraph' || elementType === 'button')) {
        editableElement.style.cursor = 'text';
        editableElement.title = '✏️ Duplo clique para editar';
        
        editableElement.addEventListener('dblclick', function(e) {
            e.stopPropagation();
            
            // Salva estado antes
            HistoryManager.saveState(true);
            
            // Ativa contentEditable
            this.contentEditable = true;
            this.focus();
            
            // Seleciona todo o texto
            const range = doc.createRange();
            range.selectNodeContents(this);
            const sel = doc.defaultView.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            
            // Visual feedback
            this.style.outline = '2px solid #667eea';
            this.style.outlineOffset = '4px';
            
            // Desativa ao perder foco
            const finishEditing = () => {
                this.contentEditable = false;
                this.style.outline = '';
                
                // Salva estado depois
                setTimeout(() => {
                    HistoryManager.saveState(true);
                }, 100);
                
                showFeedback('✅ Texto atualizado!', 'success');
            };
            
            this.addEventListener('blur', finishEditing, { once: true });
            
            // Ou pressionar Enter (exceto em botões)
            if (this.tagName !== 'BUTTON') {
                this.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        this.blur();
                    }
                });
            }
        });
    }
    
    // ÍCONES - Duplo clique para abrir emoji picker
    if (elementType === 'icon') {
        const iconDiv = wrapper.querySelector('div');
        if (iconDiv) {
            iconDiv.style.cursor = 'pointer';
            iconDiv.title = '⭐ Duplo clique para mudar ícone';
            
            iconDiv.addEventListener('dblclick', function(e) {
                e.stopPropagation();
                EmojiPickerManager.open(this);
            });
        }
    }
    
    // CLIQUE SIMPLES - Mostra propriedades
    wrapper.addEventListener('click', function(e) {
        e.stopPropagation();
        PropertyManager.show(this);
    });
    
    // CONTAINERS E CARDS - Tornam drop zones para receber elementos
    if (elementType === 'container' || elementType === 'card') {
        wrapper.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.style.outline = '3px dashed #667eea';
            this.style.outlineOffset = '4px';
        });
        
        wrapper.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.outline = '';
        });
        
        wrapper.addEventListener('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.style.outline = '';
            
            const elementType = e.dataTransfer.getData('elementType');
            const elementHTML = e.dataTransfer.getData('text/html');
            
            if (!elementType || !elementHTML) return;
            
            HistoryManager.saveState(true);
            
            // Cria novo elemento
            const newWrapper = doc.createElement('div');
            newWrapper.className = 'editor-element-wrapper';
            newWrapper.dataset.elementType = elementType;
            newWrapper.style.cssText = 'position: relative; margin: 10px 0; transition: all 0.2s ease;';
            newWrapper.innerHTML = elementHTML;
            
            // Adiciona dentro do container/card
            this.appendChild(newWrapper);
            
            // Torna editável
            makeElementEditable(newWrapper, doc);
            
            setTimeout(() => {
                HistoryManager.saveState(true);
                generateLayersTree(doc);
            }, 100);
            
            showFeedback('✅ Elemento adicionado ao container!', 'success');
        });
    }
}

/* ============================================
   🖼️ MODAL DE CONFIGURAÇÃO DE IMAGEM
   ============================================ */

let currentImageElement = null;

function openImageModal(imgElement) {
    currentImageElement = imgElement;
    const modal = document.getElementById('imageModal');
    const urlInput = document.getElementById('imageUrlInput');
    const altInput = document.getElementById('imageAltInput');
    const preview = document.getElementById('imagePreview');
    
    // Preenche com valores atuais
    urlInput.value = imgElement.src || '';
    altInput.value = imgElement.alt || '';
    preview.innerHTML = '';
    
    modal.style.display = 'flex';
}

function closeImageModal() {
    document.getElementById('imageModal').style.display = 'none';
    currentImageElement = null;
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById('imagePreview');
        preview.innerHTML = `<img src="${e.target.result}" style="max-width: 100%; max-height: 200px; border-radius: 8px;">`;
        document.getElementById('imageUrlInput').value = e.target.result;
    };
    reader.readAsDataURL(file);
}

function applyImageConfig() {
    if (!currentImageElement) return;
    
    const iframe = document.getElementById('previewFrame');
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    
    // Salva estado antes
    HistoryManager.saveState(true);
    
    const urlInput = document.getElementById('imageUrlInput');
    const altInput = document.getElementById('imageAltInput');
    
    if (urlInput.value) {
        currentImageElement.src = urlInput.value;
    }
    if (altInput.value) {
        currentImageElement.alt = altInput.value;
    }
    
    // Salva estado depois
    setTimeout(() => {
        HistoryManager.saveState(true);
    }, 100);
    
    closeImageModal();
    showFeedback('✅ Imagem atualizada!', 'success');
}

/* ============================================
   🎥 MODAL DE CONFIGURAÇÃO DE VÍDEO
   ============================================ */

let currentVideoElement = null;

function openVideoModal(videoContainer) {
    currentVideoElement = videoContainer;
    const modal = document.getElementById('videoModal');
    const youtubeInput = document.getElementById('youtubeUrlInput');
    
    // Tenta pegar URL do YouTube se existir
    const iframe = videoContainer.querySelector('iframe');
    if (iframe && iframe.src.includes('youtube')) {
        youtubeInput.value = iframe.src;
    }
    
    modal.style.display = 'flex';
}

function closeVideoModal() {
    document.getElementById('videoModal').style.display = 'none';
    currentVideoElement = null;
}

function handleVideoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        // Substitui iframe por video tag
        if (currentVideoElement) {
            const iframe = document.getElementById('previewFrame');
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            
            HistoryManager.saveState(true);
            
            currentVideoElement.innerHTML = `
                <video controls style="width: 100%; height: 100%; border-radius: 8px;">
                    <source src="${e.target.result}" type="${file.type}">
                    Seu navegador não suporta vídeos.
                </video>
            `;
            
            setTimeout(() => {
                HistoryManager.saveState(true);
            }, 100);
            
            closeVideoModal();
            showFeedback('✅ Vídeo carregado!', 'success');
        }
    };
    reader.readAsDataURL(file);
}

function applyVideoConfig() {
    if (!currentVideoElement) return;
    
    const iframe = document.getElementById('previewFrame');
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    
    HistoryManager.saveState(true);
    
    const youtubeInput = document.getElementById('youtubeUrlInput');
    let youtubeUrl = youtubeInput.value;
    
    if (youtubeUrl) {
        // Converte URL do YouTube para embed
        let videoId = '';
        if (youtubeUrl.includes('youtube.com/watch?v=')) {
            videoId = youtubeUrl.split('v=')[1]?.split('&')[0];
        } else if (youtubeUrl.includes('youtu.be/')) {
            videoId = youtubeUrl.split('youtu.be/')[1]?.split('?')[0];
        } else if (youtubeUrl.includes('youtube.com/embed/')) {
            videoId = youtubeUrl.split('embed/')[1]?.split('?')[0];
        }
        
        if (videoId) {
            currentVideoElement.innerHTML = `
                <iframe 
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 8px;" 
                    src="https://www.youtube.com/embed/${videoId}" 
                    frameborder="0" 
                    allowfullscreen
                ></iframe>
            `;
            
            setTimeout(() => {
                HistoryManager.saveState(true);
            }, 100);
            
            closeVideoModal();
            showFeedback('✅ Vídeo do YouTube configurado!', 'success');
        } else {
            showFeedback('❌ URL do YouTube inválida', 'error');
        }
    }
}

/* ============================================
   📐 PROPERTY MANAGER - POSICIONAMENTO UNIVERSAL
   ============================================ */

const PropertyManager = {
    currentElement: null,
    
    show(element) {
        this.currentElement = element;
        const propsContent = document.getElementById('propertiesContent');
        
        if (!element) {
            propsContent.innerHTML = `
                <div class="no-selection">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" opacity="0.3">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                    <p>Selecione um elemento para editar suas propriedades</p>
                </div>
            `;
            return;
        }
        
        const elementType = element.dataset.elementType || 'section';
        const isCard = elementType === 'card';
        const isContainer = elementType === 'container';
        const currentWidth = element.style.width || element.offsetWidth + 'px';
        const currentHeight = element.style.height || 'auto';
        const currentMargin = parseInt(element.style.margin) || 20;
        const currentPadding = parseInt(element.style.padding) || 15;
        
        propsContent.innerHTML = `
            <div class="property-group">
                <div class="property-group-title">📐 POSICIONAMENTO</div>
                <div class="property-item">
                    <label class="property-label">Horizontal</label>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn-secondary" style="flex: 1; padding: 0.5rem;" onclick="PropertyManager.alignHorizontal('left')">⬅️</button>
                        <button class="btn-secondary" style="flex: 1; padding: 0.5rem;" onclick="PropertyManager.alignHorizontal('center')">🎯</button>
                        <button class="btn-secondary" style="flex: 1; padding: 0.5rem;" onclick="PropertyManager.alignHorizontal('right')">➡️</button>
                    </div>
                </div>
                <div class="property-item">
                    <label class="property-label">Vertical</label>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn-secondary" style="flex: 1; padding: 0.5rem;" onclick="PropertyManager.alignVertical('top')">⬆️</button>
                        <button class="btn-secondary" style="flex: 1; padding: 0.5rem;" onclick="PropertyManager.alignVertical('center')">🎯</button>
                        <button class="btn-secondary" style="flex: 1; padding: 0.5rem;" onclick="PropertyManager.alignVertical('bottom')">⬇️</button>
                    </div>
                </div>
            </div>
            ${isCard || isContainer ? `<div class="property-group">
                <div class="property-group-title">📏 DIMENSÕES</div>
                <div class="property-item">
                    <label class="property-label">Largura (px)</label>
                    <input type="number" class="property-input" value="${parseInt(currentWidth)}" onchange="PropertyManager.setWidth(this.value)">
                </div>
                <div class="property-item">
                    <label class="property-label">Altura (px)</label>
                    <input type="number" class="property-input" value="${currentHeight === 'auto' ? '' : parseInt(currentHeight)}" placeholder="auto" onchange="PropertyManager.setHeight(this.value)">
                </div>
            </div>` : ''}
            <div class="property-group">
                <div class="property-group-title">🎨 ESPAÇAMENTO</div>
                <div class="property-item">
                    <label class="property-label">Margem (px)</label>
                    <input type="number" class="property-input" value="${currentMargin}" onchange="PropertyManager.setMargin(this.value)">
                </div>
                <div class="property-item">
                    <label class="property-label">Padding (px)</label>
                    <input type="number" class="property-input" value="${currentPadding}" onchange="PropertyManager.setPadding(this.value)">
                </div>
            </div>
            ${elementType === 'icon' ? `<div class="property-group">
                <div class="property-group-title">⭐ ÍCONE</div>
                <div class="property-item">
                    <button class="btn-primary" style="width: 100%;" onclick="EmojiPickerManager.open(PropertyManager.currentElement.querySelector('div'))">
                        🎨 Selecionar Emoji
                    </button>
                </div>
            </div>` : ''}
            <div class="property-group">
                <div class="property-group-title">🗑️ AÇÕES</div>
                <button class="btn-secondary" style="width: 100%; background: #ef4444; color: white;" onclick="PropertyManager.deleteElement()">
                    🗑️ Deletar Elemento
                </button>
            </div>
        `;
    },
    
    alignHorizontal(align) {
        if (!this.currentElement) return;
        HistoryManager.saveState(true);
        this.currentElement.style.marginLeft = '';
        this.currentElement.style.marginRight = '';
        this.currentElement.style.textAlign = '';
        if (align === 'left') {
            this.currentElement.style.marginLeft = '0';
            this.currentElement.style.marginRight = 'auto';
            this.currentElement.style.textAlign = 'left';
        } else if (align === 'center') {
            this.currentElement.style.marginLeft = 'auto';
            this.currentElement.style.marginRight = 'auto';
            this.currentElement.style.textAlign = 'center';
        } else if (align === 'right') {
            this.currentElement.style.marginLeft = 'auto';
            this.currentElement.style.marginRight = '0';
            this.currentElement.style.textAlign = 'right';
        }
        setTimeout(() => HistoryManager.saveState(true), 100);
        showFeedback(`⬅️➡️ Alinhado`, 'success');
    },
    
    alignVertical(align) {
        if (!this.currentElement) return;
        HistoryManager.saveState(true);
        const parent = this.currentElement.parentElement;
        if (parent) {
            parent.style.display = 'flex';
            parent.style.flexDirection = 'column';
        }
        this.currentElement.style.marginTop = '';
        this.currentElement.style.marginBottom = '';
        this.currentElement.style.alignSelf = '';
        if (align === 'top') {
            this.currentElement.style.marginTop = '0';
            this.currentElement.style.marginBottom = 'auto';
            this.currentElement.style.alignSelf = 'flex-start';
        } else if (align === 'center') {
            this.currentElement.style.marginTop = 'auto';
            this.currentElement.style.marginBottom = 'auto';
            this.currentElement.style.alignSelf = 'center';
        } else if (align === 'bottom') {
            this.currentElement.style.marginTop = 'auto';
            this.currentElement.style.marginBottom = '0';
            this.currentElement.style.alignSelf = 'flex-end';
        }
        setTimeout(() => HistoryManager.saveState(true), 100);
        showFeedback(`⬆️⬇️ Alinhado`, 'success');
    },
    
    setWidth(value) {
        if (!this.currentElement) return;
        HistoryManager.saveState(true);
        if (value && value > 0) {
            this.currentElement.style.width = value + 'px';
        } else {
            this.currentElement.style.width = 'auto';
        }
        setTimeout(() => HistoryManager.saveState(true), 100);
        showFeedback(`📏 Largura: ${value}px`, 'success');
    },
    
    setHeight(value) {
        if (!this.currentElement) return;
        HistoryManager.saveState(true);
        if (value && value > 0) {
            this.currentElement.style.height = value + 'px';
        } else {
            this.currentElement.style.height = 'auto';
        }
        setTimeout(() => HistoryManager.saveState(true), 100);
        showFeedback(`📏 Altura: ${value || 'auto'}`, 'success');
    },
    
    setMargin(value) {
        if (!this.currentElement) return;
        HistoryManager.saveState(true);
        this.currentElement.style.margin = value + 'px';
        setTimeout(() => HistoryManager.saveState(true), 100);
        showFeedback(`🎨 Margem: ${value}px`, 'success');
    },
    
    setPadding(value) {
        if (!this.currentElement) return;
        HistoryManager.saveState(true);
        this.currentElement.style.padding = value + 'px';
        setTimeout(() => HistoryManager.saveState(true), 100);
        showFeedback(`🎨 Padding: ${value}px`, 'success');
    },
    
    deleteElement() {
        if (!this.currentElement) return;
        if (confirm('🗑️ Deletar este elemento?')) {
            HistoryManager.saveState(true);
            this.currentElement.remove();
            this.currentElement = null;
            this.show(null);
            LayersManager.updateLayers();
            setTimeout(() => HistoryManager.saveState(true), 100);
            showFeedback('🗑️ Elemento deletado!', 'success');
        }
    }
};

/* ============================================
   ⭐ EMOJI PICKER MANAGER
   ============================================ */

const EmojiPickerManager = {
    currentIconElement: null,
    emojis: ['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','🥰','😗','🙂','🤗','🤩','🤔','🤨','😐','😑','😶','🙄','😏','😣','😥','😮','🤐','😯','😪','❤️','🧡','💛','💚','💙','💜','🤎','🖤','💖','💕','💓','💗','💘','💝','💞','💟','⭐','🌟','✨','💫','🔥','💥','⚡','🌈','☀️','🌙','☁️','⛅','🌤️','⛈️','🌊','💧','🎉','🎊','🎈','🎁','🏆','🎯','🎪','🎨','🎭','🎬','🎤','🎧','🎼','🎹','🎸','🎺','👍','👎','👏','🙌','👐','🤝','🙏','💪','✌️','🤞','🤟','🤘','👌','👈','👉','👆','📱','💻','⌨️','🖥️','🖨️','📷','📹','🎥','📞','☎️','📟','📠','📺','📻','🔊','🔔','✅','❌','⭕','🔴','🟡','🟢','🔵','⚪','⚫','🟤','🟣','🟢','🔶','🔷','🔸','🔹'],
    
    open(iconElement) {
        this.currentIconElement = iconElement;
        this.renderGrid();
        document.getElementById('emojiModal').style.display = 'flex';
    },
    
    close() {
        document.getElementById('emojiModal').style.display = 'none';
        this.currentIconElement = null;
    },
    
    renderGrid() {
        const picker = document.getElementById('emojiPicker');
        picker.innerHTML = this.emojis.map(emoji => 
            `<div class="emoji-item" onclick="EmojiPickerManager.selectEmoji('${emoji}')">${emoji}</div>`
        ).join('');
    },
    
    selectEmoji(emoji) {
        if (!this.currentIconElement) return;
        HistoryManager.saveState(true);
        this.currentIconElement.textContent = emoji;
        setTimeout(() => HistoryManager.saveState(true), 100);
        this.close();
        showFeedback(`⭐ Ícone: ${emoji}`, 'success');
    }
};

function closeEmojiModal() {
    EmojiPickerManager.close();
}

// Prevent accidental navigation
window.addEventListener('beforeunload', function(e) {
    if (EditorState.isDirty) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
});

console.log('%c✅ Editor VIP 100% Funcional!', 'color: #10b981; font-weight: bold;');
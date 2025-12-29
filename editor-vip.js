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
    }
}

function updateElementStyle(property, value) {
    if (EditorState.selectedElement) {
        EditorState.selectedElement.style[property] = value;
        EditorState.isDirty = true;
    }
}

// Generate Layers Tree
function generateLayersTree(doc) {
    const layersTree = document.getElementById('layersTree');
    
    if (!doc || !doc.body) {
        layersTree.innerHTML = '<p style="padding: 1rem; text-align: center; color: var(--text-muted);">Aguardando template...</p>';
        return;
    }
    
    const body = doc.body;
    let html = '';
    
    function processElement(el, level = 0) {
        const tagName = el.tagName.toLowerCase();
        const text = el.textContent ? el.textContent.substring(0, 30).trim() : '';
        const indent = level * 16;
        
        html += `
            <div class="layer-item" style="padding-left: ${indent}px">
                <span class="layer-name">${tagName}${text ? ': ' + text + '...' : ''}</span>
            </div>
        `;
        
        Array.from(el.children).forEach(child => {
            if (child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE') {
                processElement(child, level + 1);
            }
        });
    }
    
    Array.from(body.children).forEach(child => {
        processElement(child);
    });
    
    layersTree.innerHTML = html || '<p style="padding: 1rem; text-align: center; color: var(--text-muted);">Nenhuma camada disponível</p>';
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

// Prevent accidental navigation
window.addEventListener('beforeunload', function(e) {
    if (EditorState.isDirty) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
});

console.log('%c✅ Editor VIP 100% Funcional!', 'color: #10b981; font-weight: bold;');

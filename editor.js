/* ============================================
   EDITOR NORMAL - JAVASCRIPT
   Simple editor for free templates
   ============================================ */

// Global State
const EditorState = {
    currentTemplate: null,
    device: 'desktop',
    config: {
        primaryColor: '#667eea',
        backgroundColor: '#ffffff',
        heroTitle: '',
        heroSubtitle: '',
        buttonText: 'Saiba Mais',
        spacing: 20,
        borderRadius: 8,
        heroImage: null
    }
};

// Free Templates (Simple HTML structure) - COM CORES ESPECÍFICAS
const FREE_TEMPLATES = {
    startup: {
        name: 'Startup Simples',
        colors: {
            primaryColor: '#ec4899',
            backgroundColor: '#ffffff',
            heroBackgroundColor: '#831843',
            textColor: '#fff'
        }
    },
    business: {
        name: 'Negócio Local',
        colors: {
            primaryColor: '#2563eb',
            backgroundColor: '#ffffff',
            heroBackgroundColor: '#1e293b',
            textColor: '#fff'
        }
    },
    portfolio: {
        name: 'Portfólio',
        colors: {
            primaryColor: '#7c3aed',
            backgroundColor: '#ffffff',
            heroBackgroundColor: '#1e1b4b',
            textColor: '#fff'
        }
    }
};

// Initialize Editor
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c📝 Editor Normal Iniciado', 'font-size: 16px; font-weight: bold; color: #667eea;');
    initializeEditor();
});

function initializeEditor() {
    try {
        // Get selected template
        const selectedTemplate = localStorage.getItem('selectedTemplate') || 'startup';
        const savedConfig = localStorage.getItem('landingConfig');
        
        // Aplicar cores do template selecionado
        const templateColors = FREE_TEMPLATES[selectedTemplate]?.colors || FREE_TEMPLATES.startup.colors;
        
        if (savedConfig) {
            const config = JSON.parse(savedConfig);
            // Merge com cores do template
            EditorState.config = { 
                ...EditorState.config, 
                ...templateColors,
                ...config 
            };
        } else {
            // Aplicar cores do template pela primeira vez
            EditorState.config = { ...EditorState.config, ...templateColors };
        }
        
        EditorState.currentTemplate = selectedTemplate;
        
        // Update header
        const templateName = FREE_TEMPLATES[selectedTemplate]?.name || 'Template';
        document.getElementById('templateNameDisplay').textContent = templateName;
        
        // Load values into inputs
        loadConfigToInputs();
        
        // Generate and load template
        loadTemplate();
        
        // Hide loading
        setTimeout(() => {
            document.getElementById('loadingOverlay').classList.add('hidden');
        }, 500);
        
    } catch (error) {
        console.error('Error initializing editor:', error);
        alert('Erro ao carregar o editor');
    }
}

// Load config to inputs
function loadConfigToInputs() {
    const config = EditorState.config;
    
    document.getElementById('primaryColor').value = config.primaryColor || '#667eea';
    document.getElementById('bgColor').value = config.backgroundColor || '#ffffff';
    document.getElementById('heroTitle').value = config.heroTitle || '';
    document.getElementById('heroSubtitle').value = config.heroSubtitle || '';
    document.getElementById('buttonText').value = config.buttonText || 'Saiba Mais';
    document.getElementById('spacing').value = config.spacing || 20;
    document.getElementById('borderRadius').value = config.borderRadius || 8;
    
    document.getElementById('spacingValue').textContent = (config.spacing || 20) + 'px';
    document.getElementById('borderRadiusValue').textContent = (config.borderRadius || 8) + 'px';
}

// Generate Simple Template HTML
function generateSimpleTemplate() {
    const config = EditorState.config;
    
    // Define hero background color - garantir que use a cor correta
    const heroBackgroundColor = config.heroBackgroundColor || config.primaryColor;
    const textColor = config.textColor || '#ffffff';
    
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            background: ${config.backgroundColor};
            position: relative;
        }
        
        /* MARCA D'ÁGUA */
        body::before {
            content: '';
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 120px;
            height: 120px;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iMTIiIGZpbGw9IiM2NjdlZWEiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjx0ZXh0IHg9IjYwIiB5PSI3MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjQwIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzY2N2VlYSIgZmlsbC1vcGFjaXR5PSIwLjIiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkxEPC90ZXh0Pgo8L3N2Zz4=');
            background-size: contain;
            background-repeat: no-repeat;
            opacity: 0.3;
            pointer-events: none;
            z-index: 9999;
        }
        
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            padding: 0 ${config.spacing}px; 
        }
        
        /* Header */
        header { 
            background: #fff; 
            padding: 1.5rem 0; 
            box-shadow: 0 2px 10px rgba(0,0,0,0.05); 
        }
        header .container { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
        }
        .logo { 
            font-size: 1.5rem; 
            font-weight: bold; 
            color: ${config.primaryColor}; 
        }
        nav { 
            display: flex; 
            gap: 2rem; 
        }
        nav a { 
            color: #333; 
            text-decoration: none; 
            transition: color 0.3s; 
        }
        nav a:hover { 
            color: ${config.primaryColor}; 
        }
        
        /* Hero */
        .hero { 
            background: ${heroBackgroundColor}; 
            color: ${textColor}; 
            padding: 8rem ${config.spacing}px; 
            text-align: center; 
            position: relative;
        }
        ${config.heroImage ? `
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('${config.heroImage}') center/cover;
            opacity: 0.2;
        }
        ` : ''}
        .hero-content { 
            position: relative; 
            z-index: 1; 
        }
        .hero h1 { 
            font-size: 3.5rem; 
            margin-bottom: 1.5rem; 
            font-weight: bold; 
        }
        .hero p { 
            font-size: 1.25rem; 
            margin-bottom: 2.5rem; 
            opacity: 0.9; 
        }
        
        /* Button */
        .btn { 
            background: ${config.primaryColor}; 
            color: #fff; 
            padding: 1rem 2.5rem; 
            border: none; 
            border-radius: ${config.borderRadius}px; 
            font-size: 1.125rem; 
            font-weight: 600; 
            cursor: pointer; 
            transition: all 0.3s; 
        }
        .btn:hover { 
            transform: translateY(-2px); 
            box-shadow: 0 10px 25px rgba(0,0,0,0.2); 
        }
        
        /* Features */
        .features { 
            padding: 6rem ${config.spacing}px; 
            background: #fff; 
        }
        .features h2 { 
            text-align: center; 
            font-size: 2.5rem; 
            margin-bottom: 4rem; 
            color: ${config.primaryColor}; 
        }
        .features-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
            gap: 2rem; 
        }
        .feature-card { 
            padding: 2rem; 
            background: #f8f9fa; 
            border-radius: ${config.borderRadius}px; 
            text-align: center; 
            transition: all 0.3s; 
        }
        .feature-card:hover { 
            transform: translateY(-10px); 
            box-shadow: 0 10px 30px rgba(0,0,0,0.1); 
        }
        .feature-icon { 
            font-size: 3rem; 
            margin-bottom: 1.5rem; 
        }
        .feature-card h3 { 
            font-size: 1.5rem; 
            margin-bottom: 1rem; 
            color: ${config.primaryColor}; 
        }
        .feature-card p { 
            color: #666; 
            line-height: 1.8; 
        }
        
        /* CTA */
        .cta { 
            background: ${heroBackgroundColor}; 
            color: ${textColor}; 
            padding: 6rem ${config.spacing}px; 
            text-align: center; 
        }
        .cta h2 { 
            font-size: 2.5rem; 
            margin-bottom: 1rem; 
        }
        .cta p { 
            font-size: 1.25rem; 
            margin-bottom: 2.5rem; 
            opacity: 0.9; 
        }
        
        /* Footer */
        footer { 
            background: #1a1a1a; 
            color: #fff; 
            padding: 2rem ${config.spacing}px; 
            text-align: center; 
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .hero h1 { font-size: 2rem; }
            nav { display: none; }
            .features-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <div class="logo">Leadify</div>
            <nav>
                <a href="#home">Início</a>
                <a href="#features">Recursos</a>
                <a href="#contact">Contato</a>
            </nav>
        </div>
    </header>

    <section class="hero" id="home">
        <div class="container hero-content">
            <h1>${config.heroTitle || 'Transforme Seu Negócio'}</h1>
            <p>${config.heroSubtitle || 'Soluções inovadoras para impulsionar seus resultados'}</p>
            <button class="btn">${config.buttonText || 'Saiba Mais'}</button>
        </div>
    </section>

    <section class="features" id="features">
        <div class="container">
            <h2>Nossos Diferenciais</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">🚀</div>
                    <h3>Rápido</h3>
                    <p>Resultados em tempo recorde com nossa tecnologia avançada</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">💎</div>
                    <h3>Qualidade</h3>
                    <p>Padrão premium em todos os nossos serviços</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🎯</div>
                    <h3>Focado</h3>
                    <p>Soluções personalizadas para suas necessidades</p>
                </div>
            </div>
        </div>
    </section>

    <section class="cta">
        <div class="container">
            <h2>Pronto Para Começar?</h2>
            <p>Entre em contato e descubra como podemos ajudar</p>
            <button class="btn">Falar com Especialista</button>
        </div>
    </section>

    <footer>
        <div class="container">
            <p>&copy; 2024 Sua Empresa. Todos os direitos reservados.</p>
            <p style="margin-top: 0.5rem; font-size: 0.875rem; opacity: 0.7;">
                Feito com Leadify
            </p>
        </div>
    </footer>
</body>
</html>
    `;
}

// Load Template
function loadTemplate() {
    const iframe = document.getElementById('previewFrame');
    const templateHTML = generateSimpleTemplate();
    
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(templateHTML);
    iframeDoc.close();
}

// Update Functions
function updateColor(type, value) {
    if (type === 'primary') {
        EditorState.config.primaryColor = value;
    } else if (type === 'background') {
        EditorState.config.backgroundColor = value;
    }
    
    loadTemplate();
    saveConfig();
}

function updateContent(type, value) {
    if (type === 'title') {
        EditorState.config.heroTitle = value;
    } else if (type === 'subtitle') {
        EditorState.config.heroSubtitle = value;
    } else if (type === 'button') {
        EditorState.config.buttonText = value;
    }
    
    loadTemplate();
    saveConfig();
}

function updateSpacing(value) {
    EditorState.config.spacing = parseInt(value);
    document.getElementById('spacingValue').textContent = value + 'px';
    loadTemplate();
    saveConfig();
}

function updateBorderRadius(value) {
    EditorState.config.borderRadius = parseInt(value);
    document.getElementById('borderRadiusValue').textContent = value + 'px';
    loadTemplate();
    saveConfig();
}

function uploadHeroImage(input) {
    const file = input.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        EditorState.config.heroImage = e.target.result;
        
        // Show preview
        const preview = document.getElementById('heroImagePreview');
        preview.innerHTML = `<img src="${e.target.result}" alt="Hero Image">`;
        
        loadTemplate();
        saveConfig();
    };
    reader.readAsDataURL(file);
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
    
    if (device === 'mobile') {
        wrapper.classList.add('device-mobile');
    }
}

// Save Config
function saveConfig() {
    localStorage.setItem('landingConfig', JSON.stringify(EditorState.config));
}

// Save Template
function saveTemplate() {
    saveConfig();
    alert('✅ Template salvo com sucesso!');
}

// Preview Template
function previewTemplate() {
    const iframe = document.getElementById('previewFrame');
    const doc = iframe.contentDocument;
    
    if (doc) {
        const html = doc.documentElement.outerHTML;
        const win = window.open('', '_blank');
        win.document.write(html);
        win.document.close();
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
        a.download = `landing-page-${Date.now()}.html`;
        a.click();
        URL.revokeObjectURL(url);
        
        alert('✅ Template exportado com sucesso!');
    }
}

console.log('%c✅ Editor Normal pronto!', 'color: #10b981; font-weight: bold;');
// Landing Page Configuration
const landingConfig = {
    // Header
    logoType: 'text',
    logoText: 'LD',
    logoImage: '',
    brandName: 'Vozzy',
    logoColor: '#D94140',
    headerBackgroundColor: '#06121E',
    showMenu: 'false',
    menuItems: [],
    
    // Hero
    heroTitle: 'Transforme suas ideias em realidade',
    heroSubtitle: 'Crie landing pages profissionais de forma rápida e fácil',
    heroDescription: '',
    heroButtonText: 'Entre em Contato',
    heroButtonLink: '#contato',
    heroButtonColor: '#D94140',
    heroButton2Text: '',
    heroButton2Link: '',
    heroButton2Color: '#6b7280',
    heroBackgroundImage: '',
    heroBackgroundColor: '#06121E',
    heroTextColor: '#ffffff',
    heroMinHeight: '60vh',
    heroImageSide: '',
    
    // About
    showAbout: 'true',
    aboutTitle: 'Sobre Nós',
    aboutDescription: 'Somos especialistas em criar soluções digitais incríveis. Nossa equipe está pronta para transformar suas ideias em realidade.',
    aboutImage: '',
    aboutImagePosition: 'right',
    aboutBackgroundColor: '#06121E',
    aboutTitleColor: '#ffffff',
    aboutTextColor: '#ffffff',
    
    // Projects
    showProjects: 'true',
    projectsTitle: 'Nossos Projetos',
    projectsDescription: '',
    projectsBackgroundColor: '#ffffff',
    projectsTitleColor: '#232224',
    projectsDescriptionColor: '#6b7280',
    projects: [
        { title: 'Projeto 1', description: '', image: '', price: '', link: '#', buttonText: 'Ver mais', buttonColor: '#D94140' },
        { title: 'Projeto 2', description: '', image: '', price: '', link: '#', buttonText: 'Ver mais', buttonColor: '#D94140' },
        { title: 'Projeto 3', description: '', image: '', price: '', link: '#', buttonText: 'Ver mais', buttonColor: '#D94140' },
        { title: 'Projeto 4', description: '', image: '', price: '', link: '#', buttonText: 'Ver mais', buttonColor: '#D94140' },
        { title: 'Projeto 5', description: '', image: '', price: '', link: '#', buttonText: 'Ver mais', buttonColor: '#D94140' },
        { title: 'Projeto 6', description: '', image: '', price: '', link: '#', buttonText: 'Ver mais', buttonColor: '#D94140' }
    ],
    
    // Footer
    footerText: '© 2025 Vozzy - Todos os direitos reservados',
    footerDescription: '',
    footerBackgroundColor: '#06121E',
    footerTextColor: '#ffffff',
    showSocialLinks: 'true',
    footerGithub: '#',
    footerTwitter: '#',
    footerLinkedin: '#',
    footerInstagram: '#',
    footerEmail: '',
    footerPhone: '',
    footerAddress: ''
};

// Templates
const templates = {
    business: {
        logoText: 'BZ',
        brandName: 'Business Pro',
        logoColor: '#2563eb',
        heroTitle: 'Soluções Empresariais Inteligentes',
        heroSubtitle: 'Transforme seu negócio com nossas soluções personalizadas',
        heroButtonColor: '#2563eb',
        heroBackgroundColor: '#1e293b',
        aboutTitle: 'Sobre Nossa Empresa',
        aboutDescription: 'Somos líderes em soluções empresariais com mais de 10 anos de experiência no mercado.',
        projectsTitle: 'Nossos Clientes'
    },
    portfolio: {
        logoText: 'PF',
        brandName: 'Portfolio',
        logoColor: '#7c3aed',
        heroTitle: 'Designer & Desenvolvedor Criativo',
        heroSubtitle: 'Criando experiências digitais únicas e memoráveis',
        heroButtonColor: '#7c3aed',
        heroBackgroundColor: '#1e1b4b',
        aboutTitle: 'Sobre Mim',
        aboutDescription: 'Designer apaixonado por criar interfaces bonitas e funcionais.',
        projectsTitle: 'Meus Trabalhos'
    },
    startup: {
        logoText: 'ST',
        brandName: 'Startup',
        logoColor: '#ec4899',
        heroTitle: 'Inovação que Transforma',
        heroSubtitle: 'A próxima geração de tecnologia está aqui',
        heroButtonColor: '#ec4899',
        heroBackgroundColor: '#831843',
        aboutTitle: 'Nossa Missão',
        aboutDescription: 'Revolucionar o mercado com tecnologia de ponta e inovação constante.',
        projectsTitle: 'Nossos Produtos'
    },
    restaurant: {
        logoText: 'RT',
        brandName: 'Restaurante',
        logoColor: '#f97316',
        heroTitle: 'Sabores Autênticos',
        heroSubtitle: 'A melhor experiência gastronômica da cidade',
        heroButtonColor: '#f97316',
        heroBackgroundColor: '#7c2d12',
        aboutTitle: 'Nossa História',
        aboutDescription: 'Tradição familiar de mais de 30 anos servindo os melhores pratos.',
        projectsTitle: 'Nosso Cardápio'
    },
    ecommerce: {
        logoText: 'EC',
        brandName: 'E-Shop',
        logoColor: '#06b6d4',
        heroTitle: 'Compre com Estilo',
        heroSubtitle: 'As melhores ofertas em produtos de qualidade',
        heroButtonColor: '#06b6d4',
        heroBackgroundColor: '#164e63',
        aboutTitle: 'Por que Escolher-nos',
        aboutDescription: 'Qualidade garantida, entrega rápida e os melhores preços do mercado.',
        projectsTitle: 'Produtos em Destaque'
    },
    agency: {
        logoText: 'AG',
        brandName: 'Agência Digital',
        logoColor: '#10b981',
        heroTitle: 'Sua Marca, Nossa Paixão',
        heroSubtitle: 'Criamos estratégias digitais que geram resultados',
        heroButtonColor: '#10b981',
        heroBackgroundColor: '#064e3b',
        aboutTitle: 'Sobre Nossa Agência',
        aboutDescription: 'Especialistas em marketing digital, design e desenvolvimento web.',
        projectsTitle: 'Cases de Sucesso'
    },
    luxuryHotel: {
        logoText: 'LH',
        brandName: 'Luxury Hotel',
        logoColor: '#d4af37',
        heroTitle: '✨ Experiência Incomparável em Hospedagem',
        heroSubtitle: 'Descubra o verdadeiro significado de luxo e conforto',
        heroButtonColor: '#d4af37',
        heroBackgroundColor: '#1a1a2e',
        headerBackgroundColor: '#000000',
        aboutTitle: 'Bem-vindo ao Luxo Absoluto',
        aboutDescription: 'Uma experiência única em hospitalidade de alto padrão. Suítes premium com vista panorâmica, spa exclusivo e gastronomia renomada.',
        aboutBackgroundColor: '#0a0a0a',
        aboutTitleColor: '#d4af37',
        aboutTextColor: '#f5f5f5',
        projectsTitle: 'Suítes Premium',
        projectsDescription: 'Acomodações que redefinem o conceito de luxo',
        projectsBackgroundColor: '#f9f9f9',
        projectsTitleColor: '#1a1a1a',
        projects: [
            { title: 'Royal Suite', description: '250m² de puro requinte com vista panorâmica', price: 'A partir de R$ 3.500/noite', buttonText: 'Ver Detalhes', buttonColor: '#d4af37' },
            { title: 'Presidential Suite', description: '350m² de sofisticação absoluta com terraço privativo', price: 'A partir de R$ 5.500/noite', buttonText: 'Ver Detalhes', buttonColor: '#d4af37' },
            { title: 'Diamond Suite', description: '200m² de elegância com jacuzzi e serviço de mordomo', price: 'A partir de R$ 2.800/noite', buttonText: 'Ver Detalhes', buttonColor: '#d4af37' }
        ],
        footerBackgroundColor: '#0a0a0a',
        footerTextColor: '#d4af37',
        footerText: '© 2024 Luxury Hotel. Todos os direitos reservados.',
        footerDescription: 'Experiência e requinte desde 1985'
    },
    techStartup: {
        logoText: 'TS',
        brandName: 'Tech Startup Pro',
        logoColor: '#667eea',
        heroTitle: '🚀 Transforme Seu Negócio com Tecnologia de Ponta',
        heroSubtitle: 'A plataforma completa para automatizar processos e impulsionar resultados',
        heroButtonColor: '#667eea',
        heroBackgroundColor: '#f7fafc',
        headerBackgroundColor: '#ffffff',
        heroTextColor: '#1a202c',
        aboutTitle: 'A Solução Que Sua Empresa Precisa',
        aboutDescription: 'Nossa plataforma integra todas as ferramentas necessárias para gerenciar e expandir seu negócio de forma eficiente e escalável.',
        aboutBackgroundColor: '#ffffff',
        aboutTitleColor: '#2d3748',
        aboutTextColor: '#4a5568',
        projectsTitle: 'Recursos Poderosos',
        projectsDescription: 'Tudo que você precisa em uma única plataforma',
        projectsBackgroundColor: '#f7fafc',
        projectsTitleColor: '#2d3748',
        projects: [
            { title: '🚀 Deploy Instantâneo', description: 'Coloque suas aplicações no ar em segundos', buttonText: 'Saiba Mais', buttonColor: '#667eea' },
            { title: '📊 Analytics Avançado', description: 'Visualize métricas detalhadas e tome decisões', buttonText: 'Saiba Mais', buttonColor: '#667eea' },
            { title: '🔒 Segurança Máxima', description: 'Proteção de dados com criptografia de ponta', buttonText: 'Saiba Mais', buttonColor: '#667eea' },
            { title: '⚡ Performance Alta', description: 'Velocidade excepcional com CDN global', buttonText: 'Saiba Mais', buttonColor: '#667eea' }
        ],
        footerBackgroundColor: '#1a202c',
        footerTextColor: '#a0aec0',
        footerText: '© 2024 Tech Startup Pro. Todos os direitos reservados.',
        footerDescription: 'Transformando negócios através da tecnologia'
    },
    fashionBrand: {
        logoText: 'FB',
        brandName: 'Fashion Elite',
        logoColor: '#1a1a1a',
        heroTitle: '👗 Alta Costura',
        heroSubtitle: 'Elegância Atemporal',
        heroButtonColor: '#1a1a1a',
        heroBackgroundColor: '#2c2c2c',
        headerBackgroundColor: '#ffffff',
        heroTextColor: '#ffffff',
        aboutTitle: 'ÉLITE Fashion',
        aboutDescription: 'Desde 1985, criamos peças exclusivas que transcendem tendências. Nossa marca representa o ápice da moda de luxo, combinando tradição artesanal com design contemporâneo.',
        aboutBackgroundColor: '#ffffff',
        aboutTitleColor: '#1a1a1a',
        aboutTextColor: '#666666',
        projectsTitle: 'Coleção Exclusiva',
        projectsDescription: 'Peças únicas e limitadas',
        projectsBackgroundColor: '#fafafa',
        projectsTitleColor: '#1a1a1a',
        projects: [
            { title: 'Vestido Noir', description: 'Alta costura em tecido nobre', price: 'R$ 12.900', buttonText: 'Ver Detalhes', buttonColor: '#1a1a1a' },
            { title: 'Blazer Premium', description: 'Confecção artesanal italiana', price: 'R$ 8.500', buttonText: 'Ver Detalhes', buttonColor: '#1a1a1a' },
            { title: 'Conjunto Élite', description: 'Exclusividade e sofisticação', price: 'R$ 15.700', buttonText: 'Ver Detalhes', buttonColor: '#1a1a1a' }
        ],
        footerBackgroundColor: '#0a0a0a',
        footerTextColor: '#999999',
        footerText: '© 2024 ÉLITE Fashion. Todos os direitos reservados.',
        footerDescription: 'Alta costura desde 1985'
    },
    medicalClinic: {
        logoText: 'MC',
        brandName: 'Medical Pro',
        logoColor: '#3182ce',
        heroTitle: '⚕️ Cuidando da Sua Saúde com Excelência',
        heroSubtitle: 'Atendimento médico premium com tecnologia de ponta',
        heroButtonColor: '#3182ce',
        heroBackgroundColor: '#ebf8ff',
        headerBackgroundColor: '#ffffff',
        heroTextColor: '#2d3748',
        aboutTitle: 'Excelência em Saúde',
        aboutDescription: 'Mais de 30 anos de experiência oferecendo atendimento médico de alto padrão. Equipe especializada, equipamentos modernos e cuidado humanizado.',
        aboutBackgroundColor: '#ffffff',
        aboutTitleColor: '#2d3748',
        aboutTextColor: '#4a5568',
        projectsTitle: 'Nossos Serviços',
        projectsDescription: 'Cuidado completo para você e sua família',
        projectsBackgroundColor: '#f7fafc',
        projectsTitleColor: '#2d3748',
        projects: [
            { title: 'Check-up Executivo', description: 'Avaliação completa da sua saúde', price: 'A partir de R$ 1.200', buttonText: 'Agendar', buttonColor: '#3182ce' },
            { title: 'Medicina Preventiva', description: 'Programas personalizados de prevenção', price: 'A partir de R$ 800', buttonText: 'Agendar', buttonColor: '#3182ce' },
            { title: 'Exames Laboratoriais', description: 'Resultados em até 24h', buttonText: 'Consultar', buttonColor: '#3182ce' }
        ],
        footerBackgroundColor: '#1a202c',
        footerTextColor: '#a0aec0',
        footerText: '© 2024 Medical Pro. Todos os direitos reservados.',
        footerDescription: 'Excelência em saúde desde 1995'
    },
    financeApp: {
        logoText: 'FN',
        brandName: 'Finance Premium',
        logoColor: '#d4af37',
        heroTitle: '💰 Gestão Patrimonial de Alto Padrão',
        heroSubtitle: 'Estratégias personalizadas para multiplicar seu patrimônio',
        heroButtonColor: '#d4af37',
        heroBackgroundColor: '#1a202c',
        headerBackgroundColor: '#1a202c',
        heroTextColor: '#ffffff',
        aboutTitle: 'Gestão Financeira Exclusiva',
        aboutDescription: 'Mais de 25 anos de experiência no mercado financeiro. R$ 2 bilhões em ativos sob gestão. Especialistas em gestão patrimonial e planejamento sucessório.',
        aboutBackgroundColor: '#1a1a1a',
        aboutTitleColor: '#d4af37',
        aboutTextColor: '#f5f5f5',
        projectsTitle: 'Serviços Financeiros Premium',
        projectsDescription: 'Soluções exclusivas para seu patrimônio',
        projectsBackgroundColor: '#f7fafc',
        projectsTitleColor: '#1a1a1a',
        projects: [
            { title: '💼 Gestão de Investimentos', description: 'Portfólio personalizado com acompanhamento exclusivo', buttonText: 'Contratar', buttonColor: '#d4af37' },
            { title: '📊 Planejamento Sucessório', description: 'Proteja seu patrimônio e garanta o futuro', buttonText: 'Contratar', buttonColor: '#d4af37' },
            { title: '🏦 Private Banking', description: 'Atendimento exclusivo com gerente dedicado', buttonText: 'Contratar', buttonColor: '#d4af37' }
        ],
        footerBackgroundColor: '#0a0a0a',
        footerTextColor: '#d4af37',
        footerText: '© 2024 Finance Premium. Todos os direitos reservados.',
        footerDescription: 'Gestão patrimonial desde 1999'
    },
    realEstate: {
        logoText: 'RE',
        brandName: 'Real Estate Luxo',
        logoColor: '#8b6f47',
        heroTitle: '🏠 Imóveis de Luxo e Exclusividade',
        heroSubtitle: 'As propriedades mais desejadas em localizações privilegiadas',
        heroButtonColor: '#8b6f47',
        heroBackgroundColor: '#8b6f47',
        headerBackgroundColor: '#ffffff',
        heroTextColor: '#ffffff',
        aboutTitle: 'Imóveis de Alto Padrão',
        aboutDescription: 'Mais de 30 anos de experiência em imóveis de luxo. Portfólio exclusivo com propriedades únicas. Atendimento VIP e consultoria especializada.',
        aboutBackgroundColor: '#ffffff',
        aboutTitleColor: '#8b6f47',
        aboutTextColor: '#4a5568',
        projectsTitle: 'Propriedades em Destaque',
        projectsDescription: 'Conheça nosso portfólio exclusivo',
        projectsBackgroundColor: '#f7fafc',
        projectsTitleColor: '#1a1a1a',
        projects: [
            { title: 'Cobertura Jardins', description: '🛏️ 4 suítes | 🚗 5 vagas | 📐 450m²', price: 'R$ 8.500.000', buttonText: 'Agendar Visita', buttonColor: '#8b6f47' },
            { title: 'Mansão Alphaville', description: '🛏️ 6 suítes | 🚗 8 vagas | 📐 850m²', price: 'R$ 12.000.000', buttonText: 'Agendar Visita', buttonColor: '#8b6f47' },
            { title: 'Penthouse Itaim', description: '🛏️ 5 suítes | 🚗 6 vagas | 📐 520m²', price: 'R$ 9.800.000', buttonText: 'Agendar Visita', buttonColor: '#8b6f47' }
        ],
        footerBackgroundColor: '#1a202c',
        footerTextColor: '#8b6f47',
        footerText: '© 2024 Real Estate Luxo. Todos os direitos reservados. CRECI 12345-J',
        footerDescription: 'Imóveis de luxo desde 1994'
    }
};

// VIP Templates (para checkout e roteamento)
// IMPORTANTE: Todos estes templates são VIP e abrem no Editor VIP (editor-vip.html)
const vipTemplates = [
    'luxuryHotel', 
    'techStartup', 
    'fashionBrand', 
    'medicalClinic', 
    'financeApp', 
    'realEstate',
    // Novos templates VIP de profissões
    'barbeiro',
    'eletricista',
    'manicure',
    'personal',
    'fotografo',
    'marmitas'
];

// Load Template
function loadTemplate(templateName) {
    // Verifica se é VIP
    if (vipTemplates.includes(templateName)) {
        // Verifica se o usuário está logado
        const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
        
        if (!isLoggedIn) {
            alert('🔒 Você precisa estar logado para usar templates VIP!\n\nFaça login ou crie uma conta para continuar.');
            return;
        }
        
        // Verifica se já comprou este template
        const purchasedTemplates = JSON.parse(localStorage.getItem('purchasedTemplates') || '[]');
        const hasPurchased = purchasedTemplates.includes(templateName);
        
        // Verifica se tem assinatura ativa
        const hasSubscription = localStorage.getItem('userSubscription') !== null;
        
        if (hasPurchased || hasSubscription) {
            // ✅ JÁ COMPROU OU TEM ASSINATURA → EDITOR VIP (SEM LIMITAÇÕES)
            localStorage.setItem('selectedTemplate', templateName);
            
            // Para templates VIP de profissões (novos), salvar dados mínimos
            const template = templates[templateName];
            if (template) {
                localStorage.setItem('landingConfig', JSON.stringify({...landingConfig, ...template}));
            } else {
                // Template de profissão - não tem config no templates{}, vai carregar direto do arquivo
                localStorage.setItem('landingConfig', JSON.stringify(landingConfig));
            }
            
            // Vai para o EDITOR VIP (sem limitações!)
            window.location.href = 'editor-vip.html';
        } else {
            // ⚠️ LOGADO MAS NÃO COMPROU → EDITOR GRATUITO (COM LIMITAÇÕES)
            localStorage.setItem('selectedTemplate', templateName);
            
            const template = templates[templateName];
            if (template) {
                localStorage.setItem('landingConfig', JSON.stringify({...landingConfig, ...template}));
            } else {
                localStorage.setItem('landingConfig', JSON.stringify(landingConfig));
            }
            
            // Vai para EDITOR GRATUITO (com limitações: marca d'água, 2 exportações, paleta limitada)
            window.location.href = 'editor.html';
        }
        return;
    }
    
    // Template gratuito - carrega no editor normal
    const template = templates[templateName];
    if (template) {
        // Salva o template escolhido
        localStorage.setItem('selectedTemplate', templateName);
        localStorage.setItem('landingConfig', JSON.stringify({...landingConfig, ...template}));
        // Vai para o editor normal
        window.location.href = 'editor.html';
    }
}

// Update form inputs
function updateFormInputs() {
    Object.keys(landingConfig).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.value = landingConfig[key];
        }
        
        const textElement = document.getElementById(key + 'Text');
        if (textElement) {
            textElement.value = landingConfig[key];
        }
    });
    
    updateLandingPage();
}

// Navigation
function enterEditor() {
    window.location.href = 'editor.html';
}

// Toggle Ver Mais VIP
function toggleVerMaisVip() {
    const section = document.getElementById('vipProfessionalSection');
    const btn = document.getElementById('btnVerMaisVip');
    const btnText = document.getElementById('btnVerMaisText');
    const btnIcon = document.getElementById('btnVerMaisIcon');
    
    if (section.style.display === 'none') {
        section.style.display = 'block';
        btnText.textContent = 'Ver Menos';
        btnIcon.innerHTML = '<path d="M19 15l-7-7-7 7" />';
        // Scroll suave para a nova seção
        setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    } else {
        section.style.display = 'none';
        btnText.textContent = 'Ver Mais Templates VIP';
        btnIcon.innerHTML = '<path d="M19 9l-7 7-7-7" />';
        // Scroll de volta para cima
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function exitEditor() {
    window.location.href = 'index.html';
}

// Device Preview Control
function setPreviewDevice(device) {
    // Remove active class from all device buttons
    document.querySelectorAll('.device-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    event.currentTarget.classList.add('active');
    
    // Get preview element
    const preview = document.getElementById('landingPreview');
    if (!preview) return;
    
    // Remove all device classes
    preview.classList.remove('device-desktop', 'device-tablet', 'device-mobile');
    
    // Add selected device class
    preview.classList.add(`device-${device}`);
    
    // Store current device preference
    localStorage.setItem('previewDevice', device);
}

// Load saved device preference
function loadDevicePreference() {
    const savedDevice = localStorage.getItem('previewDevice') || 'desktop';
    const deviceBtn = document.querySelector(`.device-btn[data-device="${savedDevice}"]`);
    if (deviceBtn) {
        deviceBtn.classList.add('active');
        const preview = document.getElementById('landingPreview');
        if (preview) {
            preview.classList.add(`device-${savedDevice}`);
        }
    }
}

// Initialize device selector on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadDevicePreference);
} else {
    loadDevicePreference();
}

// Panel Management
function showPanel(panelName) {
    // Hide all panels
    const panels = document.querySelectorAll('.edit-panel');
    panels.forEach(panel => {
        panel.style.display = 'none';
        panel.classList.remove('active');
    });
    
    // Show selected panel
    const selectedPanel = document.getElementById(panelName + 'Panel');
    if (selectedPanel) {
        selectedPanel.style.display = 'block';
        selectedPanel.classList.add('active');
    }
    
    // Update panel title
    const titles = {
        header: 'Editor de Header',
        hero: 'Editor de Hero',
        content: 'Editor de Conteúdo',
        projects: 'Editor de Projetos',
        footer: 'Editor de Footer'
    };
    
    document.getElementById('panelTitle').textContent = titles[panelName] || 'Editor de Seções';
    
    // Load values
    if (panelName === 'projects') {
        renderProjectsList();
    }
    
    if (panelName === 'header') {
        renderMenuItems();
    }
}

// Sync color inputs
function syncColor(colorId) {
    const colorInput = document.getElementById(colorId);
    const textInput = document.getElementById(colorId + 'Text');
    
    if (textInput && textInput.value.match(/^#[0-9A-F]{6}$/i)) {
        colorInput.value = textInput.value;
        updateLandingPage();
    }
}

// Update Hero Height
function updateHeroHeight() {
    const value = document.getElementById('heroMinHeight').value;
    landingConfig.heroMinHeight = value + 'vh';
    document.getElementById('heroMinHeightValue').textContent = value + 'vh';
    updateLandingPage();
}

// Menu Items
function renderMenuItems() {
    const container = document.getElementById('menuItemsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!landingConfig.menuItems) {
        landingConfig.menuItems = [];
    }
    
    landingConfig.menuItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'project-item';
        itemDiv.innerHTML = `
            <h4>Item ${index + 1}</h4>
            <div class="form-group">
                <label>Texto</label>
                <input type="text" value="${item.text}" oninput="updateMenuItem(${index}, 'text', this.value)">
            </div>
            <div class="form-group">
                <label>Link</label>
                <input type="text" value="${item.link}" oninput="updateMenuItem(${index}, 'link', this.value)">
            </div>
        `;
        container.appendChild(itemDiv);
    });
}

function addMenuItem() {
    if (!landingConfig.menuItems) {
        landingConfig.menuItems = [];
    }
    
    landingConfig.menuItems.push({
        text: `Item ${landingConfig.menuItems.length + 1}`,
        link: '#'
    });
    
    renderMenuItems();
    updateLandingPage();
}

function updateMenuItem(index, field, value) {
    if (landingConfig.menuItems[index]) {
        landingConfig.menuItems[index][field] = value;
        updateLandingPage();
    }
}

// Update Landing Page
function updateLandingPage() {
    // Update config from inputs
    const inputs = [
        'logoType', 'logoText', 'logoImage', 'brandName', 'logoColor', 'headerBackgroundColor', 'showMenu',
        'heroTitle', 'heroSubtitle', 'heroDescription', 'heroButtonText', 'heroButtonLink', 'heroButtonColor',
        'heroButton2Text', 'heroButton2Link', 'heroButton2Color',
        'heroBackgroundImage', 'heroBackgroundColor', 'heroTextColor', 'heroImageSide',
        'showAbout', 'aboutTitle', 'aboutDescription', 'aboutImage', 'aboutImagePosition',
        'aboutBackgroundColor', 'aboutTitleColor', 'aboutTextColor',
        'showProjects', 'projectsTitle', 'projectsDescription', 'projectsBackgroundColor', 'projectsTitleColor', 'projectsDescriptionColor',
        'footerText', 'footerDescription', 'footerBackgroundColor', 'footerTextColor', 'showSocialLinks',
        'footerGithub', 'footerTwitter', 'footerLinkedin', 'footerInstagram',
        'footerEmail', 'footerPhone', 'footerAddress'
    ];
    
    inputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            landingConfig[id] = element.value;
        }
    });
    
    renderPreview();
}

// Render Projects List
function renderProjectsList() {
    const container = document.getElementById('projectsList');
    if (!container) return;
    
    container.innerHTML = '';
    
    landingConfig.projects.forEach((project, index) => {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project-item';
        projectDiv.innerHTML = `
            <h4>Projeto ${index + 1}</h4>
            <div class="form-group">
                <label>Título</label>
                <input type="text" value="${project.title}" oninput="updateProject(${index}, 'title', this.value)">
            </div>
            <div class="form-group">
                <label>Descrição</label>
                <textarea rows="2" oninput="updateProject(${index}, 'description', this.value)">${project.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label>URL da Imagem</label>
                <input type="text" value="${project.image || ''}" placeholder="https://exemplo.com/imagem.jpg" oninput="updateProject(${index}, 'image', this.value)">
            </div>
            <div class="form-group">
                <label>Preço do Serviço (Opcional)</label>
                <input type="text" value="${project.price || ''}" placeholder="R$ 1.500,00" oninput="updateProject(${index}, 'price', this.value)">
                <small>Ex: R$ 1.500,00 ou A partir de R$ 500,00</small>
            </div>
            <div class="form-group">
                <label>Link</label>
                <input type="text" value="${project.link}" oninput="updateProject(${index}, 'link', this.value)">
            </div>
            <div class="form-group">
                <label>Texto do Botão</label>
                <input type="text" value="${project.buttonText}" oninput="updateProject(${index}, 'buttonText', this.value)">
            </div>
            <div class="form-group">
                <label>Cor do Botão</label>
                <div class="color-input-group">
                    <input type="color" value="${project.buttonColor}" onchange="updateProject(${index}, 'buttonColor', this.value)">
                    <input type="text" value="${project.buttonColor}" oninput="updateProject(${index}, 'buttonColor', this.value)">
                </div>
            </div>
        `;
        container.appendChild(projectDiv);
    });
}

// Update Project
function updateProject(index, field, value) {
    if (landingConfig.projects[index]) {
        landingConfig.projects[index][field] = value;
        updateLandingPage();
    }
}

// Add Project
function addProject() {
    landingConfig.projects.push({
        title: `Projeto ${landingConfig.projects.length + 1}`,
        description: '',
        image: '',
        price: '',
        link: '#',
        buttonText: 'Ver mais',
        buttonColor: '#D94140'
    });
    
    document.getElementById('projectsCount').value = landingConfig.projects.length;
    renderProjectsList();
    updateLandingPage();
}

// Update Projects Count
function updateProjectsCount() {
    const count = parseInt(document.getElementById('projectsCount').value);
    
    if (count > landingConfig.projects.length) {
        while (landingConfig.projects.length < count) {
            addProject();
        }
    } else if (count < landingConfig.projects.length) {
        landingConfig.projects = landingConfig.projects.slice(0, count);
    }
    
    renderProjectsList();
    updateLandingPage();
}

// Render Preview
function renderPreview() {
    const preview = document.getElementById('landingPreview');
    
    const heroBackground = landingConfig.heroBackgroundImage 
        ? `background-image: linear-gradient(to bottom, rgba(6, 18, 30, 0.7), rgba(6, 18, 30, 0.9)), url('${landingConfig.heroBackgroundImage}'); background-size: cover; background-position: center;`
        : `background-color: ${landingConfig.heroBackgroundColor};`;
    
    // Logo
    const logoHTML = landingConfig.logoType === 'image' && landingConfig.logoImage
        ? `<img src="${landingConfig.logoImage}" alt="Logo" style="width: 2.5rem; height: 2.5rem; border-radius: 0.5rem; object-fit: cover;">`
        : `<div class="lp-logo-box" style="background-color: ${landingConfig.logoColor};">${landingConfig.logoText}</div>`;
    
    // Menu
    const menuHTML = landingConfig.showMenu === 'true' && landingConfig.menuItems && landingConfig.menuItems.length > 0
        ? `<nav class="lp-menu" style="display: flex; gap: 1.5rem;">
            ${landingConfig.menuItems.map(item => `
                <a href="${item.link}" style="color: white; text-decoration: none; font-size: 0.9rem;">${item.text}</a>
            `).join('')}
        </nav>`
        : '';
    
    // Hero Side Image
    const heroSideImageHTML = landingConfig.heroImageSide
        ? `<div style="flex: 1; max-width: 500px;"><img src="${landingConfig.heroImageSide}" alt="Hero" style="width: 100%; border-radius: 0.75rem;"></div>`
        : '';
    
    // Hero Buttons
    const heroButton2HTML = landingConfig.heroButton2Text
        ? `<a href="${landingConfig.heroButton2Link}">
            <button class="lp-hero-button" style="background-color: ${landingConfig.heroButton2Color}; color: white; margin-left: 1rem;">
                ${landingConfig.heroButton2Text}
            </button>
        </a>`
        : '';
    
    const heroDescriptionHTML = landingConfig.heroDescription
        ? `<p class="lp-hero-subtitle" style="color: ${landingConfig.heroTextColor}; margin-top: 1rem;">${landingConfig.heroDescription}</p>`
        : '';
    
    // About Section
    const aboutImageHTML = landingConfig.aboutImage 
        ? `<div class="lp-about-image"><img src="${landingConfig.aboutImage}" alt="Sobre"></div>`
        : '';
    
    const aboutImagePosition = landingConfig.aboutImagePosition === 'left' ? 'flex-direction: row-reverse;' : 'flex-direction: row;';
    
    const aboutSectionHTML = landingConfig.showAbout === 'true' ? `
        <section class="lp-about" style="background-color: ${landingConfig.aboutBackgroundColor}; ${aboutImagePosition}">
            <div class="lp-about-content">
                <h2 class="lp-about-title" style="color: ${landingConfig.aboutTitleColor};">${landingConfig.aboutTitle}</h2>
                <p class="lp-about-description" style="color: ${landingConfig.aboutTextColor};">${landingConfig.aboutDescription}</p>
            </div>
            ${aboutImageHTML}
        </section>
    ` : '';
    
    // Projects Section
    const projectsHTML = landingConfig.projects.map(project => {
        const projectImage = project.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23e5e7eb" width="400" height="200"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="20" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ESem Imagem%3C/text%3E%3C/svg%3E';
        const projectDescription = project.description ? `<p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 0.5rem;">${project.description}</p>` : '';
        const projectPrice = project.price ? `<p style="color: #10b981; font-size: 1.25rem; font-weight: bold; margin-bottom: 0.5rem;">${project.price}</p>` : '';
        
        return `
            <div class="lp-project-card">
                <img src="${projectImage}" alt="${project.title}" class="lp-project-image">
                <div class="lp-project-info" style="flex-direction: column; align-items: flex-start;">
                    <strong>${project.title}</strong>
                    ${projectDescription}
                    ${projectPrice}
                    <button class="lp-project-button" style="background-color: ${project.buttonColor}; color: white; margin-top: 0.75rem;" onclick="window.location.href='${project.link}'">
                        ${project.buttonText}
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    const projectsDescriptionHTML = landingConfig.projectsDescription
        ? `<p style="text-align: center; color: ${landingConfig.projectsDescriptionColor}; margin-bottom: 2rem; font-size: 1.125rem;">${landingConfig.projectsDescription}</p>`
        : '';
    
    const projectsSectionHTML = landingConfig.showProjects === 'true' ? `
        <section class="lp-projects" style="background-color: ${landingConfig.projectsBackgroundColor};">
            <h2 class="lp-projects-title" style="color: ${landingConfig.projectsTitleColor};">${landingConfig.projectsTitle}</h2>
            ${projectsDescriptionHTML}
            <div class="lp-projects-grid">
                ${projectsHTML}
            </div>
        </section>
    ` : '';
    
    // Footer
    const footerContactHTML = (landingConfig.footerEmail || landingConfig.footerPhone || landingConfig.footerAddress)
        ? `<div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1rem; color: ${landingConfig.footerTextColor}; opacity: 0.9; font-size: 0.875rem;">
            ${landingConfig.footerEmail ? `<p>📧 ${landingConfig.footerEmail}</p>` : ''}
            ${landingConfig.footerPhone ? `<p>📞 ${landingConfig.footerPhone}</p>` : ''}
            ${landingConfig.footerAddress ? `<p>📍 ${landingConfig.footerAddress}</p>` : ''}
        </div>`
        : '';
    
    const footerDescriptionHTML = landingConfig.footerDescription
        ? `<p style="color: ${landingConfig.footerTextColor}; opacity: 0.8; text-align: center; max-width: 600px; margin-bottom: 1rem;">${landingConfig.footerDescription}</p>`
        : '';
    
    // Social Links
    const socialLinksHTML = landingConfig.showSocialLinks === 'true' ? `
        <div class="lp-footer-icons">
            ${landingConfig.footerGithub && landingConfig.footerGithub !== '#' ? `
                <a href="${landingConfig.footerGithub}" class="lp-footer-icon">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                </a>
            ` : ''}
            ${landingConfig.footerTwitter && landingConfig.footerTwitter !== '#' ? `
                <a href="${landingConfig.footerTwitter}" class="lp-footer-icon">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                    </svg>
                </a>
            ` : ''}
            ${landingConfig.footerLinkedin && landingConfig.footerLinkedin !== '#' ? `
                <a href="${landingConfig.footerLinkedin}" class="lp-footer-icon">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                        <circle cx="4" cy="4" r="2"/>
                    </svg>
                </a>
            ` : ''}
            ${landingConfig.footerInstagram && landingConfig.footerInstagram !== '#' ? `
                <a href="${landingConfig.footerInstagram}" class="lp-footer-icon">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                </a>
            ` : ''}
        </div>
    ` : '';
    
    const html = `
        <header class="lp-header" style="background-color: ${landingConfig.headerBackgroundColor};">
            <div class="lp-logo-container">
                ${logoHTML}
                <span class="lp-brand">${landingConfig.brandName}</span>
            </div>
            ${menuHTML}
        </header>

        <section class="lp-hero" style="${heroBackground} min-height: ${landingConfig.heroMinHeight}; display: flex; ${heroSideImageHTML ? 'flex-direction: row;' : 'flex-direction: column;'} gap: 3rem;">
            <div class="lp-hero-content" style="${heroSideImageHTML ? 'flex: 1; text-align: left;' : ''}">
                <h1 class="lp-hero-title" style="color: ${landingConfig.heroTextColor};">${landingConfig.heroTitle}</h1>
                <p class="lp-hero-subtitle" style="color: ${landingConfig.heroTextColor};">${landingConfig.heroSubtitle}</p>
                ${heroDescriptionHTML}
                <div style="display: flex; gap: 1rem; ${heroSideImageHTML ? '' : 'justify-content: center;'} margin-top: 2rem;">
                    <a href="${landingConfig.heroButtonLink}">
                        <button class="lp-hero-button" style="background-color: ${landingConfig.heroButtonColor}; color: white;">
                            ${landingConfig.heroButtonText}
                        </button>
                    </a>
                    ${heroButton2HTML}
                </div>
            </div>
            ${heroSideImageHTML}
        </section>

        ${aboutSectionHTML}
        ${projectsSectionHTML}

        <footer class="lp-footer" style="background-color: ${landingConfig.footerBackgroundColor};">
            ${footerDescriptionHTML}
            ${socialLinksHTML}
            ${footerContactHTML}
            <p class="lp-footer-text" style="color: ${landingConfig.footerTextColor};">${landingConfig.footerText}</p>
        </footer>
    `;
    
    preview.innerHTML = html;
}

// Export HTML
function exportHTML() {
    const preview = document.getElementById('landingPreview');
    const css = `
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.5; }
            .lp-header { padding: 1.5rem 2rem; display: flex; align-items: center; justify-content: space-between; }
            .lp-logo-container { display: flex; align-items: center; gap: 0.75rem; }
            .lp-logo-box { width: 2.5rem; height: 2.5rem; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; }
            .lp-brand { color: white; font-weight: 600; font-size: 1.125rem; }
            .lp-menu a { color: white; text-decoration: none; transition: opacity 0.2s; }
            .lp-menu a:hover { opacity: 0.8; }
            .lp-hero { min-height: 60vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4rem 2rem; background-size: cover; background-position: center; }
            .lp-hero-content { text-align: center; max-width: 900px; }
            .lp-hero-title { color: white; font-size: 3rem; font-weight: bold; margin-bottom: 1rem; line-height: 1.2; }
            .lp-hero-subtitle { color: rgba(255, 255, 255, 0.9); font-size: 1.25rem; margin-bottom: 2rem; }
            .lp-hero-button { padding: 1rem 2rem; border: none; border-radius: 0.5rem; font-size: 1rem; font-weight: 600; cursor: pointer; transition: transform 0.2s; }
            .lp-hero-button:hover { transform: scale(1.05); }
            .lp-about { padding: 4rem 2rem; display: flex; align-items: center; justify-content: center; gap: 3rem; }
            .lp-about-content { flex: 1; max-width: 600px; }
            .lp-about-title { color: white; font-size: 2.5rem; margin-bottom: 1.5rem; }
            .lp-about-description { color: rgba(255, 255, 255, 0.9); line-height: 1.8; }
            .lp-about-image { flex: 1; max-width: 500px; }
            .lp-about-image img { width: 100%; border-radius: 0.75rem; }
            .lp-projects { background: white; padding: 4rem 2rem; }
            .lp-projects-title { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #232224; }
            .lp-projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; max-width: 1200px; margin: 0 auto; }
            .lp-project-card { background: white; border-radius: 0.75rem; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); transition: transform 0.2s; }
            .lp-project-card:hover { transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
            .lp-project-image { width: 100%; height: 200px; object-fit: cover; }
            .lp-project-info { padding: 1.5rem; display: flex; justify-content: space-between; align-items: center; }
            .lp-project-info strong { font-size: 1rem; color: #232224; }
            .lp-project-button { padding: 0.5rem 1rem; border: none; border-radius: 0.375rem; font-weight: 500; cursor: pointer; }
            .lp-footer { background: #06121E; padding: 2rem; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
            .lp-footer-icons { display: flex; gap: 1rem; }
            .lp-footer-icon { width: 2.5rem; height: 2.5rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: rgba(255, 255, 255, 0.1); color: white; transition: background 0.2s; text-decoration: none; }
            .lp-footer-icon:hover { background: rgba(255, 255, 255, 0.2); }
            .lp-footer-text { color: rgba(255, 255, 255, 0.7); text-align: center; font-size: 0.875rem; }
            .icon { width: 1.5rem; height: 1.5rem; }
            @media (max-width: 768px) {
                .lp-hero-title { font-size: 2rem; }
                .lp-about { flex-direction: column; }
                .lp-projects-grid { grid-template-columns: 1fr; }
            }
        </style>
    `;
    
    const fullHTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${landingConfig.brandName} - Landing Page</title>
    ${css}
</head>
<body>
    ${preview.innerHTML}
</body>
</html>`;
    
    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'landing-page.html';
    a.click();
    URL.revokeObjectURL(url);
    
    alert('HTML exportado com sucesso!');
}

// Save Page
function savePage() {
    localStorage.setItem('landingConfig', JSON.stringify(landingConfig));
    alert('Landing page salva com sucesso!');
}

// Load Page
function loadPage() {
    const saved = localStorage.getItem('landingConfig');
    if (saved) {
        const config = JSON.parse(saved);
        Object.assign(landingConfig, config);
        updateFormInputs();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadPage();
    if (document.getElementById('landingPreview')) {
        updateLandingPage();
    }
});

// Simple Login System (Demo Mode)
function demoLogin() {
    localStorage.setItem('userLoggedIn', 'true');
    localStorage.setItem('userName', 'Usuário Demo');
    localStorage.setItem('userEmail', 'demo@vozzy.com');
    console.log('✅ Login demo ativado!');
    return true;
}

// Check if logged in
function isUserLoggedIn() {
    return localStorage.getItem('userLoggedIn') === 'true';
}

// Auto-login for demo (remove this in production)
if (!isUserLoggedIn()) {
    console.log('🔓 Fazendo login automático para demo...');
    demoLogin();
}
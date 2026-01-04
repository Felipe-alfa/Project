/* ============================================
   CONFIGURAÇÃO DO EDITOR GRATUITO
   CARREGA ANTES DE TUDO
   ============================================ */

// 🎨 DEFINIR TEMPLATES GRATUITOS GLOBALMENTE
window.VIP_TEMPLATES = {
    startup: {
        name: 'Startup',
        path: './templates/free/startup/index.html',
        thumbnail: 'templates/free/startup/thumb.jpg',
        category: 'Negócios',
        description: 'Template moderno para startups e empresas de tecnologia',
        features: ['Hero Section', 'Features Grid', 'Call to Action']
    },
    business: {
        name: 'Business',
        path: './templates/free/business/index.html',
        thumbnail: 'templates/free/business/thumb.jpg',
        category: 'Corporativo',
        description: 'Template profissional para empresas e corporações',
        features: ['Header Fixo', 'Seções de Serviços', 'Formulário de Contato']
    },
    portfolio: {
        name: 'Portfolio',
        path: './templates/free/portfolio/index.html',
        thumbnail: 'templates/free/portfolio/thumb.jpg',
        category: 'Criativo',
        description: 'Template elegante para profissionais criativos',
        features: ['Portfolio Grid', 'Hero Minimalista', 'Seção de Contato']
    }
};

// 🔒 CONGELAR objeto para impedir modificações
Object.freeze(window.VIP_TEMPLATES);

console.log('%c🎯 TEMPLATES GRATUITOS DEFINIDOS', 'font-size: 14px; font-weight: bold; color: #10b981; background: #000; padding: 5px 10px;');
console.log('Templates disponíveis:', Object.keys(window.VIP_TEMPLATES));

// ⚠️ FLAG para indicar que é versão gratuita
window.IS_FREE_EDITOR = true;

// 🚫 BLOQUEAR qualquer tentativa de redefinir VIP_TEMPLATES
Object.defineProperty(window, 'VIP_TEMPLATES', {
    value: window.VIP_TEMPLATES,
    writable: false,
    configurable: false
});

console.log('✅ VIP_TEMPLATES congelado e protegido contra modificações');

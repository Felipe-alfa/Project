/* ============================================
   EDITOR GRATUITO - WRAPPER COMPLETO
   Carrega editor-vip.js + Aplica limitações
   ============================================ */

// ⚠️ VIP_TEMPLATES já foi definido no editor-free-config.js
// Aqui apenas aplicamos as limitações adicionais

console.log('%c⚠️ EDITOR GRATUITO - Wrapper carregado', 'font-size: 14px; font-weight: bold; color: #f59e0b;');

// ⚠️ LIMITAÇÕES DO PLANO GRATUITO
const FREE_LIMITATIONS = {
    maxExports: 2,
    watermarkRequired: true,
    limitedColorPalette: true,
    
    colorPalettes: {
        startup: ['#667eea', '#764ba2', '#ffffff', '#000000'],
        business: ['#4CAF50', '#2c3e50', '#ffffff', '#1a1a1a'],
        portfolio: ['#1a1a1a', '#667eea', '#ffffff', '#888888'],
        luxuryHotel: ['#C9A961', '#1a1a1a', '#ffffff', '#000000'],
        techStartup: ['#667eea', '#764ba2', '#ffffff', '#000000'],
        fashionBrand: ['#FF6B9D', '#1a1a1a', '#ffffff', '#000000'],
        medicalClinic: ['#00a6a6', '#1a1a1a', '#ffffff', '#000000'],
        financeApp: ['#667eea', '#1e3a8a', '#ffffff', '#000000'],
        realEstate: ['#C9A961', '#1a1a1a', '#ffffff', '#000000'],
        barbeiro: ['#C9A961', '#1a1a1a', '#ffffff', '#000000'],
        eletricista: ['#f59e0b', '#1a1a1a', '#ffffff', '#000000'],
        manicure: ['#FF6B9D', '#1a1a1a', '#ffffff', '#000000'],
        personal: ['#10b981', '#1a1a1a', '#ffffff', '#000000'],
        fotografo: ['#7c3aed', '#1a1a1a', '#ffffff', '#000000'],
        marmitas: ['#10b981', '#1a1a1a', '#ffffff', '#000000']
    }
};

// Verificar limite de exportações
function checkExportLimit() {
    const count = parseInt(localStorage.getItem('freeExportCount') || '0');
    
    if (count >= FREE_LIMITATIONS.maxExports) {
        alert('⚠️ LIMITE ATINGIDO!\n\n' +
              'Você já usou suas ' + FREE_LIMITATIONS.maxExports + ' exportações gratuitas.\n\n' +
              '✨ Upgrade para VIP para:\n' +
              '• Exportações ilimitadas\n' +
              '• Sem marca d\'água\n' +
              '• Todas as cores disponíveis\n' +
              '• 12 templates premium');
        
        if (confirm('Deseja fazer upgrade para VIP agora?')) {
            window.location.href = 'checkout.html';
        }
        
        return false;
    }
    
    return true;
}

// Incrementar contador de exportações
function incrementExportCount() {
    const count = parseInt(localStorage.getItem('freeExportCount') || '0');
    localStorage.setItem('freeExportCount', (count + 1).toString());
    
    const remaining = FREE_LIMITATIONS.maxExports - (count + 1);
    
    if (remaining > 0) {
        alert(`✅ Exportação concluída com sucesso!\n\n` +
              `📊 Você tem ${remaining} exportação(ões) restante(s).\n\n` +
              `💡 Upgrade para VIP para exportações ilimitadas!`);
    } else {
        alert('✅ Exportação concluída!\n\n' +
              '⚠️ Esta foi sua última exportação gratuita.\n\n' +
              '✨ Upgrade para VIP para continuar editando!');
        
        setTimeout(() => {
            if (confirm('Deseja fazer upgrade agora?')) {
                window.location.href = 'checkout.html';
            }
        }, 1000);
    }
}

// Adicionar marca d'água ao HTML exportado
function addWatermark(html) {
    const watermark = `
<!-- ⚠️ VERSÃO GRATUITA - MARCA D'ÁGUA OBRIGATÓRIA -->
<div id="vozzy-watermark" style="position: fixed; bottom: 10px; right: 10px; background: rgba(0,0,0,0.9); color: white; padding: 10px 16px; border-radius: 8px; font-size: 13px; z-index: 999999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
    Criado com ❤️ <strong style="color: #667eea;">Vozzy</strong> | 
    <a href="https://vozzy.com" target="_blank" style="color: #667eea; text-decoration: underline;">Faça o seu</a>
</div>`;
    
    // Adicionar antes do </body>
    return html.replace('</body>', watermark + '\n</body>');
}

// Override da função exportTemplate original
const originalExportTemplate = window.exportTemplate;

window.exportTemplate = async function() {
    console.log('🚀 Chamando exportação do Editor Gratuito...');
    console.log('📊 Status das funções:');
    console.log('  - exportTemplateGratuito:', typeof exportTemplateGratuito);
    console.log('  - JSZip:', typeof JSZip);
    console.log('  - EditorState:', typeof EditorState);
    
    // Verificar limite
    if (!checkExportLimit()) {
        console.warn('⚠️ Limite de exportações atingido');
        return;
    }
    
    console.log('✅ Limite OK. Prosseguindo com exportação...');
    
    // Chamar função de exportação do editor-advanced-features.js
    if (typeof exportTemplateGratuito === 'function') {
        console.log('✅ Função exportTemplateGratuito encontrada. Executando...');
        try {
            await exportTemplateGratuito();
            console.log('✅ Exportação concluída com sucesso!');
            incrementExportCount();
        } catch (error) {
            console.error('❌ Erro na exportação:', error);
            alert('❌ Erro ao exportar: ' + error.message);
        }
    } else if (typeof exportTemplate !== 'undefined' && exportTemplate !== window.exportTemplate) {
        // Fallback: chamar função original do editor-vip.js
        console.log('⚠️ Usando função de exportação do editor-vip.js');
        await originalExportTemplate();
        incrementExportCount();
    } else {
        console.error('❌ Funções disponíveis:', Object.keys(window).filter(k => k.includes('export')));
        alert('⚠️ Função de exportação não encontrada.\n\nVerifique se os arquivos foram carregados:\n• editor-vip.js\n• editor-advanced-features.js');
        console.error('❌ Nenhuma função de exportação disponível');
    }
};

// Override da função de preview
const originalPreviewTemplate = window.previewTemplate;

window.previewTemplate = function() {
    const iframe = document.getElementById('previewFrame');
    if (!iframe || !iframe.contentDocument) {
        alert('❌ Nenhum template carregado');
        return;
    }
    
    const doc = iframe.contentDocument;
    const bodyClone = doc.body.cloneNode(true);
    
    // Remover elementos do editor
    bodyClone.querySelectorAll('.editor-element-wrapper, .editor-overlay, .selected, .drag-handle, .drop-indicator').forEach(el => {
        el.remove();
    });
    
    // Remover estilos de edição
    bodyClone.querySelectorAll('[contenteditable]').forEach(el => {
        el.removeAttribute('contenteditable');
        el.style.outline = '';
        el.style.cursor = '';
    });
    
    // Capturar CSS
    let allStyles = '';
    doc.querySelectorAll('style').forEach(style => {
        allStyles += style.textContent + '\n';
    });
    
    doc.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
        allStyles += `@import url('${link.href}');\n`;
    });
    
    // Capturar JavaScript
    let allScripts = '';
    doc.querySelectorAll('script').forEach(script => {
        if (script.src && !script.src.includes('editor')) {
            allScripts += `<script src="${script.src}"></script>\n`;
        } else if (script.textContent.trim() && !script.textContent.includes('editor')) {
            allScripts += `<script>${script.textContent}</script>\n`;
        }
    });
    
    // HTML completo com marca d'água
    let previewHTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview - Vozzy</title>
    <style>${allStyles}</style>
</head>
<body>
${bodyClone.innerHTML}
${allScripts}
</body>
</html>`;
    
    // Adicionar marca d'água
    previewHTML = addWatermark(previewHTML);
    
    // Abrir em nova janela
    const previewWindow = window.open('', 'Preview - Vozzy', 'width=1200,height=800');
    
    if (previewWindow) {
        previewWindow.document.write(previewHTML);
        previewWindow.document.close();
    } else {
        alert('❌ Popup bloqueado. Permita popups para ver o preview.');
    }
};

// Limitar paleta de cores (aplicar após carregar template)
let colorLimitationAttempts = 0;
const MAX_COLOR_LIMITATION_ATTEMPTS = 10; // Máximo 10 tentativas (5 segundos)

function applyColorPaletteLimitation() {
    if (!FREE_LIMITATIONS.limitedColorPalette) {
        return;
    }
    
    // ⚠️ VERIFICAR SE EditorState EXISTE (carregado do editor-vip.js)
    if (typeof EditorState === 'undefined' || !EditorState.currentTemplate) {
        colorLimitationAttempts++;
        
        if (colorLimitationAttempts >= MAX_COLOR_LIMITATION_ATTEMPTS) {
            console.error('❌ EditorState não carregou após ' + MAX_COLOR_LIMITATION_ATTEMPTS + ' tentativas. Limitação de cores desabilitada.');
            return;
        }
        
        console.warn('EditorState não disponível ainda. Tentativa ' + colorLimitationAttempts + '/' + MAX_COLOR_LIMITATION_ATTEMPTS);
        setTimeout(applyColorPaletteLimitation, 500);
        return;
    }
    
    // Reset do contador de tentativas
    colorLimitationAttempts = 0;
    
    const template = EditorState.currentTemplate;
    const palette = FREE_LIMITATIONS.colorPalettes[template] || FREE_LIMITATIONS.colorPalettes.techStartup;
    
    // Substituir todos os color inputs por select
    document.querySelectorAll('input[type="color"].property-color').forEach(colorInput => {
        const select = document.createElement('select');
        select.className = 'property-input';
        select.style.width = '100%';
        select.style.padding = '0.625rem';
        
        // Adicionar opções de cores
        palette.forEach(color => {
            const option = document.createElement('option');
            option.value = color;
            option.textContent = color.toUpperCase();
            option.style.backgroundColor = color;
            option.style.color = color === '#ffffff' ? '#000' : '#fff';
            select.appendChild(option);
        });
        
        // Manter valor atual se estiver na paleta
        if (palette.includes(colorInput.value)) {
            select.value = colorInput.value;
        }
        
        // Copiar event listeners
        select.onchange = colorInput.onchange;
        
        // Substituir
        colorInput.parentNode.replaceChild(select, colorInput);
    });
    
    console.log('🎨 Paleta de cores limitada aplicada:', palette);
}

// Inicializar após carregar a página
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c💎 EDITOR GRATUITO CARREGADO', 'font-size: 16px; font-weight: bold; color: #667eea;');
    console.log('%c⚠️ Limitações ativas:', 'font-weight: bold; color: #f59e0b;');
    console.log('• Máximo ' + FREE_LIMITATIONS.maxExports + ' exportações');
    console.log('• Marca d\'água obrigatória');
    console.log('• Paleta de cores limitada');
    
    const exportCount = parseInt(localStorage.getItem('freeExportCount') || '0');
    const remaining = FREE_LIMITATIONS.maxExports - exportCount;
    
    if (remaining > 0) {
        console.log(`%c📊 Você tem ${remaining} exportação(ões) restante(s)`, 'color: #10b981; font-weight: bold;');
    } else {
        console.log('%c⚠️ Limite de exportações atingido', 'color: #ef4444; font-weight: bold;');
    }
    
    // Aplicar limitação de cores após template carregar
    setTimeout(applyColorPaletteLimitation, 2000);
});

// Mostrar contador no header
function updateExportCounter() {
    const exportCount = parseInt(localStorage.getItem('freeExportCount') || '0');
    const remaining = FREE_LIMITATIONS.maxExports - exportCount;
    
    // Procurar botão de exportar
    const exportBtn = document.querySelector('button[onclick*="export"]');
    if (exportBtn && remaining >= 0) {
        const counterBadge = document.createElement('span');
        counterBadge.style.cssText = `
            position: absolute;
            top: -8px;
            right: -8px;
            background: ${remaining > 0 ? '#10b981' : '#ef4444'};
            color: white;
            font-size: 11px;
            font-weight: bold;
            padding: 2px 6px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        `;
        counterBadge.textContent = remaining;
        
        exportBtn.style.position = 'relative';
        exportBtn.appendChild(counterBadge);
    }
}

// Atualizar contador quando a página carregar
window.addEventListener('load', () => {
    setTimeout(updateExportCounter, 1000);
});

console.log('✅ Wrapper do Editor Gratuito inicializado');
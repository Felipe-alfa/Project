/* ============================================
   FUNCIONALIDADES AVANÇADAS - EDITOR GRATUITO
   Copiadas do Editor VIP
   ============================================ */

// ✨ PREVIEW MELHORADO - Mostra edições reais
function previewTemplateGratuito() {
    const iframe = document.getElementById('previewFrame');
    if (!iframe || !iframe.contentDocument) {
        alert('❌ Nenhum template carregado');
        return;
    }
    
    const doc = iframe.contentDocument;
    const bodyClone = doc.body.cloneNode(true);
    
    // Remover elementos do editor
    bodyClone.querySelectorAll('.editor-element-wrapper, .editor-overlay, .selected').forEach(el => {
        el.classList.remove('editor-element-wrapper', 'editor-overlay', 'selected');
        el.style.border = '';
        el.style.outline = '';
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
        if (script.src) {
            allScripts += `<script src="${script.src}"></script>\n`;
        } else if (script.textContent.trim()) {
            allScripts += `<script>${script.textContent}</script>\n`;
        }
    });
    
    // HTML completo
    const previewHTML = `<!DOCTYPE html>
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

<!-- ⚠️ VERSÃO GRATUITA - Marca d'água obrigatória -->
<div style="position: fixed; bottom: 10px; right: 10px; background: rgba(0,0,0,0.8); color: white; padding: 8px 12px; border-radius: 6px; font-size: 12px; z-index: 999999;">
    Criado com ❤️ <strong>Vozzy</strong> | <a href="https://vozzy.com" target="_blank" style="color: #667eea; text-decoration: none;">Faça o seu</a>
</div>
</body>
</html>`;
    
    const previewWindow = window.open('', 'Preview - Vozzy', 'width=1200,height=800');
    
    if (previewWindow) {
        previewWindow.document.write(previewHTML);
        previewWindow.document.close();
        alert('✅ Preview aberto com suas edições!');
    } else {
        alert('❌ Popup bloqueado. Permita popups para ver o preview.');
    }
}

// ✨ EXPORTAÇÃO PROFISSIONAL .ZIP - Com marca d'água e limitações
async function exportTemplateGratuito() {
    const iframe = document.getElementById('previewFrame');
    if (!iframe || !iframe.contentDocument) {
        alert('❌ Nenhum template carregado');
        return;
    }
    
    // VERIFICAR LIMITE DE EDIÇÕES
    const editCount = parseInt(localStorage.getItem('freeEditCount') || '0');
    if (editCount >= 2) {
        alert('⚠️ LIMITE ATINGIDO!\n\nVocê já atingiu o limite de 2 edições gratuitas.\n\nUpgrade para VIP para edições ilimitadas!');
        if (confirm('Deseja fazer upgrade para VIP agora?')) {
            window.location.href = 'checkout.html';
        }
        return;
    }
    
    alert('📦 Preparando exportação...');
    
    try {
        const doc = iframe.contentDocument;
        const zip = new JSZip();
        
        const bodyClone = doc.body.cloneNode(true);
        bodyClone.querySelectorAll('.editor-element-wrapper, .editor-overlay, .selected').forEach(el => {
            el.classList.remove('editor-element-wrapper', 'editor-overlay', 'selected');
            el.style.border = '';
            el.style.outline = '';
        });
        
        const bodyHTML = bodyClone.innerHTML;
        
        // Coletar CSS
        let allCSS = `/* Template Vozzy - Versão Gratuita */\n\n`;
        doc.querySelectorAll('style').forEach(style => {
            allCSS += style.textContent + '\n\n';
        });
        
        const linkElements = doc.querySelectorAll('link[rel="stylesheet"]');
        for (const link of linkElements) {
            try {
                const response = await fetch(link.href);
                const css = await response.text();
                allCSS += `/* ${link.href} */\n` + css + '\n\n';
            } catch (e) {
                allCSS += `@import url('${link.href}');\n\n`;
            }
        }
        
        // Coletar JavaScript
        let allJS = `/* Template Vozzy - Versão Gratuita */\n\n`;
        doc.querySelectorAll('script:not([src])').forEach(script => {
            if (script.textContent.trim() && !script.textContent.includes('editor')) {
                allJS += script.textContent + '\n\n';
            }
        });
        
        // Scripts externos
        const externalScripts = [];
        doc.querySelectorAll('script[src]').forEach(script => {
            if (!script.src.includes('editor')) {
                externalScripts.push(script.src);
            }
        });
        
        // Processar imagens
        const images = doc.querySelectorAll('img');
        const assetsFolder = zip.folder('assets');
        const imageMap = {};
        
        for (let i = 0; i < images.length; i++) {
            const img = images[i];
            const src = img.src;
            if (imageMap[src]) continue;
            
            try {
                if (src.startsWith('data:')) {
                    const base64Data = src.split(',')[1];
                    const ext = src.match(/data:image\/([a-z]+);/)?.[1] || 'png';
                    const filename = `image-${i + 1}.${ext}`;
                    assetsFolder.file(filename, base64Data, {base64: true});
                    imageMap[src] = `./assets/${filename}`;
                } else if (src.startsWith('http')) {
                    try {
                        const response = await fetch(src);
                        const blob = await response.blob();
                        const ext = src.split('.').pop().split('?')[0] || 'jpg';
                        const filename = `image-${i + 1}.${ext}`;
                        assetsFolder.file(filename, blob);
                        imageMap[src] = `./assets/${filename}`;
                    } catch (e) {
                        imageMap[src] = src;
                    }
                }
            } catch (e) {
                imageMap[src] = src;
            }
        }
        
        // Atualizar caminhos
        let finalHTML = bodyHTML;
        for (const [oldSrc, newSrc] of Object.entries(imageMap)) {
            finalHTML = finalHTML.replaceAll(oldSrc, newSrc);
        }
        
        // ⚠️ ADICIONAR MARCA D'ÁGUA OBRIGATÓRIA (Versão Gratuita)
        const watermarkHTML = `
<!-- ⚠️ MARCA D'ÁGUA - VERSÃO GRATUITA -->
<div id="vozzy-watermark" style="position: fixed; bottom: 10px; right: 10px; background: rgba(0,0,0,0.8); color: white; padding: 8px 12px; border-radius: 6px; font-size: 12px; z-index: 999999; font-family: Arial, sans-serif;">
    Criado com ❤️ <strong>Vozzy</strong> | <a href="https://vozzy.com" target="_blank" style="color: #667eea; text-decoration: none;">Faça o seu</a>
</div>`;
        
        const scriptTags = externalScripts.map(src => `    <script src="${src}"></script>`).join('\n');
        
        // HTML FINAL
        const finalDocument = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha Landing Page - Vozzy</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
${finalHTML}
${watermarkHTML}
    
    <!-- Scripts externos -->
${scriptTags}
    
    <!-- Script do template -->
    <script src="script.js"></script>
</body>
</html>`;
        
        // Adicionar arquivos
        zip.file('index.html', finalDocument);
        zip.file('style.css', allCSS);
        zip.file('script.js', allJS || '// Template Vozzy\nconsole.log("Template carregado!");');
        
        // README
        zip.file('README.txt', `Template Vozzy - Versão Gratuita

⚠️ ATENÇÃO - VERSÃO GRATUITA:
- Marca d'água "Vozzy" incluída (não remover)
- Limite de 2 edições
- Paleta de cores limitada

UPGRADE PARA VIP:
- Edições ilimitadas
- Sem marca d'água
- Todas as cores disponíveis
- 12 templates premium
- Suporte prioritário

👉 Faça upgrade: https://vozzy.com/checkout

COMO USAR:
1. Extraia todos os arquivos
2. Abra index.html em qualquer navegador
3. Para hospedar, faça upload de todos os arquivos

HOSPEDAGEM GRÁTIS:
- Netlify (netlify.com)
- Vercel (vercel.com)
- GitHub Pages (pages.github.com)

Criado com Vozzy - Editor de Landing Pages
`);
        
        // Gerar ZIP
        const zipBlob = await zip.generateAsync({
            type: 'blob',
            compression: 'DEFLATE',
            compressionOptions: { level: 9 }
        });
        
        const url = URL.createObjectURL(zipBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `minha-landing-vozzy.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // INCREMENTAR CONTADOR DE EDIÇÕES
        localStorage.setItem('freeEditCount', (editCount + 1).toString());
        
        const remaining = 2 - (editCount + 1);
        if (remaining > 0) {
            alert(`✅ Exportação completa!\n\n⚠️ Você tem ${remaining} edição(ões) gratuita(s) restante(s).\n\nUpgrade para VIP para edições ilimitadas!`);
        } else {
            alert('✅ Exportação completa!\n\n⚠️ Esta foi sua última edição gratuita.\n\nUpgrade para VIP para continuar editando!');
            if (confirm('Deseja fazer upgrade agora?')) {
                window.location.href = 'checkout.html';
            }
        }
        
    } catch (error) {
        console.error('Erro na exportação:', error);
        alert('❌ Erro ao exportar: ' + error.message);
    }
}

// ✨ EDIÇÃO INLINE - Double-click para editar
function enableInlineEditingGratuito(doc) {
    const editableSelectors = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'button', 'li'];
    
    editableSelectors.forEach(selector => {
        const elements = doc.querySelectorAll(selector);
        elements.forEach(el => {
            if (el.closest('script, style, head')) return;
            
            el.setAttribute('contenteditable', 'true');
            el.style.cursor = 'text';
            
            // Double-click para editar
            el.addEventListener('dblclick', function(e) {
                e.stopPropagation();
                this.focus();
                const range = doc.createRange();
                range.selectNodeContents(this);
                const sel = doc.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            });
            
            // Hover
            el.addEventListener('mouseenter', function() {
                this.style.outline = '2px dashed #667eea';
                this.style.outlineOffset = '2px';
                this.title = '🖱️ Clique | ✏️ Duplo-clique para editar';
            });
            
            el.addEventListener('mouseleave', function() {
                this.style.outline = '';
                this.style.outlineOffset = '';
                this.title = '';
            });
            
            // ESC para sair
            el.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    this.blur();
                }
            });
        });
    });
}

// ✨ ATALHOS DE TECLADO
function setupKeyboardShortcutsGratuito() {
    document.addEventListener('keydown', function(e) {
        // Ctrl+S = Salvar
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            if (typeof saveTemplate === 'function') {
                saveTemplate();
            }
        }
    });
}

// Inicializar funcionalidades avançadas
if (typeof initializeEditor !== 'undefined') {
    const originalInit = initializeEditor;
    initializeEditor = function() {
        originalInit.apply(this, arguments);
        
        // Aguardar carregamento e ativar funções
        setTimeout(() => {
            const iframe = document.getElementById('previewFrame');
            if (iframe && iframe.contentDocument) {
                enableInlineEditingGratuito(iframe.contentDocument);
            }
            setupKeyboardShortcutsGratuito();
        }, 1000);
    };
}

console.log('%c✨ Funcionalidades Avançadas Carregadas!', 'font-size: 14px; font-weight: bold; color: #667eea;');
console.log('%c- Preview Melhorado ✅', 'color: #10b981;');
console.log('%c- Exportação .ZIP Profissional ✅', 'color: #10b981;');
console.log('%c- Edição Inline (Double-click) ✅', 'color: #10b981;');
console.log('%c- Atalhos de Teclado ✅', 'color: #10b981;');

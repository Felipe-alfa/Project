/* ============================================
   PAINEL DE PROPRIEDADES MELHORADO
   Editor Vozzy - Versão Completa
   ============================================ */

// Sobrescrever função existente com versão melhorada
window.showElementPropertiesEnhanced = function(element) {
    const propertiesContent = document.getElementById('propertiesContent');
    if (!propertiesContent) return;
    
    const tagName = element.tagName.toLowerCase();
    const styles = window.getComputedStyle(element);
    
    let html = '';
    
    // ========== CABEÇALHO DO ELEMENTO ==========
    html += `
        <div class="property-group">
            <div class="property-group-title">✨ Elemento Selecionado</div>
            <div style="padding: 1rem; background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1)); border-radius: 10px; margin-bottom: 1rem; text-align: center;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">${getElementIcon(element)}</div>
                <strong style="color: #667eea; font-size: 1.125rem;">${tagName.toUpperCase()}</strong>
                <div style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;">${getFriendlyName(element)}</div>
            </div>
        </div>
    `;
    
    // ========== EDIÇÃO DE TEXTO ==========
    if (element.textContent && !element.querySelector('img, video, iframe')) {
        const textContent = element.textContent.trim();
        if (textContent.length > 0) {
            html += `
                <div class="property-group">
                    <div class="property-group-title">📝 Conteúdo de Texto</div>
                    <div class="property-item">
                        <label class="property-label">Texto</label>
                        <textarea class="property-textarea" rows="4" oninput="updateElementText(this.value)" placeholder="Digite o texto...">${textContent}</textarea>
                        <small style="color: var(--text-muted); font-size: 0.75rem; margin-top: 0.25rem; display: block;">💡 Duplo-clique no elemento para edição inline</small>
                    </div>
                </div>
            `;
        }
    }
    
    // ========== EDIÇÃO DE IMAGEM ==========
    if (tagName === 'img') {
        html += `
            <div class="property-group">
                <div class="property-group-title">🖼️ Configurações de Imagem</div>
                <div class="property-item">
                    <label class="property-label">URL da Imagem</label>
                    <input type="url" class="property-input" value="${element.src || ''}" onchange="updateElementAttribute('src', this.value)" placeholder="https://exemplo.com/imagem.jpg">
                </div>
                <div class="property-item">
                    <label class="property-label">Texto Alternativo (ALT)</label>
                    <input type="text" class="property-input" value="${element.alt || ''}" onchange="updateElementAttribute('alt', this.value)" placeholder="Descrição da imagem">
                </div>
            </div>
        `;
    }
    
    // ========== EDIÇÃO DE LINK ==========
    if (tagName === 'a') {
        html += `
            <div class="property-group">
                <div class="property-group-title">🔗 Configurações de Link</div>
                <div class="property-item">
                    <label class="property-label">URL de Destino</label>
                    <input type="url" class="property-input" value="${element.href || ''}" onchange="updateElementAttribute('href', this.value)" placeholder="https://exemplo.com">
                </div>
                <div class="property-item">
                    <label class="property-label">Abrir em</label>
                    <select class="property-select" onchange="updateElementAttribute('target', this.value)">
                        <option value="" ${!element.target ? 'selected' : ''}>Mesma aba</option>
                        <option value="_blank" ${element.target === '_blank' ? 'selected' : ''}>Nova aba</option>
                    </select>
                </div>
            </div>
        `;
    }
    
    // ========== CORES ==========
    html += `
        <div class="property-group">
            <div class="property-group-title">🎨 Cores</div>
            <div class="property-item">
                <label class="property-label">Cor do Texto</label>
                <input type="color" class="property-input property-color" value="${rgbToHex(styles.color)}" onchange="updateElementStyle('color', this.value)">
            </div>
            <div class="property-item">
                <label class="property-label">Cor de Fundo</label>
                <input type="color" class="property-input property-color" value="${rgbToHex(styles.backgroundColor)}" onchange="updateElementStyle('backgroundColor', this.value)">
            </div>
        </div>
    `;
    
    // ========== TIPOGRAFIA (apenas para elementos de texto) ==========
    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'button', 'li'].includes(tagName)) {
        html += `
            <div class="property-group">
                <div class="property-group-title">✍️ Tipografia</div>
                <div class="property-item">
                    <label class="property-label">Tamanho da Fonte (${parseInt(styles.fontSize)}px)</label>
                    <input type="range" class="property-range" min="8" max="72" value="${parseInt(styles.fontSize)}" oninput="updateElementStyle('fontSize', this.value + 'px'); this.previousElementSibling.innerHTML = 'Tamanho da Fonte (' + this.value + 'px)';">
                </div>
                <div class="property-item">
                    <label class="property-label">Peso da Fonte</label>
                    <select class="property-select" onchange="updateElementStyle('fontWeight', this.value)">
                        <option value="300" ${styles.fontWeight === '300' ? 'selected' : ''}>Light (300)</option>
                        <option value="400" ${styles.fontWeight === '400' ? 'selected' : ''}>Normal (400)</option>
                        <option value="600" ${styles.fontWeight === '600' ? 'selected' : ''}>SemiBold (600)</option>
                        <option value="700" ${styles.fontWeight === '700' ? 'selected' : ''}>Bold (700)</option>
                    </select>
                </div>
                <div class="property-item">
                    <label class="property-label">Alinhamento</label>
                    <div class="property-grid" style="grid-template-columns: repeat(3, 1fr);">
                        <button class="property-button secondary" onclick="updateElementStyle('textAlign', 'left')" title="Esquerda">◀</button>
                        <button class="property-button secondary" onclick="updateElementStyle('textAlign', 'center')" title="Centro">▣</button>
                        <button class="property-button secondary" onclick="updateElementStyle('textAlign', 'right')" title="Direita">▶</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    // ========== ESPAÇAMENTO ==========
    html += `
        <div class="property-group">
            <div class="property-group-title">📏 Espaçamento</div>
            <div class="property-grid">
                <div class="property-item">
                    <label class="property-label">Padding</label>
                    <input type="number" class="property-input" value="${parseInt(styles.padding) || 0}" onchange="updateElementStyle('padding', this.value + 'px')" min="0" max="100" step="4">
                </div>
                <div class="property-item">
                    <label class="property-label">Margin</label>
                    <input type="number" class="property-input" value="${parseInt(styles.margin) || 0}" onchange="updateElementStyle('margin', this.value + 'px')" min="0" max="100" step="4">
                </div>
            </div>
        </div>
    `;
    
    // ========== BORDAS E CANTOS ==========
    html += `
        <div class="property-group">
            <div class="property-group-title">🔲 Bordas e Cantos</div>
            <div class="property-item">
                <label class="property-label">Espessura da Borda (${parseInt(styles.borderWidth) || 0}px)</label>
                <input type="range" class="property-range" min="0" max="10" value="${parseInt(styles.borderWidth) || 0}" oninput="updateElementStyle('borderWidth', this.value + 'px'); updateElementStyle('borderStyle', this.value > 0 ? 'solid' : 'none'); this.previousElementSibling.innerHTML = 'Espessura da Borda (' + this.value + 'px)';">
            </div>
            <div class="property-item">
                <label class="property-label">Arredondamento (${parseInt(styles.borderRadius) || 0}px)</label>
                <input type="range" class="property-range" min="0" max="50" value="${parseInt(styles.borderRadius) || 0}" oninput="updateElementStyle('borderRadius', this.value + 'px'); this.previousElementSibling.innerHTML = 'Arredondamento (' + this.value + 'px)';">
            </div>
            ${parseInt(styles.borderWidth) > 0 ? `
            <div class="property-item">
                <label class="property-label">Cor da Borda</label>
                <input type="color" class="property-input property-color" value="${rgbToHex(styles.borderColor)}" onchange="updateElementStyle('borderColor', this.value)">
            </div>
            ` : ''}
        </div>
    `;
    
    // ========== AÇÕES RÁPIDAS ==========
    html += `
        <div class="property-group">
            <div class="property-group-title">⚡ Ações Rápidas</div>
            <div class="property-grid">
                <button class="property-button secondary" onclick="duplicateSelectedElement()" title="Duplicar elemento">
                    📋 Duplicar
                </button>
                <button class="property-button secondary" onclick="deleteSelectedElement()" title="Remover elemento" style="color: #ef4444; border-color: #ef4444;">
                    🗑️ Deletar
                </button>
            </div>
        </div>
    `;
    
    propertiesContent.innerHTML = html;
};

// Função auxiliar para atributos
window.updateElementAttribute = function(attr, value) {
    if (window.EditorState && window.EditorState.selectedElement) {
        window.EditorState.selectedElement.setAttribute(attr, value);
        window.EditorState.isDirty = true;
        if (window.HistoryManager) {
            window.HistoryManager.saveState();
        }
        showSuccess(`✅ ${attr} atualizado!`);
    }
};

// Substituir função original após DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar 500ms para garantir que editor-vip.js carregou
    setTimeout(() => {
        if (typeof showElementProperties !== 'undefined') {
            window.showElementProperties = window.showElementPropertiesEnhanced;
            console.log('✨ Painel de Propriedades Melhorado ativado!');
        }
    }, 500);
});

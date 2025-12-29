// Settings Page JavaScript

// Show section based on navigation
function showSection(sectionId) {
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');

    // Update title
    const titles = {
        'perfil': 'Perfil',
        'conta': 'Conta',
        'assinatura': 'Assinatura / Plano',
        'pagamentos': 'Pagamentos',
        'minhas-paginas': 'Minhas Landing Pages',
        'templates': 'Templates',
        'notificacoes': 'Notificações',
        'preferencias': 'Preferências',
        'aparencia': 'Aparência',
        'seguranca': 'Segurança',
        'privacidade': 'Privacidade',
        'integracoes': 'Integrações',
        'ajuda': 'Ajuda / Suporte',
        'sobre': 'Sobre a Plataforma'
    };
    
    document.getElementById('sectionTitle').textContent = titles[sectionId] || 'Configurações';

    // Update content
    const contentArea = document.getElementById('contentArea');
    contentArea.innerHTML = getContent(sectionId);

    // Prevent default anchor behavior
    event.preventDefault();
}

// Get content for each section
function getContent(sectionId) {
    const contents = {
        'perfil': `
            <div class="settings-card">
                <h2>Informações do Perfil</h2>
                
                <div class="avatar-upload">
                    <div class="avatar-preview">JD</div>
                    <div class="avatar-actions">
                        <button class="btn btn-secondary btn-small">Alterar Foto</button>
                        <button class="btn btn-secondary btn-small">Remover</button>
                    </div>
                </div>

                <div class="form-group">
                    <label>Nome Completo</label>
                    <input type="text" value="João da Silva" placeholder="Seu nome completo">
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" value="joao@exemplo.com" placeholder="seu@email.com">
                    <small>Seu email principal para login e notificações</small>
                </div>

                <div class="form-group">
                    <label>Telefone</label>
                    <input type="tel" value="(11) 99999-9999" placeholder="(00) 00000-0000">
                </div>

                <div class="form-group">
                    <label>Bio</label>
                    <textarea placeholder="Conte um pouco sobre você...">Designer e desenvolvedor apaixonado por criar experiências digitais incríveis.</textarea>
                </div>

                <div class="form-group">
                    <label>Tipo de Conta</label>
                    <select>
                        <option>Profissional</option>
                        <option>Empresa</option>
                        <option>Freelancer</option>
                        <option>Agência</option>
                    </select>
                </div>

                <button class="btn btn-primary">Salvar Alterações</button>
            </div>
        `,

        'conta': `
            <div class="settings-card">
                <h2>Informações da Conta</h2>
                
                <div class="alert alert-info">
                    <strong>Conta Ativa</strong> - Sua conta está em bom estado e todos os serviços estão funcionando normalmente.
                </div>

                <div class="form-group">
                    <label>ID da Conta</label>
                    <input type="text" value="LD-2024-8473" readonly>
                </div>

                <div class="form-group">
                    <label>Data de Criação</label>
                    <input type="text" value="15 de Janeiro, 2024" readonly>
                </div>

                <div class="form-group">
                    <label>Última Atividade</label>
                    <input type="text" value="Hoje, 14:35" readonly>
                </div>

                <div class="form-group">
                    <label>Status da Conta</label>
                    <input type="text" value="✅ Ativa e Verificada" readonly>
                </div>
            </div>

            <div class="settings-card">
                <h2>Zona de Perigo</h2>
                <div class="alert alert-danger">
                    <strong>Atenção!</strong> Esta ação não pode ser desfeita. Todos os seus dados serão permanentemente excluídos.
                </div>
                <button class="btn btn-danger">Excluir Conta Permanentemente</button>
            </div>
        `,

        'assinatura': `
            <div class="settings-card">
                <h2>Plano Atual</h2>
                
                <div class="plan-card active">
                    <div class="plan-header">
                        <span class="plan-name">Plano Pro</span>
                        <span class="plan-badge">Ativo</span>
                    </div>
                    <div class="plan-price">R$ 29<span style="font-size: 1rem; color: #718096;">/mês</span></div>
                    <ul class="plan-features">
                        <li>Até 3 landing pages ativas</li>
                        <li>Templates premium</li>
                        <li>Sem marca da plataforma</li>
                        <li>Integração WhatsApp</li>
                        <li>Suporte prioritário</li>
                    </ul>
                    <p style="color: #718096; font-size: 0.875rem;">Próxima cobrança: 21 de Janeiro, 2025</p>
                </div>

                <button class="btn btn-primary">Alterar Plano</button>
                <button class="btn btn-secondary" style="margin-left: 0.5rem;">Cancelar Assinatura</button>
            </div>

            <div class="settings-card">
                <h2>Histórico de Pagamentos</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="border-bottom: 2px solid #e2e8f0;">
                            <th style="padding: 0.75rem; text-align: left;">Data</th>
                            <th style="padding: 0.75rem; text-align: left;">Descrição</th>
                            <th style="padding: 0.75rem; text-align: left;">Valor</th>
                            <th style="padding: 0.75rem; text-align: left;">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 0.75rem;">21/12/2024</td>
                            <td style="padding: 0.75rem;">Plano Pro - Mensal</td>
                            <td style="padding: 0.75rem;">R$ 29,00</td>
                            <td style="padding: 0.75rem; color: #48bb78;">✓ Pago</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 0.75rem;">21/11/2024</td>
                            <td style="padding: 0.75rem;">Plano Pro - Mensal</td>
                            <td style="padding: 0.75rem;">R$ 29,00</td>
                            <td style="padding: 0.75rem; color: #48bb78;">✓ Pago</td>
                        </tr>
                        <tr>
                            <td style="padding: 0.75rem;">21/10/2024</td>
                            <td style="padding: 0.75rem;">Plano Pro - Mensal</td>
                            <td style="padding: 0.75rem;">R$ 29,00</td>
                            <td style="padding: 0.75rem; color: #48bb78;">✓ Pago</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `,

        'pagamentos': `
            <div class="settings-card">
                <h2>Métodos de Pagamento</h2>
                
                <div class="payment-method">
                    <div class="payment-method-info">
                        <div class="payment-icon">💳</div>
                        <div>
                            <div style="font-weight: 600;">Visa •••• 4242</div>
                            <div style="font-size: 0.875rem; color: #718096;">Expira em 12/2026</div>
                        </div>
                    </div>
                    <div class="payment-actions">
                        <button class="btn btn-secondary btn-small">Editar</button>
                        <button class="btn btn-danger btn-small">Remover</button>
                    </div>
                </div>

                <div class="payment-method">
                    <div class="payment-method-info">
                        <div class="payment-icon">📱</div>
                        <div>
                            <div style="font-weight: 600;">PIX</div>
                            <div style="font-size: 0.875rem; color: #718096;">joao@exemplo.com</div>
                        </div>
                    </div>
                    <div class="payment-actions">
                        <button class="btn btn-secondary btn-small">Editar</button>
                        <button class="btn btn-danger btn-small">Remover</button>
                    </div>
                </div>

                <button class="btn btn-primary" style="margin-top: 1rem;">+ Adicionar Método de Pagamento</button>
            </div>

            <div class="settings-card">
                <h2>Histórico de Cobranças</h2>
                <p style="color: #718096; margin-bottom: 1rem;">Últimas transações realizadas</p>
                
                <div style="border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 1rem; margin-bottom: 0.75rem;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <strong>Plano Pro - Dezembro 2024</strong>
                        <strong>R$ 29,00</strong>
                    </div>
                    <div style="font-size: 0.875rem; color: #718096;">21/12/2024 • Visa •••• 4242 • ✓ Aprovado</div>
                </div>

                <div style="border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 1rem; margin-bottom: 0.75rem;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <strong>Template VIP - Luxury Hotel</strong>
                        <strong>R$ 10,00</strong>
                    </div>
                    <div style="font-size: 0.875rem; color: #718096;">15/12/2024 • PIX • ✓ Aprovado</div>
                </div>

                <div style="border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 1rem;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <strong>Plano Pro - Novembro 2024</strong>
                        <strong>R$ 29,00</strong>
                    </div>
                    <div style="font-size: 0.875rem; color: #718096;">21/11/2024 • Visa •••• 4242 • ✓ Aprovado</div>
                </div>
            </div>
        `,

        'minhas-paginas': `
            <div class="settings-card">
                <h2>Suas Landing Pages</h2>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-label">Total de Páginas</div>
                        <div class="stat-value">8</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Páginas Ativas</div>
                        <div class="stat-value">3</div>
                    </div>
                    <div class="stat-label">Visitantes (mês)</div>
                        <div class="stat-value">1,247</div>
                    </div>
                </div>

                <div style="margin-bottom: 1rem;">
                    <button class="btn btn-primary">+ Nova Landing Page</button>
                </div>

                <div class="page-list">
                    <div class="page-item">
                        <div class="page-preview"></div>
                        <div class="page-info">
                            <div class="page-title">Portfolio Criativo</div>
                            <div class="page-meta">Criado em 10/12/2024</div>
                            <div class="page-meta" style="color: #48bb78;">● Ativa</div>
                        </div>
                    </div>

                    <div class="page-item">
                        <div class="page-preview" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);"></div>
                        <div class="page-info">
                            <div class="page-title">Agência Digital</div>
                            <div class="page-meta">Criado em 05/12/2024</div>
                            <div class="page-meta" style="color: #48bb78;">● Ativa</div>
                        </div>
                    </div>

                    <div class="page-item">
                        <div class="page-preview" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);"></div>
                        <div class="page-info">
                            <div class="page-title">E-commerce Fashion</div>
                            <div class="page-meta">Criado em 01/12/2024</div>
                            <div class="page-meta" style="color: #48bb78;">● Ativa</div>
                        </div>
                    </div>
                </div>
            </div>
        `,

        'templates': `
            <div class="settings-card">
                <h2>Meus Templates</h2>
                
                <div class="alert alert-info">
                    Você possui <strong>6 templates VIP</strong> e acesso a todos os templates gratuitos.
                </div>

                <h3>Templates VIP Adquiridos</h3>
                <div class="template-grid">
                    <div class="template-item">
                        <div class="template-preview" style="background: linear-gradient(135deg, #d4af37 0%, #f9d423 100%);"></div>
                        <div class="template-name">Luxury Hotel</div>
                    </div>
                    <div class="template-item">
                        <div class="template-preview" style="background: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);"></div>
                        <div class="template-name">Tech Startup</div>
                    </div>
                    <div class="template-item">
                        <div class="template-preview" style="background: linear-gradient(135deg, #ffc3a0 0%, #ffafbd 100%);"></div>
                        <div class="template-name">Fashion Elite</div>
                    </div>
                </div>

                <button class="btn btn-primary" style="margin-top: 1.5rem;">Comprar Mais Templates VIP</button>
            </div>
        `,

        'notificacoes': `
            <div class="settings-card">
                <h2>Preferências de Notificações</h2>
                
                <h3>Notificações por Email</h3>
                <div class="toggle-container">
                    <div class="toggle-info">
                        <h4>Novidades e Atualizações</h4>
                        <p>Receba informações sobre novos recursos e melhorias</p>
                    </div>
                    <div class="toggle-switch active" onclick="toggleSwitch(this)"></div>
                </div>

                <div class="toggle-container">
                    <div class="toggle-info">
                        <h4>Dicas e Tutoriais</h4>
                        <p>Aprenda a usar melhor a plataforma</p>
                    </div>
                    <div class="toggle-switch active" onclick="toggleSwitch(this)"></div>
                </div>

                <div class="toggle-container">
                    <div class="toggle-info">
                        <h4>Ofertas Especiais</h4>
                        <p>Receba promoções e descontos exclusivos</p>
                    </div>
                    <div class="toggle-switch" onclick="toggleSwitch(this)"></div>
                </div>

                <h3 style="margin-top: 2rem;">Notificações do Sistema</h3>
                <div class="toggle-container">
                    <div class="toggle-info">
                        <h4>Alertas de Pagamento</h4>
                        <p>Avisos sobre cobranças e renovações</p>
                    </div>
                    <div class="toggle-switch active" onclick="toggleSwitch(this)"></div>
                </div>

                <div class="toggle-container">
                    <div class="toggle-info">
                        <h4>Relatórios de Performance</h4>
                        <p>Estatísticas semanais das suas páginas</p>
                    </div>
                    <div class="toggle-switch active" onclick="toggleSwitch(this)"></div>
                </div>

                <div class="toggle-container">
                    <div class="toggle-info">
                        <h4>Atividades de Segurança</h4>
                        <p>Notificações sobre login e alterações na conta</p>
                    </div>
                    <div class="toggle-switch active" onclick="toggleSwitch(this)"></div>
                </div>
            </div>
        `,

        'preferencias': `
            <div class="settings-card">
                <h2>Preferências do Sistema</h2>
                
                <div class="form-group">
                    <label>Idioma da Interface</label>
                    <select>
                        <option selected>Português (Brasil)</option>
                        <option>English (US)</option>
                        <option>Español</option>
                        <option>Français</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Fuso Horário</label>
                    <select>
                        <option selected>São Paulo (GMT-3)</option>
                        <option>Rio de Janeiro (GMT-3)</option>
                        <option>Brasília (GMT-3)</option>
                        <option>Manaus (GMT-4)</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Formato de Data</label>
                    <select>
                        <option selected>DD/MM/AAAA</option>
                        <option>MM/DD/AAAA</option>
                        <option>AAAA-MM-DD</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Moeda Padrão</label>
                    <select>
                        <option selected>Real (R$)</option>
                        <option>Dólar (US$)</option>
                        <option>Euro (€)</option>
                    </select>
                </div>

                <button class="btn btn-primary">Salvar Preferências</button>
            </div>
        `,

        'aparencia': `
            <div class="settings-card">
                <h2>Modo de Exibição</h2>
                
                <div class="toggle-container">
                    <div class="toggle-info">
                        <h4>Modo Noturno</h4>
                        <p>Ative o tema escuro para reduzir o cansaço visual</p>
                    </div>
                    <div class="toggle-switch" onclick="toggleSwitch(this); toggleDarkMode()"></div>
                </div>

                <div class="form-group" style="margin-top: 2rem;">
                    <label>Tema de Cores</label>
                    <select>
                        <option selected>Padrão (Roxo)</option>
                        <option>Azul Oceano</option>
                        <option>Verde Floresta</option>
                        <option>Laranja Vibrante</option>
                        <option>Rosa Moderno</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Tamanho da Fonte</label>
                    <select>
                        <option>Pequeno</option>
                        <option selected>Médio</option>
                        <option>Grande</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Densidade da Interface</label>
                    <select>
                        <option>Compacta</option>
                        <option selected>Confortável</option>
                        <option>Espaçosa</option>
                    </select>
                </div>

                <button class="btn btn-primary">Aplicar Alterações</button>
            </div>
        `,

        'seguranca': `
            <div class="settings-card">
                <h2>Alterar Senha</h2>
                
                <div class="form-group">
                    <label>Senha Atual</label>
                    <input type="password" placeholder="••••••••">
                </div>

                <div class="form-group">
                    <label>Nova Senha</label>
                    <input type="password" placeholder="••••••••">
                </div>

                <div class="form-group">
                    <label>Confirmar Nova Senha</label>
                    <input type="password" placeholder="••••••••">
                </div>

                <button class="btn btn-primary">Atualizar Senha</button>
            </div>

            <div class="settings-card">
                <h2>Autenticação em Duas Etapas (2FA)</h2>
                
                <div class="alert alert-warning">
                    <strong>Recomendado!</strong> Adicione uma camada extra de segurança à sua conta.
                </div>

                <div class="toggle-container">
                    <div class="toggle-info">
                        <h4>Autenticação em Duas Etapas</h4>
                        <p>Exigir código de verificação ao fazer login</p>
                    </div>
                    <div class="toggle-switch" onclick="toggleSwitch(this)"></div>
                </div>
            </div>

            <div class="settings-card">
                <h2>Sessões Ativas</h2>
                
                <div style="border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 1rem; margin-bottom: 0.75rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong>💻 Chrome - Windows</strong>
                            <div style="font-size: 0.875rem; color: #718096;">São Paulo, Brasil • Agora</div>
                        </div>
                        <span style="color: #48bb78;">● Atual</span>
                    </div>
                </div>

                <div style="border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong>📱 Safari - iPhone</strong>
                            <div style="font-size: 0.875rem; color: #718096;">São Paulo, Brasil • 2 horas atrás</div>
                        </div>
                        <button class="btn btn-danger btn-small">Encerrar</button>
                    </div>
                </div>

                <button class="btn btn-danger" style="margin-top: 1rem;">Encerrar Todas as Sessões</button>
            </div>
        `,

        'privacidade': `
            <div class="settings-card">
                <h2>Configurações de Privacidade</h2>
                
                <div class="toggle-container">
                    <div class="toggle-info">
                        <h4>Perfil Público</h4>
                        <p>Permitir que outros usuários vejam seu perfil</p>
                    </div>
                    <div class="toggle-switch" onclick="toggleSwitch(this)"></div>
                </div>

                <div class="toggle-container">
                    <div class="toggle-info">
                        <h4>Mostrar Email no Perfil</h4>
                        <p>Seu email ficará visível no perfil público</p>
                    </div>
                    <div class="toggle-switch" onclick="toggleSwitch(this)"></div>
                </div>

                <div class="toggle-container">
                    <div class="toggle-info">
                        <h4>Compartilhar Analytics</h4>
                        <p>Ajude a melhorar a plataforma compartilhando dados anônimos de uso</p>
                    </div>
                    <div class="toggle-switch active" onclick="toggleSwitch(this)"></div>
                </div>

                <div class="toggle-container">
                    <div class="toggle-info">
                        <h4>Cookies de Terceiros</h4>
                        <p>Permitir cookies para melhorar sua experiência</p>
                    </div>
                    <div class="toggle-switch active" onclick="toggleSwitch(this)"></div>
                </div>
            </div>

            <div class="settings-card">
                <h2>Exportar Dados</h2>
                <p style="color: #718096; margin-bottom: 1rem;">Baixe uma cópia de todos os seus dados</p>
                <button class="btn btn-secondary">Solicitar Exportação de Dados</button>
            </div>
        `,

        'integracoes': `
            <div class="settings-card">
                <h2>Integrações Disponíveis</h2>
                
                <div style="border: 1px solid #e2e8f0; border-radius: 0.75rem; padding: 1.5rem; margin-bottom: 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong style="font-size: 1.125rem;">WhatsApp Business</strong>
                            <p style="color: #718096; margin-top: 0.5rem;">Adicione botão de WhatsApp nas suas landing pages</p>
                        </div>
                        <button class="btn btn-primary">Conectar</button>
                    </div>
                </div>

                <div style="border: 1px solid #e2e8f0; border-radius: 0.75rem; padding: 1.5rem; margin-bottom: 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong style="font-size: 1.125rem;">Google Analytics</strong>
                            <p style="color: #718096; margin-top: 0.5rem;">Acompanhe o desempenho das suas páginas</p>
                        </div>
                        <button class="btn btn-primary">Conectar</button>
                    </div>
                </div>

                <div style="border: 1px solid #e2e8f0; border-radius: 0.75rem; padding: 1.5rem; margin-bottom: 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong style="font-size: 1.125rem;">Mailchimp</strong>
                            <p style="color: #718096; margin-top: 0.5rem;">Integre com sua ferramenta de email marketing</p>
                        </div>
                        <button class="btn btn-primary">Conectar</button>
                    </div>
                </div>

                <div style="border: 1px solid #e2e8f0; border-radius: 0.75rem; padding: 1.5rem; margin-bottom: 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong style="font-size: 1.125rem;">Zapier</strong>
                            <p style="color: #718096; margin-top: 0.5rem;">Conecte com mais de 3.000 aplicativos</p>
                        </div>
                        <button class="btn btn-primary">Conectar</button>
                    </div>
                </div>
            </div>
        `,

        'ajuda': `
            <div class="settings-card">
                <h2>Central de Ajuda</h2>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                    <div style="padding: 1.5rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 1rem; text-align: center; cursor: pointer;">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">📚</div>
                        <strong>Tutoriais</strong>
                    </div>
                    <div style="padding: 1.5rem; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 1rem; text-align: center; cursor: pointer;">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">💬</div>
                        <strong>Chat ao Vivo</strong>
                    </div>
                    <div style="padding: 1.5rem; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 1rem; text-align: center; cursor: pointer;">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">✉️</div>
                        <strong>Email</strong>
                    </div>
                </div>
            </div>

            <div class="settings-card">
                <h2>Perguntas Frequentes (FAQ)</h2>
                
                <div class="faq-item">
                    <div class="faq-question">Como posso alterar meu plano? +</div>
                    <div class="faq-answer">Acesse "Assinatura / Plano" no menu de configurações e clique em "Alterar Plano".</div>
                </div>

                <div class="faq-item">
                    <div class="faq-question">Como faço para exportar minha landing page? +</div>
                    <div class="faq-answer">No editor, clique no botão "Exportar HTML" na barra superior.</div>
                </div>

                <div class="faq-item">
                    <div class="faq-question">Posso usar meu próprio domínio? +</div>
                    <div class="faq-answer">Sim! Nos planos Pro e Business você pode conectar seu domínio personalizado.</div>
                </div>

                <div class="faq-item">
                    <div class="faq-question">Como cancelo minha assinatura? +</div>
                    <div class="faq-answer">Vá em "Assinatura / Plano" e clique em "Cancelar Assinatura". Você terá acesso até o fim do período pago.</div>
                </div>
            </div>

            <div class="settings-card">
                <h2>Contato com Suporte</h2>
                
                <div class="form-group">
                    <label>Assunto</label>
                    <input type="text" placeholder="Descreva brevemente o problema">
                </div>

                <div class="form-group">
                    <label>Mensagem</label>
                    <textarea placeholder="Descreva detalhadamente sua dúvida ou problema..."></textarea>
                </div>

                <button class="btn btn-primary">Enviar Mensagem</button>
            </div>
        `,

        'sobre': `
            <div class="settings-card">
                <h2>Sobre o Leadify</h2>
                
                <div style="text-align: center; padding: 2rem 0;">
                    <div class="logo-box" style="width: 4rem; height: 4rem; font-size: 2rem; margin: 0 auto 1rem;"></div>
                    <h3 style="font-size: 2rem; margin-bottom: 0.5rem;">Leadify</h3>
                    <p style="color: #718096; margin-bottom: 2rem;">Versão 1.0.0</p>
                </div>

                <div style="max-width: 600px; margin: 0 auto; text-align: center; line-height: 1.8; color: #4a5568;">
                    <p style="margin-bottom: 1rem;">
                        O Leadify é a plataforma completa para criação de landing pages profissionais. 
                        Nossa missão é democratizar o acesso a ferramentas de qualidade para criação de presença digital.
                    </p>
                    <p style="margin-bottom: 2rem;">
                        Criado com ❤️ para profissionais, freelancers e empresas que desejam criar páginas incríveis sem complicação.
                    </p>
                </div>

                <div style="border-top: 1px solid #e2e8f0; padding-top: 2rem; margin-top: 2rem;">
                    <h3 style="margin-bottom: 1rem;">Informações Legais</h3>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        <a href="#" style="color: #667eea; text-decoration: none;">Termos de Uso</a>
                        <a href="#" style="color: #667eea; text-decoration: none;">Política de Privacidade</a>
                        <a href="#" style="color: #667eea; text-decoration: none;">Política de Cookies</a>
                        <a href="#" style="color: #667eea; text-decoration: none;">Licenças</a>
                    </div>
                </div>

                <div style="border-top: 1px solid #e2e8f0; padding-top: 2rem; margin-top: 2rem; text-align: center; color: #718096;">
                    <p>© 2024 Leadify. Todos os direitos reservados.</p>
                </div>
            </div>
        `
    };

    return contents[sectionId] || '<div class="settings-card"><p>Seção em desenvolvimento...</p></div>';
}

// Toggle switch function
function toggleSwitch(element) {
    element.classList.toggle('active');
}

// Dark mode toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    // Here you would implement actual dark mode styles
}

// Logout function
function logout() {
    if (confirm('Tem certeza que deseja sair da sua conta?')) {
        alert('Logout realizado com sucesso!');
        window.location.href = 'index.html';
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Show default section (perfil)
    const defaultContent = getContent('perfil');
    document.getElementById('contentArea').innerHTML = defaultContent;
});

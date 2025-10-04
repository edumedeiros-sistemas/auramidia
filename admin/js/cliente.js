let currentClient = null;
let currentTab = 'posts';

document.addEventListener('DOMContentLoaded', function() {
    loadClientData();
});

async function loadClientData() {
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = urlParams.get('id');
    
    console.log('Carregando cliente ID:', clientId);
    
    if (!clientId) {
        alert('Cliente não encontrado');
        window.location.href = 'clientes.html';
        return;
    }

    currentClient = await csvManager.getClient(clientId);
    console.log('Cliente carregado:', currentClient);
    
    if (!currentClient) {
        alert('Cliente não encontrado');
        window.location.href = 'clientes.html';
        return;
    }

    // Atualizar interface
    updateClientUI();
    loadPosts();
    loadScheduled();
    loadConfig();
}

function updateClientUI() {
    // Header
    document.getElementById('clientName').textContent = currentClient.name;
    document.getElementById('clientAvatar').src = currentClient.profile_picture || 'https://via.placeholder.com/100';
    document.getElementById('profileName').textContent = currentClient.name;
    document.getElementById('profileInstagram').textContent = currentClient.instagram;

    // Status de conexão
    const connectionStatus = document.getElementById('connectionStatus');
    if (currentClient.access_token) {
        connectionStatus.innerHTML = '<i class="fas fa-link"></i> Conectado';
        connectionStatus.className = 'badge badge-connected';
    } else {
        connectionStatus.innerHTML = '<i class="fas fa-unlink"></i> Não Conectado';
        connectionStatus.className = 'badge badge-disconnected';
    }

    // Estatísticas (dados simulados por enquanto)
    document.getElementById('followersCount').textContent = formatNumber(currentClient.followers_count || 0);
    document.getElementById('followingCount').textContent = formatNumber(currentClient.following_count || 0);
    document.getElementById('mediaCount').textContent = currentClient.media_count || 0;
    document.getElementById('engagementRate').textContent = (currentClient.engagement_rate || 0) + '%';
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Tabs
function switchTab(tab) {
    // Atualizar botões
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.tab-btn').classList.add('active');

    // Atualizar conteúdo
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tab + 'Tab').classList.add('active');

    currentTab = tab;

    // Carregar dados específicos da tab
    if (tab === 'posts') {
        loadPosts();
    } else if (tab === 'agendamentos') {
        loadScheduled();
    } else if (tab === 'estatisticas') {
        loadStats();
    }
}

// Posts
function loadPosts() {
    const posts = dataManager.getPosts(currentClient.id);
    const postsGrid = document.getElementById('postsGrid');

    if (posts.length === 0) {
        postsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-image"></i>
                <p>Nenhum post ainda</p>
                <button class="btn-primary" onclick="createPost()">Criar Primeiro Post</button>
            </div>
        `;
        return;
    }

    postsGrid.innerHTML = posts.map(post => `
        <div class="post-card" onclick="viewPost(${post.id})">
            <img src="${post.image_url || 'https://via.placeholder.com/250'}" alt="Post" class="post-image">
            <div class="post-info">
                <p>${post.caption ? post.caption.substring(0, 60) + '...' : ''}</p>
                <div class="post-stats">
                    <div class="post-stat">
                        <i class="fas fa-heart"></i>
                        <span>${post.likes || 0}</span>
                    </div>
                    <div class="post-stat">
                        <i class="fas fa-comment"></i>
                        <span>${post.comments || 0}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function createPost() {
    const caption = prompt('Legenda do post:');
    if (!caption) return;

    const imageUrl = prompt('URL da imagem:\n(Em produção, aqui terá um upload de imagem)');
    if (!imageUrl) return;

    const post = {
        client_id: currentClient.id,
        caption: caption,
        image_url: imageUrl,
        likes: 0,
        comments: 0,
        status: 'published',
        published_at: new Date().toISOString()
    };

    dataManager.savePost(post);
    showNotification('Post criado com sucesso!', 'success');
    loadPosts();
}

function viewPost(postId) {
    alert('Visualizar post: ' + postId + '\n(Funcionalidade em desenvolvimento)');
}

// Agendamentos
function loadScheduled() {
    const scheduled = dataManager.getScheduled(currentClient.id);
    const scheduledList = document.getElementById('scheduledList');

    if (scheduled.length === 0) {
        scheduledList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calendar"></i>
                <p>Nenhum agendamento</p>
                <button class="btn-primary" onclick="schedulePost()">Agendar Post</button>
            </div>
        `;
        return;
    }

    scheduledList.innerHTML = scheduled.map(item => `
        <div class="scheduled-item">
            <div class="scheduled-info">
                <h3>${item.caption ? item.caption.substring(0, 50) + '...' : 'Sem legenda'}</h3>
                <p><i class="fas fa-clock"></i> Agendado para: ${formatDateTime(item.scheduled_date)}</p>
            </div>
            <div class="scheduled-actions">
                <button class="btn-secondary" onclick="editScheduled(${item.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-danger" onclick="deleteScheduled(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function schedulePost() {
    const caption = prompt('Legenda do post:');
    if (!caption) return;

    const imageUrl = prompt('URL da imagem:');
    if (!imageUrl) return;

    const date = prompt('Data e hora para publicar (YYYY-MM-DD HH:MM):');
    if (!date) return;

    const scheduled = {
        client_id: currentClient.id,
        caption: caption,
        image_url: imageUrl,
        scheduled_date: date,
        status: 'pending'
    };

    dataManager.saveScheduled(scheduled);
    showNotification('Post agendado com sucesso!', 'success');
    loadScheduled();
}

function editScheduled(id) {
    alert('Editar agendamento: ' + id + '\n(Funcionalidade em desenvolvimento)');
}

function deleteScheduled(id) {
    if (confirm('Deseja cancelar este agendamento?')) {
        dataManager.deleteScheduled(id);
        showNotification('Agendamento cancelado', 'success');
        loadScheduled();
    }
}

// Estatísticas
function loadStats() {
    // Em produção, carregar estatísticas reais da API
    // Por enquanto, mostrar mensagem
    alert('Estatísticas serão carregadas da API do Instagram quando conectado');
}

function updateStats() {
    const period = document.getElementById('periodSelect').value;
    alert('Atualizar estatísticas para ' + period + ' dias\n(Funcionalidade em desenvolvimento)');
}

// Configurações
function loadConfig() {
    document.getElementById('configName').value = currentClient.name;
    document.getElementById('configInstagram').value = currentClient.instagram;

    // Carregar configurações de API
    document.getElementById('facebookPageId').value = currentClient.facebook_page_id || '';
    document.getElementById('instagramBusinessId').value = currentClient.instagram_business_id || '';
    document.getElementById('accessToken').value = currentClient.access_token || '';
    
    // Atualizar status de conexão
    updateApiStatus();
}

function updateApiStatus() {
    const apiStatus = document.getElementById('apiStatus');
    const lastSync = document.getElementById('lastSync');
    
    if (currentClient.api_configured) {
        apiStatus.textContent = 'Configurada';
        apiStatus.style.color = '#10b981';
    } else {
        apiStatus.textContent = 'Não Configurada';
        apiStatus.style.color = '#ef4444';
    }
    
    if (currentClient.last_sync) {
        const date = new Date(currentClient.last_sync);
        lastSync.textContent = date.toLocaleString('pt-BR');
    } else {
        lastSync.textContent = 'Nunca';
    }
}

function saveConfig() {
    currentClient.name = document.getElementById('configName').value;
    currentClient.instagram = document.getElementById('configInstagram').value;

    dataManager.saveClient(currentClient);
    showNotification('Configurações salvas com sucesso!', 'success');
    updateClientUI();
}

function deleteClientConfirm() {
    if (confirm(`Tem certeza que deseja excluir o cliente "${currentClient.name}"?\n\nEsta ação não pode ser desfeita.`)) {
        dataManager.deleteClient(currentClient.id);
        showNotification('Cliente excluído com sucesso!', 'success');
        window.location.href = 'clientes.html';
    }
}

// Atualizar dados do Instagram
async function refreshData() {
    if (!currentClient.access_token) {
        alert('Cliente não conectado ao Instagram.\nConecte a conta primeiro.');
        return;
    }

    const btn = event.target;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Atualizando...';

    try {
        const data = await refreshInstagramData(currentClient.id);
        
        if (data) {
            // Atualizar dados do cliente
            currentClient.followers_count = data.profile.followers_count;
            currentClient.following_count = data.profile.follows_count;
            currentClient.media_count = data.profile.media_count;
            currentClient.profile_picture = data.profile.profile_picture_url;
            
            dataManager.saveClient(currentClient);
            updateClientUI();
            
            showNotification('Dados atualizados com sucesso!', 'success');
        }
    } catch (error) {
        alert('Erro ao atualizar dados: ' + error.message);
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-sync-alt"></i> Atualizar Dados';
    }
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
}

// Funções de API do Instagram por cliente
async function connectInstagram() {
    try {
        // Verificar se tem Facebook Page ID
        const facebookPageId = document.getElementById('facebookPageId').value;
        if (!facebookPageId) {
            alert('⚠️ Por favor, preencha o ID da Página do Facebook primeiro!');
            return;
        }
        
        // Salvar Facebook Page ID
        currentClient.facebook_page_id = facebookPageId;
        
        // Verificar se a classe InstagramAPI existe
        if (typeof InstagramAPI === 'undefined') {
            console.error('InstagramAPI não encontrada');
            alert('❌ Erro: InstagramAPI não carregada. Recarregue a página.');
            return;
        }
        
        // Criar instância da API do Instagram para este cliente
        const instagramAPI = new InstagramAPI();
        
        // Gerar URL de autorização
        const authUrl = instagramAPI.getAuthUrl();
        
        if (!authUrl) {
            alert('❌ Erro ao gerar URL de autorização. Verifique as configurações.');
            return;
        }
        
        console.log('URL de autorização:', authUrl);
        
        // Abrir popup de autorização
        const popup = window.open(
            authUrl,
            'instagram-auth',
            'width=600,height=600,scrollbars=yes,resizable=yes'
        );
        
        if (!popup) {
            alert('❌ Popup bloqueado! Permita popups para este site.');
            return;
        }
        
        // Monitorar o popup
        const checkClosed = setInterval(() => {
            if (popup.closed) {
                clearInterval(checkClosed);
                // Recarregar dados após autorização
                loadClientData();
            }
        }, 1000);
        
    } catch (error) {
        console.error('Erro ao conectar Instagram:', error);
        alert('❌ Erro ao conectar Instagram: ' + error.message);
    }
}

async function testConnection() {
    try {
        if (!currentClient.access_token) {
            alert('⚠️ Nenhum token de acesso encontrado. Conecte o Instagram primeiro.');
            return;
        }
        
        // Verificar se a classe InstagramAPI existe
        if (typeof InstagramAPI === 'undefined') {
            console.error('InstagramAPI não encontrada');
            alert('❌ Erro: InstagramAPI não carregada. Recarregue a página.');
            return;
        }
        
        // Criar instância da API do Instagram para este cliente
        const instagramAPI = new InstagramAPI();
        instagramAPI.setAccessToken(currentClient.access_token);
        
        // Testar conexão
        const profile = await instagramAPI.getProfile();
        
        if (profile) {
            alert('✅ Conexão com Instagram funcionando!\n\n' +
                  'Nome: ' + profile.name + '\n' +
                  'Seguidores: ' + profile.followers_count + '\n' +
                  'Seguindo: ' + profile.follows_count);
            
            // Atualizar dados do cliente
            currentClient.instagram_business_id = profile.id;
            currentClient.last_sync = new Date().toISOString();
            currentClient.api_configured = true;
            
            // Salvar no CSV
            await csvManager.updateClient(currentClient.id, currentClient);
            
            // Atualizar interface
            updateApiStatus();
            loadClientData();
            
        } else {
            alert('❌ Falha na conexão. Verifique as configurações.');
        }
        
    } catch (error) {
        console.error('Erro ao testar conexão:', error);
        alert('❌ Erro ao testar conexão: ' + error.message);
    }
}

async function saveApiConfig() {
    try {
        // Coletar dados do formulário
        const facebookPageId = document.getElementById('facebookPageId').value;
        const instagramBusinessId = document.getElementById('instagramBusinessId').value;
        const accessToken = document.getElementById('accessToken').value;
        
        // Validar dados obrigatórios
        if (!facebookPageId) {
            alert('⚠️ ID da Página do Facebook é obrigatório!');
            return;
        }
        
        // Atualizar cliente
        currentClient.facebook_page_id = facebookPageId;
        currentClient.instagram_business_id = instagramBusinessId;
        currentClient.access_token = accessToken;
        currentClient.api_configured = !!(facebookPageId && accessToken);
        
        // Salvar no CSV
        const success = await csvManager.updateClient(currentClient.id, currentClient);
        
        if (success) {
            showNotification('✅ Configurações salvas com sucesso!', 'success');
            updateApiStatus();
        } else {
            showNotification('❌ Erro ao salvar configurações!', 'error');
        }
        
    } catch (error) {
        console.error('Erro ao salvar configurações:', error);
        showNotification('❌ Erro ao salvar: ' + error.message, 'error');
    }
}

function showApiHelp() {
    alert('📖 Guia de Configuração da API:\n\n' +
          '1. Crie uma Página do Facebook para o cliente\n' +
          '2. Converta o Instagram para Business\n' +
          '3. Vincule o Instagram à Página do Facebook\n' +
          '4. Encontre o ID da página em: facebook.com/suapagina/about\n' +
          '5. Clique em "Conectar Instagram" para autorizar\n' +
          '6. Teste a conexão para verificar se está funcionando');
}

function showVideoTutorial() {
    alert('🎥 Tutorial em Vídeo:\n\n' +
          'Em breve disponível!\n' +
          'Por enquanto, siga o guia de configuração.');
}

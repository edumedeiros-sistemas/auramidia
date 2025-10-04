// Dashboard specific functionality
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardData();
});

async function loadDashboardData() {
    console.log('Carregando dados do dashboard...');
    
    // Carregar estatísticas
    const clients = await csvManager.loadClients();
    console.log('Clientes carregados:', clients);
    
    const posts = dataManager.getPosts();
    const scheduled = dataManager.getScheduled();
    
    // Atualizar números
    document.getElementById('totalClientes').textContent = clients.length;
    document.getElementById('totalPosts').textContent = posts.length;
    document.getElementById('totalAgendamentos').textContent = scheduled.length;
    
    // Calcular engajamento total (simulado)
    const totalEngagement = posts.reduce((sum, post) => sum + (post.likes || 0) + (post.comments || 0), 0);
    document.getElementById('totalEngajamento').textContent = formatNumber(totalEngagement);
    
    // Carregar lista de clientes
    loadClientsGrid(clients);
}

function loadClientsGrid(clients) {
    console.log('Carregando grid de clientes:', clients);
    const clientsGrid = document.getElementById('clientsGrid');
    
    if (!clientsGrid) {
        console.error('Elemento clientsGrid não encontrado!');
        return;
    }
    
    if (clients.length === 0) {
        console.log('Nenhum cliente encontrado, mostrando mensagem vazia');
        clientsGrid.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: #6b7280;">
                <i class="fas fa-users" style="font-size: 2rem; margin-bottom: 10px;"></i>
                <p>Nenhum cliente cadastrado</p>
            </div>
        `;
        return;
    }
    
    // Mostrar apenas os primeiros 4 clientes
    const displayClients = clients.slice(0, 4);
    console.log('Exibindo clientes:', displayClients);
    
    clientsGrid.innerHTML = displayClients.map(client => `
        <div class="client-card" onclick="window.location.href='cliente.html?id=${client.id}'">
            <div class="client-header">
                <img src="${client.profile_picture || 'https://via.placeholder.com/50'}" 
                     alt="${client.name}" class="client-avatar">
                <div class="client-info">
                    <h3>${client.name}</h3>
                    <p>${client.instagram}</p>
                </div>
            </div>
            <div class="client-stats">
                <div class="client-stat">
                    <i class="fas fa-image"></i>
                    <span>0 posts</span>
                </div>
                <div class="client-stat">
                    <i class="fas fa-heart"></i>
                    <span>0 likes</span>
                </div>
            </div>
            <button class="btn-manage">
                <i class="fas fa-cog"></i> Gerenciar
            </button>
        </div>
    `).join('');
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

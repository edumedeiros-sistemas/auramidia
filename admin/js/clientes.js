document.addEventListener('DOMContentLoaded', function() {
    loadClients();
});

function loadClients() {
    const clients = dataManager.getClients();
    const clientsList = document.getElementById('clientsList');
    
    if (clients.length === 0) {
        clientsList.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <i class="fas fa-users" style="font-size: 4rem; color: #d1d5db; margin-bottom: 20px;"></i>
                <h3 style="color: #6b7280; margin-bottom: 10px;">Nenhum cliente cadastrado</h3>
                <p style="color: #9ca3af;">Clique no botão acima para adicionar seu primeiro cliente</p>
            </div>
        `;
        return;
    }
    
    clientsList.innerHTML = clients.map(client => `
        <div class="client-card-full">
            <div class="client-left">
                <img src="${client.profile_picture || 'https://via.placeholder.com/70'}" 
                     alt="${client.name}" 
                     class="client-avatar-large">
                <div>
                    <h3>${client.name}</h3>
                    <p style="color: #6b7280; margin: 5px 0;">${client.instagram}</p>
                    <span class="status-badge ${client.active ? 'status-active' : 'status-inactive'}">
                        ${client.active ? 'Ativo' : 'Inativo'}
                    </span>
                </div>
            </div>
            <div class="client-actions">
                <a href="cliente.html?id=${client.id}" class="btn-action btn-view">
                    <i class="fas fa-eye"></i> Ver Perfil
                </a>
                <button onclick="editClient(${client.id})" class="btn-action btn-edit">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button onclick="deleteClient(${client.id})" class="btn-action btn-delete">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        </div>
    `).join('');
}

function addClient() {
    const name = prompt('Nome do cliente:');
    if (!name) return;
    
    const instagram = prompt('Usuário do Instagram (ex: @usuario):');
    if (!instagram) return;
    
    const client = {
        name: name,
        instagram: instagram.startsWith('@') ? instagram : '@' + instagram,
        instagram_id: null,
        access_token: null,
        profile_picture: 'https://via.placeholder.com/70',
        created_at: new Date().toISOString(),
        active: true
    };
    
    dataManager.saveClient(client);
    showNotification('Cliente adicionado com sucesso!', 'success');
    loadClients();
}

function editClient(id) {
    const client = dataManager.getClient(id);
    if (!client) return;
    
    const name = prompt('Nome do cliente:', client.name);
    if (name === null) return;
    
    const instagram = prompt('Usuário do Instagram:', client.instagram);
    if (instagram === null) return;
    
    client.name = name;
    client.instagram = instagram.startsWith('@') ? instagram : '@' + instagram;
    
    dataManager.saveClient(client);
    showNotification('Cliente atualizado com sucesso!', 'success');
    loadClients();
}

function deleteClient(id) {
    const client = dataManager.getClient(id);
    if (!client) return;
    
    if (confirm(`Tem certeza que deseja excluir o cliente "${client.name}"?`)) {
        dataManager.deleteClient(id);
        showNotification('Cliente excluído com sucesso!', 'success');
        loadClients();
    }
}

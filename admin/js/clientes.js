document.addEventListener('DOMContentLoaded', function() {
    loadClients();
});

async function loadClients() {
    const clients = await csvManager.loadClients();
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
                    <p style="color: #6b7280; margin: 5px 0;">
                        <i class="fab fa-instagram"></i> ${client.instagram}
                    </p>
                    ${client.plan ? `<p style="color: #8b5cf6; margin: 5px 0; font-weight: 500;">Plano: ${client.plan}</p>` : ''}
                    <span class="status-badge ${client.status === 'Ativo' ? 'status-active' : 'status-inactive'}">
                        ${client.status || 'Ativo'}
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

async function addClient() {
    const name = prompt('Nome do cliente:');
    if (!name) return;
    
    const instagram = prompt('Usuário do Instagram (ex: @usuario):');
    if (!instagram) return;
    
    const email = prompt('Email do cliente (opcional):') || '';
    const phone = prompt('Telefone do cliente (opcional):') || '';
    const plan = prompt('Plano (Básico/Profissional/Premium):') || 'Básico';
    
    const clientData = {
        name: name,
        instagram: instagram,
        email: email,
        phone: phone,
        plan: plan,
        profile_picture: 'https://via.placeholder.com/70'
    };
    
    const newClient = await csvManager.addClient(clientData);
    
    if (newClient) {
        showNotification('Cliente adicionado com sucesso!', 'success');
        loadClients();
    } else {
        showNotification('Erro ao adicionar cliente!', 'error');
    }
}

async function editClient(id) {
    const client = await csvManager.getClient(id);
    if (!client) return;
    
    const name = prompt('Nome do cliente:', client.name);
    if (name === null) return;
    
    const instagram = prompt('Usuário do Instagram:', client.instagram);
    if (instagram === null) return;
    
    const email = prompt('Email do cliente:', client.email || '');
    const phone = prompt('Telefone do cliente:', client.phone || '');
    const plan = prompt('Plano:', client.plan || 'Básico');
    
    const clientData = {
        name: name,
        instagram: instagram.startsWith('@') ? instagram : '@' + instagram,
        email: email,
        phone: phone,
        plan: plan
    };
    
    const success = await csvManager.updateClient(id, clientData);
    
    if (success) {
        showNotification('Cliente atualizado com sucesso!', 'success');
        loadClients();
    } else {
        showNotification('Erro ao atualizar cliente!', 'error');
    }
}

async function deleteClient(id) {
    const client = await csvManager.getClient(id);
    if (!client) return;
    
    if (confirm(`Tem certeza que deseja excluir o cliente "${client.name}"?`)) {
        const success = await csvManager.deleteClient(id);
        
        if (success) {
            showNotification('Cliente excluído com sucesso!', 'success');
            loadClients();
        } else {
            showNotification('Erro ao excluir cliente!', 'error');
        }
    }
}

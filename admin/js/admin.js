// Verificar autenticação
function checkAuth() {
    const authenticated = sessionStorage.getItem('authenticated');
    const loginTime = sessionStorage.getItem('loginTime');
    const currentTime = new Date().getTime();
    
    // Sessão expira em 8 horas
    const SESSION_DURATION = 8 * 60 * 60 * 1000;
    
    if (!authenticated || !loginTime || (currentTime - loginTime) > SESSION_DURATION) {
        // Não autenticado ou sessão expirada
        window.location.href = '../login.html';
        return false;
    }
    
    return true;
}

// Logout
function logout() {
    if (confirm('Tem certeza que deseja sair?')) {
        sessionStorage.clear();
        window.location.href = '../login.html';
    }
}

// Atualizar nome do usuário
function updateUserName() {
    const username = sessionStorage.getItem('username');
    const userNameElement = document.getElementById('userName');
    if (userNameElement && username) {
        userNameElement.textContent = username.charAt(0).toUpperCase() + username.slice(1);
    }
}

// Verificar autenticação ao carregar
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    updateUserName();
});

// Classe para gerenciar dados locais
class LocalDataManager {
    constructor() {
        this.initializeData();
    }

    initializeData() {
        if (!localStorage.getItem('auramedia_clients')) {
            const initialClients = [
                {
                    id: 1,
                    name: 'Kerowlen Sanches',
                    instagram: '@kerowlensanches',
                    instagram_id: null,
                    access_token: null,
                    profile_picture: 'https://via.placeholder.com/50',
                    created_at: new Date().toISOString(),
                    active: true
                },
                {
                    id: 2,
                    name: 'Mercearia Padaria Popular',
                    instagram: '@merceariapadaria_popular',
                    instagram_id: null,
                    access_token: null,
                    profile_picture: 'https://via.placeholder.com/50',
                    created_at: new Date().toISOString(),
                    active: true
                }
            ];
            localStorage.setItem('auramedia_clients', JSON.stringify(initialClients));
        }

        if (!localStorage.getItem('auramedia_posts')) {
            localStorage.setItem('auramedia_posts', JSON.stringify([]));
        }

        if (!localStorage.getItem('auramedia_scheduled')) {
            localStorage.setItem('auramedia_scheduled', JSON.stringify([]));
        }
    }

    // Clientes
    getClients() {
        return JSON.parse(localStorage.getItem('auramedia_clients') || '[]');
    }

    getClient(id) {
        const clients = this.getClients();
        return clients.find(c => c.id == id);
    }

    saveClient(client) {
        const clients = this.getClients();
        const index = clients.findIndex(c => c.id === client.id);
        
        if (index >= 0) {
            clients[index] = client;
        } else {
            client.id = Date.now();
            clients.push(client);
        }
        
        localStorage.setItem('auramedia_clients', JSON.stringify(clients));
        return client;
    }

    deleteClient(id) {
        let clients = this.getClients();
        clients = clients.filter(c => c.id != id);
        localStorage.setItem('auramedia_clients', JSON.stringify(clients));
    }

    // Posts
    getPosts(clientId = null) {
        const posts = JSON.parse(localStorage.getItem('auramedia_posts') || '[]');
        if (clientId) {
            return posts.filter(p => p.client_id == clientId);
        }
        return posts;
    }

    savePost(post) {
        const posts = this.getPosts();
        post.id = post.id || Date.now();
        post.created_at = post.created_at || new Date().toISOString();
        posts.push(post);
        localStorage.setItem('auramedia_posts', JSON.stringify(posts));
        return post;
    }

    deletePost(id) {
        let posts = this.getPosts();
        posts = posts.filter(p => p.id != id);
        localStorage.setItem('auramedia_posts', JSON.stringify(posts));
    }

    // Agendamentos
    getScheduled(clientId = null) {
        const scheduled = JSON.parse(localStorage.getItem('auramedia_scheduled') || '[]');
        if (clientId) {
            return scheduled.filter(s => s.client_id == clientId);
        }
        return scheduled;
    }

    saveScheduled(scheduled) {
        const allScheduled = this.getScheduled();
        scheduled.id = scheduled.id || Date.now();
        scheduled.created_at = scheduled.created_at || new Date().toISOString();
        allScheduled.push(scheduled);
        localStorage.setItem('auramedia_scheduled', JSON.stringify(allScheduled));
        return scheduled;
    }

    deleteScheduled(id) {
        let scheduled = this.getScheduled();
        scheduled = scheduled.filter(s => s.id != id);
        localStorage.setItem('auramedia_scheduled', JSON.stringify(scheduled));
    }
}

// Instância global do gerenciador de dados
const dataManager = new LocalDataManager();

// Funções utilitárias
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
}

function showNotification(message, type = 'success') {
    // Implementar notificações toast
    alert(message);
}

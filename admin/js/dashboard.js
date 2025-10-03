// Dashboard specific functionality
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardData();
});

function loadDashboardData() {
    // Carregar estatísticas
    const clients = dataManager.getClients();
    const posts = dataManager.getPosts();
    const scheduled = dataManager.getScheduled();
    
    // Atualizar números
    document.getElementById('totalClientes').textContent = clients.length;
    document.getElementById('totalPosts').textContent = posts.length;
    document.getElementById('totalAgendamentos').textContent = scheduled.length;
    
    // Calcular engajamento total (simulado)
    const totalEngagement = posts.reduce((sum, post) => sum + (post.likes || 0) + (post.comments || 0), 0);
    document.getElementById('totalEngajamento').textContent = formatNumber(totalEngagement);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

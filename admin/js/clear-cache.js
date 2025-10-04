// Script para limpar cache e forçar reload da logo
console.log('🔄 Limpando cache e forçando reload da logo...');

// Limpar localStorage se necessário
if (localStorage.getItem('logo-cache-version') !== '2') {
    console.log('🧹 Limpando cache antigo...');
    localStorage.clear();
    localStorage.setItem('logo-cache-version', '2');
}

// Forçar reload da logo
document.addEventListener('DOMContentLoaded', function() {
    const logoImages = document.querySelectorAll('img[src*="logo_auramidia.png"]');
    logoImages.forEach(img => {
        // Adicionar timestamp para forçar reload
        const timestamp = new Date().getTime();
        const src = img.src.split('?')[0];
        img.src = `${src}?v=2&t=${timestamp}`;
        console.log('🖼️ Logo atualizada:', img.src);
    });
});

console.log('✅ Cache limpo e logo forçada a recarregar!');

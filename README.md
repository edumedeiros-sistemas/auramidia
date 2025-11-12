# Aura Mídia - Site, Apresentação e Identidade Visual

Este projeto contém um site completo para divulgação de serviços de gerenciamento de mídias digitais, incluindo pacotes de vendas e uma apresentação comercial em PDF.

## 📁 Estrutura do Projeto

```
midias_digitais/
├── index.html           # Site principal
├── styles.css           # Estilos CSS
├── script.js            # JavaScript interativo
├── apresentacao.html    # Apresentação comercial (PDF)
├── logo.svg             # Logo principal (horizontal)
├── logo-compact.svg     # Logo compacta (header)
├── logo-favicon.svg     # Favicon do site
└── README.md            # Este arquivo
```

## 🌐 Site Principal (index.html)

### Características:
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Seções Incluídas**:
  - Hero com call-to-action
  - Serviços oferecidos
  - Pacotes de preços (Básico, Profissional, Premium)
  - Portfólio de trabalhos
  - Sobre a empresa
  - Formulário de contato
  - Footer com links sociais

### Funcionalidades:
- Navegação suave entre seções
- Formulário de contato funcional
- Animações e efeitos visuais
- Integração com WhatsApp
- Menu mobile responsivo

## 🎯 Identidade Visual

### Logo
- Formato principal: `logo.svg` (símbolo Aura + logotipo)
- Uso em header: `logo-compact.svg`
- Favicon: `logo-favicon.svg`

### Paleta de Cores
- Primária: `#6366f1` (Indigo 500)
- Secundária: `#8b5cf6` (Violet 500)
- Terciária: `#ec4899` (Pink 500)
- Acento: `#10b981` (Emerald 500)
- Texto: `#111827` a `#374151`

### Tipografia
- Título/Logo: Poppins 700
- Texto: Poppins 400/500

### Slogan
**"Sua marca com mais presença"**

### Conceito Visual
- **Aura**: Círculos concêntricos representando energia e presença
- **Letra A**: Símbolo central com elementos de mídia
- **Gradiente**: Transição suave entre azul, roxo e rosa
- **Efeito Glow**: Brilho sutil para transmitir energia digital

### Uso Correto
- Mantenha margens de segurança ao redor do símbolo
- Não deforme, rotacione ou modifique as cores do gradiente
- Prefira usar SVG para máxima nitidez

## 📊 Pacotes de Serviços

### Plano Básico - R$ 299/mês
- 8 posts por mês
- Stories 4 dias na semana
- 1 sessão de fotos
- Edição profissional
- Hashtags otimizadas

### Plano Profissional - R$ 599/mês (Mais Popular)
- 15 posts por mês
- Stories 7 dias na semana
- 2 sessões de fotos
- Edição profissional
- Administração 100% das mídias
- Estratégia de conteúdo
- Relatório mensal
- Suporte 24/7

### Plano Premium - R$ 999/mês
- 25 posts por mês
- Stories 7 dias na semana
- 4 sessões de fotos
- Edição profissional
- Administração 100% das mídias
- Estratégia completa
- Relatório semanal
- Suporte 24/7
- Campanhas pagas

## 📄 Apresentação PDF (apresentacao.html)

### Conteúdo da Apresentação:
1. **Página 1**: Capa e introdução
2. **Página 2**: Serviços oferecidos
3. **Página 3**: Pacotes e preços detalhados
4. **Página 4**: Cases de sucesso e depoimentos
5. **Página 5**: Contato e próximos passos

### Como Converter para PDF:
1. Abra o arquivo `apresentacao.html` no navegador
2. Clique no botão "Imprimir/Salvar PDF" (canto superior direito)
3. Selecione "Salvar como PDF" na impressora
4. Configure as margens e orientação conforme necessário

## 🚀 Como Usar

### Para o Site:
1. Abra o arquivo `index.html` em qualquer navegador
2. O site está pronto para uso imediato
3. Personalize as informações de contato no arquivo `script.js`

### Para a Apresentação:
1. Abra o arquivo `apresentacao.html` no navegador
2. Use o botão de impressão para gerar o PDF
3. A apresentação está pronta para ser enviada para clientes

## 🎨 Personalização

### Alterar Informações de Contato:
Edite o arquivo `script.js` na linha 95:
```javascript
const whatsappNumber = '5511999999999'; // Substitua pelo seu número
```

### Alterar Cores e Estilo:
Modifique as variáveis CSS no arquivo `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #10b981;
}
```

### Adicionar Imagens Reais:
Substitua os placeholders de imagem pelos seus trabalhos reais:
```html
<div class="portfolio-image">
    <img src="sua-imagem.jpg" alt="Descrição">
</div>
```

## 📱 Recursos Técnicos

- **HTML5 Semântico**: Estrutura otimizada para SEO
- **CSS3 Moderno**: Flexbox, Grid, animações e gradientes
- **JavaScript Vanilla**: Sem dependências externas
- **Design Responsivo**: Mobile-first approach
- **Performance**: Código otimizado e leve
- **Acessibilidade**: Navegação por teclado e leitores de tela

## 🔧 Tecnologias Utilizadas

- HTML5
- CSS3 (Flexbox, Grid, Animações)
- JavaScript ES6+
- Font Awesome (ícones)
- Google Fonts (Poppins)

## 📞 Suporte

Para dúvidas ou personalizações adicionais, entre em contato:
- Email: contato@auramidiadigital.com.br
- WhatsApp: (43) 9 91736195

---

**Aura Mídia** - Sua marca com mais presença! 🚀

# 📸 Guia de Configuração - Instagram Graph API

## 🎯 Objetivo
Este guia ensina como configurar a integração com a API do Instagram para publicar posts, obter estatísticas e gerenciar contas dos seus clientes.

---

## 📋 Pré-requisitos

1. **Conta no Facebook** (obrigatório)
2. **Página do Facebook** vinculada a uma conta do Instagram Business
3. **Instagram Business Account** (não funciona com contas pessoais)

---

## 🚀 Passo a Passo Completo

### 1. Criar App no Facebook for Developers

#### 1.1 Acessar o Portal
- Acesse: https://developers.facebook.com/
- Clique em **"Meus Apps"** no canto superior direito
- Faça login com sua conta do Facebook

#### 1.2 Criar Novo App
1. Clique em **"Criar App"**
2. Escolha o tipo: **"Empresa"** ou **"Consumidor"**
3. Preencha as informações:
   - **Nome do App**: Aura Mídia Admin
   - **Email de contato**: seu@email.com
4. Clique em **"Criar App"**

#### 1.3 Anotar Credenciais
Após criar o app, você verá:
- **App ID**: XXXXXXXXXXXXXXX
- **App Secret**: XXXXXXXXXXXXXXXXXXXXXXXX

⚠️ **IMPORTANTE**: Guarde estas credenciais com segurança!

---

### 2. Adicionar Produto Instagram

#### 2.1 Adicionar Instagram Graph API
1. No painel do seu app, clique em **"Adicionar Produto"**
2. Procure por **"Instagram"** ou **"Instagram Graph API"**
3. Clique em **"Configurar"**

#### 2.2 Configurar Permissões
Solicite as seguintes permissões:
- `instagram_basic` - Informações básicas do perfil
- `instagram_content_publish` - Publicar conteúdo
- `pages_show_list` - Listar páginas do Facebook
- `pages_read_engagement` - Ler engajamento das páginas

---

### 3. Configurar OAuth Redirect

#### 3.1 Adicionar URL de Redirecionamento
1. No painel do app, vá em **"Configurações" → "Básico"**
2. Role até **"URLs de Redirecionamento do OAuth Válidas"**
3. Adicione suas URLs:
   ```
   http://localhost:3000/admin/instagram-callback.html
   https://auramidia.netlify.app/admin/instagram-callback.html
   ```
4. Clique em **"Salvar Alterações"**

---

### 4. Vincular Página do Facebook

#### 4.1 Ter uma Página do Facebook
- Crie uma página do Facebook se ainda não tiver
- Acesse: https://www.facebook.com/pages/create/

#### 4.2 Vincular Instagram Business
1. Vá nas configurações da sua Página do Facebook
2. Clique em **"Instagram"**
3. Clique em **"Conectar Conta"**
4. Faça login no Instagram Business que deseja vincular

---

### 5. Obter Access Token de Teste

#### 5.1 Graph API Explorer
1. Acesse: https://developers.facebook.com/tools/explorer/
2. Selecione seu App
3. Selecione **"Get User Access Token"**
4. Marque as permissões:
   - `instagram_basic`
   - `instagram_content_publish`
   - `pages_show_list`
   - `pages_read_engagement`
5. Clique em **"Generate Access Token"**
6. Copie o token gerado

#### 5.2 Converter para Long-Lived Token
O token acima expira em 1 hora. Para obter um de 60 dias:

```bash
https://graph.facebook.com/v18.0/oauth/access_token?
  grant_type=fb_exchange_token&
  client_id={app-id}&
  client_secret={app-secret}&
  fb_exchange_token={short-lived-token}
```

---

### 6. Configurar no Código

#### 6.1 Editar instagram-api.js
Abra o arquivo `admin/js/instagram-api.js` e substitua:

```javascript
this.APP_ID = 'SEU_APP_ID_AQUI'; // Cole seu App ID
this.APP_SECRET = 'SEU_APP_SECRET_AQUI'; // Cole seu App Secret
```

Por exemplo:
```javascript
this.APP_ID = '123456789012345';
this.APP_SECRET = 'abc123def456ghi789jkl012mno345pq';
```

⚠️ **IMPORTANTE DE SEGURANÇA**:
- Em PRODUÇÃO, NUNCA coloque o APP_SECRET no frontend
- Crie um backend (Node.js, PHP, Python) para proteger estas credenciais
- Use variáveis de ambiente

---

### 7. Testar a Integração

#### 7.1 Conectar Conta do Cliente
1. Acesse o painel admin
2. Entre em um cliente
3. Clique em **"Conectar Instagram"**
4. Autorize o aplicativo
5. Aguarde o callback

#### 7.2 Verificar Conexão
Após conectar, você deve ver:
- Status: **Conectado**
- Dados do perfil carregados
- Posts disponíveis

---

## 🔐 Segurança em Produção

### ⚠️ NUNCA FAÇA ISTO:
```javascript
// ❌ ERRADO - Credenciais no frontend
const APP_SECRET = 'meu_secret_aqui';
```

### ✅ FAÇA ISTO:
```javascript
// ✅ CERTO - API no backend
fetch('/api/instagram/auth', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer ' + userToken }
});
```

### Backend Recomendado (Node.js/Express)

```javascript
// server.js
const express = require('express');
const axios = require('axios');
const app = express();

app.post('/api/instagram/exchange-token', async (req, res) => {
  const { code } = req.body;
  
  // Credenciais no servidor (variáveis de ambiente)
  const APP_ID = process.env.INSTAGRAM_APP_ID;
  const APP_SECRET = process.env.INSTAGRAM_APP_SECRET;
  
  try {
    const response = await axios.post(
      'https://graph.facebook.com/v18.0/oauth/access_token',
      {
        client_id: APP_ID,
        client_secret: APP_SECRET,
        code: code,
        redirect_uri: process.env.REDIRECT_URI
      }
    );
    
    res.json({ access_token: response.data.access_token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000);
```

---

## 📊 Endpoints Principais da API

### Obter Informações do Perfil
```
GET https://graph.instagram.com/v18.0/{instagram-user-id}
?fields=username,media_count,followers_count
&access_token={access-token}
```

### Listar Posts
```
GET https://graph.instagram.com/v18.0/{instagram-user-id}/media
?fields=id,caption,media_url,timestamp,like_count,comments_count
&access_token={access-token}
```

### Obter Insights
```
GET https://graph.instagram.com/v18.0/{instagram-user-id}/insights
?metric=impressions,reach,profile_views
&period=day
&access_token={access-token}
```

### Publicar Foto
```
POST https://graph.instagram.com/v18.0/{instagram-user-id}/media
?image_url={photo-url}
&caption={caption}
&access_token={access-token}
```

---

## 🐛 Solução de Problemas

### Erro: "Permissions error"
**Causa**: App não tem as permissões necessárias
**Solução**: Revisar permissões no painel do Facebook

### Erro: "Invalid OAuth access token"
**Causa**: Token expirado ou inválido
**Solução**: Gerar novo token ou converter para long-lived

### Erro: "Instagram account is not a business account"
**Causa**: Conta do Instagram não é Business/Creator
**Solução**: Converter para conta Business nas configurações do Instagram

### Erro: "Application does not have permission"
**Causa**: App não está em modo produção
**Solução**: Enviar app para revisão do Facebook (apenas para produção)

---

## 📚 Documentação Oficial

- **Instagram Graph API**: https://developers.facebook.com/docs/instagram-api
- **Content Publishing API**: https://developers.facebook.com/docs/instagram-api/guides/content-publishing
- **Insights API**: https://developers.facebook.com/docs/instagram-api/guides/insights
- **Graph API Explorer**: https://developers.facebook.com/tools/explorer/

---

## 💡 Dicas Importantes

1. **Modo de Desenvolvimento vs Produção**
   - Em desenvolvimento, funciona apenas para contas teste
   - Para produção, precisa enviar app para revisão do Facebook

2. **Limites de Taxa**
   - 200 chamadas por hora por usuário
   - 4800 chamadas por dia por usuário

3. **Tipos de Conta**
   - Funciona APENAS com Instagram Business ou Creator
   - NÃO funciona com contas pessoais

4. **Tokens**
   - Short-lived: 1 hora
   - Long-lived: 60 dias
   - Implemente refresh automático

5. **Webhooks**
   - Configure webhooks para receber notificações
   - Atualizações em tempo real

---

## ✅ Checklist de Configuração

- [ ] App criado no Facebook for Developers
- [ ] App ID e App Secret anotados
- [ ] Instagram Graph API adicionada
- [ ] Permissões configuradas
- [ ] URLs de redirecionamento adicionadas
- [ ] Página do Facebook criada
- [ ] Instagram Business vinculado à página
- [ ] Credenciais configuradas no código
- [ ] Teste de conexão realizado
- [ ] Backend de segurança planejado (produção)

---

**Status Atual**: ✅ Sistema pronto para integração - Configure suas credenciais e teste!

---

**Aura Mídia** - Sua marca com mais presença! 🚀

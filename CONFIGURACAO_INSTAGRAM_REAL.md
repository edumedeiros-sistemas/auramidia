# 🔧 Configuração do Instagram Real - Guia Completo

## 📋 Pré-requisitos

### **1️⃣ Facebook Developers App**
- ✅ App criado: `aura_midia_eduardo`
- ✅ App ID: `1330625782180698`
- ✅ App Secret: `5629bb2ef8306f33ac65e16c6fc9c147`

### **2️⃣ Página do Facebook**
- ✅ Criar página para cada cliente
- ✅ Anotar ID da página
- ✅ Vincular Instagram Business

---

## 🚀 **Passo a Passo Completo:**

### **PASSO 1: Configurar Permissões no Facebook Developers**

#### **1.1 Acessar o App:**
```
https://developers.facebook.com/apps/1330625782180698
```

#### **1.2 Adicionar Instagram Graph API:**
1. **Menu lateral** → **"Adicionar Produtos"**
2. **Procurar** por "Instagram" ou "Instagram Graph API"
3. **Clicar** em "Configurar"

#### **1.3 Configurar Permissões:**
1. **Menu lateral** → **"App Review"** → **"Permissions and Features"**
2. **Adicionar estas permissões:**
   - ✅ `instagram_basic`
   - ✅ `instagram_content_publish`
   - ✅ `pages_show_list`
   - ✅ `pages_read_engagement`

#### **1.4 Configurar URLs de Redirecionamento:**
1. **Menu lateral** → **"Login do Facebook para..."** → **"Configurações"**
2. **Adicionar URLs:**
   ```
   http://localhost:5500/admin/instagram-callback.html
   https://auramidiadigital.com.br/admin/instagram-callback.html
   ```

---

### **PASSO 2: Criar Página do Facebook para o Cliente**

#### **2.1 Para Eduardo Medeiros:**
1. **Acesse:** [facebook.com/pages/create](https://facebook.com/pages/create)
2. **Escolha:** "Negócio ou Marca"
3. **Nome:** "Eduardo Medeiros" ou "Eduardo Medeiros - Fotografia"
4. **Categoria:** "Fotógrafo" ou "Serviços de Fotografia"
5. **Criar página**

#### **2.2 Obter ID da Página:**
1. **Vá para:** facebook.com/suapagina/about
2. **Role para baixo** até "Informações da Página"
3. **Anote o ID** (ex: 100072069324445)

---

### **PASSO 3: Converter Instagram para Business**

#### **3.1 No Instagram do Eduardo:**
1. **Abra o Instagram** no celular
2. **Vá em Configurações** → **Conta**
3. **Clique** em "Mudar para conta comercial"
4. **Escolha** "Negócio"
5. **Vincule** à página do Facebook criada
6. **Complete** o processo

#### **3.2 Verificar se está Business:**
- ✅ Deve aparecer "Conta comercial" nas configurações
- ✅ Deve estar vinculada à página do Facebook

---

### **PASSO 4: Testar Conexão no Painel**

#### **4.1 Acessar o Painel:**
```
http://localhost:5500/admin/cliente.html?id=1
```

#### **4.2 Configurar:**
1. **Preencher** ID da Página do Facebook
2. **Clicar** em "Conectar Instagram"
3. **Autorizar** o aplicativo
4. **Testar** a conexão

---

## 🔍 **Troubleshooting:**

### **Erro: "Invalid Scopes"**
- **Solução:** Adicionar permissões no App Review
- **Verificar:** Se as permissões foram aprovadas

### **Erro: "Redirect URI Mismatch"**
- **Solução:** Adicionar URLs corretas nas configurações
- **Verificar:** Se as URLs estão exatamente iguais

### **Erro: "App Not Live"**
- **Solução:** Tornar o app público ou adicionar usuários de teste
- **Verificar:** Status do app no Facebook Developers

### **Erro: "Page Not Found"**
- **Solução:** Verificar se a página existe e está ativa
- **Verificar:** Se o ID da página está correto

---

## 📞 **Suporte:**

Se tiver problemas:
- **Email:** contato@auramidiadigital.com.br
- **WhatsApp:** (43) 98847-7636

---

**Aura Mídia Digital** - Sua marca com mais presença! 🚀

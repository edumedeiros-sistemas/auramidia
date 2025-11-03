# 📸 Guia para Adicionar Prints Reais no Portfólio

## 📋 **Estrutura Atual do Portfólio**

O portfólio está configurado com **2 clientes**:

### ✅ **Clientes Incluídos:**
1. **Kerowlen Sanches** (@kerowlensanches)
2. **Mercearia Padaria Popular** (@merceariapadaria_popular)

---

## 🖼️ **Como Adicionar as Imagens Reais:**

### **PASSO 1: Salvar as Imagens**
1. Acesse os perfis do Instagram:
   - `@kerowlensanches`
   - `@merceariapadaria_popular`
2. Faça prints das postagens e stories mais impactantes
3. Salve as imagens com nomes descritivos:
   - `kerowlen_post1.jpg`
   - `kerowlen_story1.jpg`
   - `mercearia_produto1.jpg`
   - etc.

### **PASSO 2: Organizar os Arquivos**
Coloque as imagens na pasta:
```
imagens/portfolio/
├── kerowlen_1.jpg
├── kerowlen_2.jpg
├── kerowlen_3.jpg
├── kerowlen_4.jpg
├── mercearia_1.jpg
├── mercearia_2.jpg
├── mercearia_3.jpg
└── mercearia_4.jpg
```

### **PASSO 3: Editar o Arquivo HTML**
Edite o arquivo `portfolio_rhuana_medeiros.html` e substitua as divs placeholders pelas tags `<img>`:

#### **Para Kerowlen (linhas ~350-362):**
Substitua:
```html
<div style="background: #f0f0f0;...">Print 1<br>Kerowlen</div>
```

Por:
```html
<img src="imagens/portfolio/kerowlen_1.jpg" alt="Post Kerowlen" class="portfolio-image">
```

#### **Para Mercearia (linhas ~384-395):**
Substitua:
```html
<div style="background: #f0f0f0;...">Print 1<br>Mercearia</div>
```

Por:
```html
<img src="imagens/portfolio/mercearia_1.jpg" alt="Post Mercearia" class="portfolio-image">
```

---

## 📏 **Especificações das Imagens:**

### **Formato:**
- **Tipo:** JPG ou PNG
- **Dimensões:** Quadradas (aspect-ratio 1:1) funcionam melhor
- **Tamanho:** Máximo 2MB por imagem para PDF não ficar pesado

### **Otimização:**
- Use imagens de boa qualidade
- Mas sem exceder 2MB por imagem
- O CSS já cuida do `object-fit: cover` para ajustar perfeitamente

---

## 🎨 **Exemplo de Layout:**

Cada cliente terá **4 imagens** em grid 2x2:

```
┌─────────────┬─────────────┐
│  Imagem 1   │  Imagem 2   │
├─────────────┼─────────────┤
│  Imagem 3   │  Imagem 4   │
└─────────────┴─────────────┘
```

---

## ✨ **Dicas para Selecionar as Imagens:**

### **Para Kerowlen:**
- Posts que mostrem criatividade e estética
- Stories interativos
- Conteúdo que reflita a personalidade da marca
- Diversidade de formatos (single, carousel, etc.)

### **Para Mercearia:**
- Produtos frescos e apetitosos
- Ofertas e promoções
- Ambiente acolhedor do negócio
- Conteúdo que gere vontade de comprar

---

## 🖨️ **Após Adicionar as Imagens:**

1. Abra `portfolio_rhuana_medeiros.html` no navegador
2. Pressione **Ctrl + P**
3. Selecione **"Salvar como PDF"**
4. Configure:
   - Formato: A4
   - Margens: Padrão
   - Fundos: Ativado
5. Salve como: `Portfolio_Rhuana_Medeiros.pdf`

---

## 📝 **Observação:**

Atualmente o arquivo HTML está com **placeholders** (áreas cinzas) onde devem ir as imagens reais. Após adicionar as imagens, o portfólio estará completo e profissional!

Se precisar de ajuda para fazer isso, é só avisar! 🚀


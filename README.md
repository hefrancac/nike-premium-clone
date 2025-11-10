# 👟 PREMIUM - E-commerce Estilo Nike (Full-Stack)

Clone de um e-commerce premium focado em calçados e vestuário esportivo, inspirado no design e na experiência de usuário da Nike. Este é um projeto full-stack completo, construído do zero.

[Link para o deploy (ainda não temos)]

<img width="1919" height="913" alt="image" src="https://github.com/user-attachments/assets/06be5efb-0d08-4a7d-b756-3c76b8768092" />

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando uma arquitetura moderna, separando o Front-End e o Back-End em um monorepo.

### **Front-End (React)**
* **React.js** (com Hooks e Context API)
* **Vite:** Build-tool de front-end moderna e ultra-rápida.
* **React Router:** Para navegação e páginas (SPA).
* **Axios:** Para fazer requisições à API.
* **CSS Puro:** Focado em design responsivo com Flexbox, Grid e animações.

### **Back-End (Node.js)**
* **Node.js**
* **Express:** Framework principal para a criação da API RESTful.
* **MongoDB (com Mongoose):** Banco de dados NoSQL para gerenciamento de produtos.
* **JSON Web Tokens (JWT):** Para futura autenticação de usuários (se você adicionar).
* **dotenv:** Para gerenciamento de variáveis de ambiente.

---

## ✨ Funcionalidades (Features)

* **Design Premium:** Interface limpa, minimalista e responsiva, inspirada na Nike.
* **API RESTful Completa:** Back-end servindo dados de produtos a partir do MongoDB.
* **Grade de Produtos Dinâmica:** Produtos carregados diretamente do banco de dados.
* **Página de Detalhes do Produto:** Rota dinâmica (`/produto/:id`) para cada item.
* **Carrinho de Compras (Slide-In):** Carrinho lateral 100% funcional com React Context API.
* **Animações e Micro-interações:** Efeitos de *hover*, zoom em cards, e *fade-in* na seção Hero.
* **Menu Responsivo (Hamburger):** Navegação adaptada para dispositivos móveis.

---

## 🏁 Como Rodar o Projeto

**Pré-requisitos:**
* Node.js (v18 ou superior)
* Git
* Uma conta no MongoDB Atlas (para a string de conexão)

**1. Clone o repositório:**
```bash
git clone [https://github.com/seu-nome/nike-premium-clone.git](https://github.com/seu-nome/nike-premium-clone.git)
cd nike-premium-clone
```
2. Configure o Back-End:

```Bash

# Entre na pasta do back-end
cd nike-clone-backend
```
# Instale as dependências
npm install
```
# Crie um arquivo .env na raiz do back-end e adicione suas variáveis:
# (Baseado no .env.example que você deve criar)
PORT=5000
MONGO_URI=sua_string_de_conexao_do_mongodb_atlas
```
```
# (Opcional) Adicione os dados de exemplo ao banco
npm run data:import
```
```
# Inicie o servidor do back-end (em http://localhost:5000)
npm run server
```
3. Configure o Front-End (em um novo terminal):

```Bash

# Volte para a raiz e entre na pasta do front-end
cd ../nike-clone-frontend
```
```

# Instale as dependências
npm install
```
```
# Inicie o servidor do front-end (em http://localhost:5173)
npm run dev
```
Abra http://localhost:5173 no seu navegador para ver o site!


### Último Commit

Depois de salvar o `README.md`, envie-o para o GitHub:
```bash
git add README.md
git commit -m "Adiciona README.md profissional ao projeto"
git push

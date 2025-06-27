
# Habit Tracker Frontend

Este é o frontend do projeto **Habit Tracker**, uma aplicação web para acompanhar seus hábitos diários. Desenvolvido com **React.js**, ele consome uma API REST para cadastro, login, criação e gerenciamento de hábitos pessoais.

## 🔧 Tecnologias Utilizadas

- [React.js](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Vite](https://vitejs.dev/) para build e dev server
- CSS puro para estilos globais

## 📦 Instalação

1. Clone este repositório:

```bash
git clone https://github.com/rafaduarts/habit-tracker-frontend.git
cd habit-tracker-frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` com a URL da API:

```bash
VITE_API_URL=https://sua-api.onrender.com
```

## ▶️ Executar localmente

```bash
npm run dev
```

Abra `http://localhost:5173` no navegador para acessar.


## ✅ Funcionalidades

- Cadastro de usuários
- Login e autenticação com JWT
- Criação, edição e exclusão de hábitos
- Registro de conclusão diária
- Logout e proteção de rotas

## 🚀 Deploy

Você pode fazer deploy deste frontend no [Netlify](https://netlify.com), [Vercel](https://vercel.com) ou outro serviço estático. Lembre-se de definir a variável de ambiente `VITE_API_URL` no painel do serviço.

## 🧑‍💻 Autor

Desenvolvido por Rafael Duarte.

# Biblioteca Digital – API

API desenvolvida em Node.js utilizando Express e Supabase como banco de dados.

Este projeto simula o backend de um sistema de biblioteca digital, com rotas para cadastro de livros, usuários, funcionários e controle de empréstimos. O projeto ainda está em desenvolvimento.

---

## Como rodar o projeto localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. **Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:**
   Você pode usar o arquivo `.env.example` como referência.
   ```env
   SUPABASE_URL=https://seuprojeto.supabase.co
   SUPABASE_ANON_KEY=sua-chave-aqui
   PORT=3000
   ```

3. **Instale as dependências do projeto:**
   ```bash
   npm install
   ```

4. **Inicie a aplicação:**
   ```bash
   node app.js
   ```

---

## Endpoints disponíveis

| Método | Rota                   | Descrição                                       |
|--------|------------------------|-------------------------------------------------|
| POST   | `/books`               | Cadastra um novo livro                          |
| POST   | `/users`               | Cadastra um novo usuário                        |
| POST   | `/employees`           | Cadastra um novo funcionário                    |
| GET    | `/consult_rented_books`| Lista todos os empréstimos registrados         |
| POST   | `/rented_books`        | Registra um novo empréstimo de livro           |
| DELETE | `/books/:id`           | Remove um livro pelo ID                        |
| DELETE | `/users/:id`           | Remove um usuário pelo ID                      |
| DELETE | `/employees/:id`       | Remove um funcionário pelo ID                  |

| GET    | `/books`               | Lista todos os livros cadastrados              |
| GET    | `/users`               | Lista todos os usuários cadastrados            |
| GET    | `/employees`           | Lista todos os funcionários cadastrados        |

---

## Estrutura do projeto

- `app.js`: Arquivo principal com as rotas da API
- `supabaseClient.js`: Configuração do Supabase Client
- `validation.js`: Funções auxiliares para validações
- `.env`: Contém as variáveis sensíveis (NÃO COMMITAR)
- `.env.example`: Arquivo modelo com estrutura do `.env`

---

## Requisitos

- Node.js v18+
- Conta no [Supabase](https://supabase.com/)
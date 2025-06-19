# Projeto E-commerce - Devnology

Este projeto é uma aplicação de *e-commerce* desenvolvida como parte do teste técnico para a empresa *Dot 8*.  
Ele conta com um *front-end em React* e um *back-end em NestJS, utilizando **Prisma ORM* e *SQLite* para o banco de dados.

---

## 📌 Decisões Técnicas

Para este projeto, foram adotadas as seguintes diretrizes de arquitetura e desenvolvimento:

- *Arquitetura Simples e Intuitiva:*  
  Foi projetada uma estrutura de fácil entendimento, visando clareza para outros desenvolvedores que venham a contribuir.
  
- *Padrão MVC (Model-View-Controller):*  
  O back-end segue o padrão MVC para organizar a lógica de negócio (Models), a manipulação de requisições (Controllers) e as regras de acesso aos dados (Services/Repositories).

- *CRUD Completo:*  
  Implementa operações de *Create, **Read, **Update* e *Delete* no banco de dados, permitindo gerenciar os registros de produtos ou recursos do e-commerce.

- *Exposição de Dados via API:*  
  Os dados armazenados são disponibilizados para o front-end através de endpoints RESTful, garantindo que o usuário final possa visualizá-los de forma dinâmica e interativa.

---

## 🚀 Como Rodar o Projeto

### 📦 Backend

*Pré-requisitos:*

- Node.js 18+
- npm
- SQLite (já incluso via Prisma)

*Passos para executar:*

```bash
# 1️⃣ Navegue até a pasta do backend
cd backend

# 2️⃣ Instale as dependências
npm install

# 3️⃣ Execute as migrações do banco de dados
npx prisma migrate dev --name init

# 4️⃣ Inicie o servidor em modo desenvolvimento
npm run start:dev
# Sistema de Atendimento Distribuído utilizando pub-sub

Este projeto foi desenvolvido como parte das disciplinas ECOS02 (Sistemas Distribuídos) e ECOS012 (Laboratório de Sistemas Distribuídos). O sistema consiste em uma aplicação de atendimento que utiliza tecnologias como Node.js, Express, Google Cloud Pub/Sub e Nodemailer.

## Estrutura do Projeto

O projeto está organizado da seguinte maneira:

## Descrição dos Componentes

### `backend/`

Esta pasta contém o código do servidor Node.js que gerencia a lógica de negócios, autenticação, e integrações com serviços externos como Google Cloud Pub/Sub para mensagens e Nodemailer para envio de emails.

- **`auth.js`**: Módulo de autenticação para gerenciar usuários e autenticação.
- **`package-lock.json`**: Arquivo gerado pelo npm para garantir a consistência das versões das dependências.
- **`package.json`**: Arquivo de configuração do npm que lista as dependências e scripts de execução do servidor.
- **`server.js`**: Arquivo principal do servidor Node.js que configura endpoints RESTful para gerenciar chamados, usuários e autenticação.
- **`service-account-key.json`**: Arquivo de chave de serviço do Google Cloud Platform para autenticação.

### `frontend/`

Esta pasta contém o código do frontend da aplicação, que inclui a interface do usuário (HTML, CSS, JavaScript) e as dependências necessárias.

- **`node_modules/`**: Pasta que contém todas as dependências instaladas pelo npm para o frontend.
- **`public/`**: Pasta raiz do frontend que contém os arquivos estáticos servidos pelo servidor.
  - **`cliente.html`**: Página de abertura de chamados para os clientes.
  - **`dashboard.html`**: Página de dashboard para visualização dos chamados.
  - **`details.html`**: Página de detalhes de um chamado específico.
  - **`login.html`**: Página de login para autenticação de usuários.
  - **`style.css`**: Arquivo de folha de estilos para estilização das páginas.
  - **`cliente.js`**: Script JavaScript para interação com a página de abertura de chamados.
  - **`dashboard.js`**: Script JavaScript para interação com a página de dashboard.
  - **`details.js`**: Script JavaScript para interação com a página de detalhes de chamados.
  - **`login.js`**: Script JavaScript para interação com a página de login e autenticação.

### Considerações

Esta estrutura permite uma separação clara entre a lógica do servidor (backend) e a interface do usuário (frontend), facilitando o desenvolvimento, manutenção e escalabilidade do sistema de atendimento distribuído.



## Funcionalidades Principais

- **Login:** Autenticação de usuários com autenticação simples.
- **Abertura de Chamados:** Formulário para criação de novos chamados com diferentes tipos de problema.
- **Dashboard:** Visualização e gestão dos chamados abertos.
- **Respostas por Email:** Sistema integrado para enviar respostas aos usuários por email.
- **Desconexão Segura:** Possibilidade de deslogar do sistema de forma segura.

## Configuração

### Pré-requisitos

- Node.js instalado
- Conta no Google Cloud Platform com acesso ao Pub/Sub

### Instalação e Execução

1. **Backend:**

   ```bash
   cd backend/
   npm install
   node server.js ou npm start

2. **Frontend:**

   ```bash
   cd frontend/
   npm install
   npm start




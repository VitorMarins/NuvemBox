# NuvemBox — Backend

API do NuvemBox para gerenciamento de usuários, arquivos e backups.

## Tecnologias

- Node.js
- TypeScript
- Express
- TypeORM
- PostgreSQL
- Multer

## Pré-requisitos

- Node.js instalado
- pnpm instalado
- Banco de dados configurado

## Instalação

```bash
pnpm install
```

Configure as variáveis de ambiente no arquivo `.env` conforme a configuração do banco de dados e da aplicação.

## Execução

Para iniciar o projeto em desenvolvimento, use o script definido no `package.json`:

```bash
pnpm dev
```

Para executar a versão compilada:

```bash
pnpm build
pnpm start
```

## Estrutura

```text
src/
├── config/         # Configurações de upload
├── controllers/    # Controladores HTTP
├── db/             # Conexão com o banco de dados
├── models/         # Entidades do sistema
├── repositories/   # Acesso aos dados
├── routes/         # Rotas da API
├── services/       # Regras de negócio
└── utils/          # Funções auxiliares
```

## Funcionalidades

- Cadastro e gerenciamento de usuários
- Autenticação e tratamento de senhas
- Upload e gerenciamento de arquivos
- Criação e gerenciamento de backups

## Desenvolvimento

Antes de abrir um pull request, verifique a compilação e mantenha as configurações sensíveis apenas no `.env`.
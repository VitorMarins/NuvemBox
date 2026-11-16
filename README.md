# NuvemBox

Aplicação de armazenamento de arquivos em nuvem, composta por uma API em Node.js/TypeScript e um aplicativo mobile em React Native.

## Estrutura do projeto

- `Backend/` — API, regras de negócio, persistência de dados e gerenciamento de arquivos.
- `Front_Mobile/` — aplicativo mobile desenvolvido com React Native e Expo.

## Tecnologias

### Backend

- Node.js
- TypeScript
- Express
- TypeORM
- SQLite
- Multer

### Frontend mobile

- React Native
- Expo
- React Navigation

## Pré-requisitos

- Node.js instalado
- pnpm instalado
- Expo Go ou um emulador Android/iOS

## Configuração do backend

```bash
cd Backend
pnpm install
```

Configure as variáveis de ambiente no arquivo `.env` conforme o ambiente local e inicie a API:

```bash
pnpm dev
```

## Configuração do aplicativo mobile

Em outro terminal:

```bash
cd Front_Mobile
pnpm install
pnpm start
```

Depois, escaneie o QR Code com o Expo Go ou escolha um emulador disponível.

> Para testar em um dispositivo físico, o celular e o computador devem estar na mesma rede. Ajuste a URL da API no aplicativo caso o backend esteja sendo executado em outro endereço.

## Desenvolvimento

O backend contém rotas para usuários e arquivos, além de serviços, repositórios e modelos separados por responsabilidade. O frontend possui as telas de login e dashboard, navegação e componentes reutilizáveis.

## Licença

Este projeto é destinado a fins acadêmicos e de desenvolvimento.

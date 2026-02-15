# UnoCRM - Desafio Técnico

Mini CRM de Leads desenvolvido como desafio técnico, com foco em gerenciamento de leads e contatos.

## 🎨 Protótipo das Telas

As telas foram prototipadas no Figma para definir a interface antes do desenvolvimento.

**Link do Figma:** [UnoCRM - Protótipo](https://www.figma.com/design/uPEFcKcqjMunpsAMBFtlJ4/UnoCRM?node-id=0-1&t=9SiNeDTthvn4LCdg-1)

> **Organização do Figma:**
>
> - **Wireframes**: Contém as telas do sistema
> - **StyleGuide**: Contém o design system do projeto

> **Nota:** As telas obrigatórias do desafio são apenas **Contatos** e **Leads** e seus cadastros. As telas **Home** e **Dashboard** foram criadas adicionalmente como um desafio pessoal.

Para visualizar todas as telas e seus detalhes, consulte [web/README.md](web/README.md).

---

## 📋 Sobre o Desafio

Este projeto é parte de um teste técnico para desenvolvimento de uma aplicação fullstack de gerenciamento de leads e contatos.

Para mais detalhes sobre os requisitos do desafio, consulte o arquivo [README_TESTE_TECNICO.md](README_TESTE_TECNICO.md).

## 🛠️ Stack Tecnológica

- **Backend:** Hono + TypeScript + Zod
- **Frontend:** React + TypeScript
- **Persistência:** Em memória (arrays)

---

## 📦 Estrutura do Projeto

```
uno-challenge/
├── api/                    # Backend Hono (Clean Architecture + DDD)
├── web/                    # Frontend React
│   └── assets/             # Imagens do protótipo
├── README.md              # Este arquivo
└── README_TESTE_TECNICO.md # Requisitos do desafio
```

> 📖 **Documentação Técnica:**
>
> - **Backend:** [api/README.md](api/README.md) - Arquitetura, decisões técnicas e endpoints da API
> - **Frontend:** [web/README.md](web/README.md) - Telas, componentes e funcionalidades do sistema

---

## 🚀 Como Executar

Este projeto utiliza **Yarn Workspaces** para gerenciar o monorepo.

### Pré-requisitos

- Node.js 18+
- Yarn 1.22+

### Instalação

```bash
# Instalar dependências de todo o monorepo
yarn install
```

### Executar em Desenvolvimento

```bash
# Iniciar apenas o backend (porta 3000)
yarn dev:api

# Iniciar apenas o frontend (porta 5173)
yarn dev:web

# Ou executar ambos em terminais separados
```

### Build para Produção

```bash
# Build do backend
yarn build:api

# Build do frontend
yarn build:web
```

### Testes

```bash
# Executar todos os testes (backend + frontend)
yarn test

# Executar testes do backend
yarn test:api

# Executar testes do frontend
yarn test:web
```

---

**Desenvolvido para o desafio técnico UNO** 🚀

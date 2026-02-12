# 🔧 Backend API - UnoCRM

API REST desenvolvida com **Hono** + **TypeScript** para gerenciamento de Leads e Contatos, seguindo os princípios de **Clean Architecture** e **Domain-Driven Design (DDD)**.

## 💭 Decisões Técnicas

### Sobre a Arquitetura Aplicada

Este projeto usa **arquitetura em camadas** baseada em Clean Architecture e DDD, mesmo sendo um escopo pequeno. Essa decisão foi consciente e tem os seguintes objetivos:

**Propósito Demonstrativo**
Aplicar padrões arquiteturais robustos em um framework minimalista como o Hono serve para demonstrar compreensão de design de software e capacidade de adaptar arquiteturas consolidadas a diferentes tecnologias.

**Trade-off Reconhecido**
É importante destacar que, em produção com um escopo similar, essa estrutura seria um claro caso de **over-engineering**. Para uma aplicação desse tamanho, uma abordagem mais simples seria mais adequada, priorizando rapidez no desenvolvimento.

**Contexto do Hono**
O Hono foi feito para ser um framework leve e simples, o que não favorece arquiteturas complexas em camadas. A escolha de aplicar Clean Architecture aqui demonstra flexibilidade técnica e capacidade de implementar boas práticas independentemente do framework usado.

**Objetivo Final**
Esta implementação serve como **portfólio técnico** para demonstrar:

- Domínio de princípios SOLID e separação de responsabilidades
- Conhecimento de padrões arquiteturais
- Capacidade de estruturar código escalável e testável
- Experiência com injeção de dependências e inversão de controle

---

## 🏗️ Arquitetura

O backend está organizado em três camadas principais, seguindo os princípios da Clean Architecture e DDD:

### 🟦 Domain (Domínio)

Camada mais interna, contém a lógica de negócio pura e independente de frameworks:

- **Entities**: Entidades de negócio (`Contact`, `Lead`) com factory methods
- **Repositories**: Interfaces que definem contratos de acesso a dados

### 🟩 Application (Aplicação)

Camada de orquestração, coordena o fluxo de dados entre as camadas:

- **Use Cases**: Casos de uso que implementam regras de negócio (CRUD de Contacts e Leads)
- **DTOs**: Objetos de transferência de dados (input/output)
- **Mappers**: Conversão entre Entidades e DTOs
- **Exceptions**: Exceções de negócio customizadas

### 🟨 Infrastructure (Infraestrutura)

Camada externa, implementa detalhes técnicos e integrações:

- **API**: Controllers HTTP, validações Zod, middlewares
- **Repositories**: Implementações concretas (InMemory)
- **Seeds**: Dados iniciais para desenvolvimento

## 🚀 Comandos

```bash
# Desenvolvimento (com hot-reload)
yarn dev

# Build para produção
yarn build

# Executar em produção
yarn start

# Executar testes
yarn test
```

## 📋 Endpoints

### Contacts

- `GET /contacts` - Lista todos os contatos
- `GET /contacts/:id` - Busca contato por ID
- `POST /contacts` - Cria novo contato
- `PUT /contacts/:id` - Atualiza contato
- `DELETE /contacts/:id` - Remove contato

### Leads

- `GET /leads` - Lista todos os leads
- `GET /leads/:id` - Busca lead por ID
- `POST /leads` - Cria novo lead
- `PUT /leads/:id` - Atualiza lead
- `DELETE /leads/:id` - Remove lead

## 🛠️ Stack Tecnológica

- **Framework**: [Hono](https://hono.dev/) - Web framework ultrarrápido
- **Validação**: [Zod](https://zod.dev/) - Schema validation
- **TypeScript**: Tipagem estática
- **Persistência**: In-Memory (Arrays)

## 📁 Estrutura de Diretórios

```
api/
├── src/
│   ├── domain/                 # 🟦 Entidades e interfaces
│   │   ├── entities/
│   │   └── repositories/
│   ├── application/            # 🟩 Casos de uso e DTOs
│   │   ├── use-cases/
│   │   ├── mappers/
│   │   ├── dtos/
│   │   └── exceptions/
│   ├── infrastructure/         # 🟨 API e implementações
│   │   ├── api/
│   │   │   ├── controllers/
│   │   │   ├── validations/
│   │   │   ├── middlewares/
│   │   │   └── server.ts
│   │   ├── repositories/
│   │   └── seeds/
│   └── index.ts
└── package.json
```

## 🎯 Princípios Aplicados

- **Clean Architecture**: Separação clara de responsabilidades por camadas
- **DDD**: Modelagem rica do domínio com entidades e value objects
- **Dependency Inversion**: Domínio não depende de infraestrutura
- **SOLID**: Single Responsibility, Open/Closed, etc.
- **Type Safety**: TypeScript em todo o código

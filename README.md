# shopper_test

Olá, seja bem-vindo(a)!

Este projeto consiste no backend de uma aplicação fullstack, solicitada em um teste para uma vaga fullstack na Shopper..

> **IMPORTANTE:** Um arquivo .env deve ser criado na raiz do projeto com as variáveis GOOGLE_API_KEY="SUA-KEY" e DATABASE_URL="postgresql://postgres:postgres@postgres:5432/shopper_test?schema=public" (url de conexão com banco de dados). 

Obrigrado!

## Como executar o projeto

**Pré-requisitos:** Node.js, Docker, PostgreSQL, IDE com suporte ao TypeScript e um simulador de requisições (Postman, Insomnia, etc...).

```bash
# Clonar o repositório
git clone https://github.com/Tibetano/shopper_test.git

# Navegar até o diretório raiz do projento onde se encontra o arquivo "package.json"
cd shopper_test-main

## Executar o projeto via terminal
 - Para executar o projeto sem utilizar o Docker, será necessário ter o
   banco de dados Postgres instalado e ouvindo na porta padrão (5432).

# Baixar as dependencias do projeto
npm intall

# Executar o projeto
npm run dev
 - NOTA: Ao executar o script acima pela primeira vez, o banco fará duas solicitações,
         primeiro a confirmação de reset do banco e segundo o nome da migration,
         responda "yes" e "nome_qualquer_para_migration".

## Executar o projeto via Docker
# Subir aplicação via Docker
docker compose up --build -d

# Derrubar a aplicação do Docker
docker compose down
```






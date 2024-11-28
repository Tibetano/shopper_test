# shopper_test

Olá, seja bem-vindo(a)!

Este projeto consiste no backend de uma aplicação fullstack, solicitada em um teste para uma vaga fullstack na Shopper..

> **IMPORTANTE:** Caso você seja um(a) avaliador(a), o arquivo .env contido na raiz do projeto contém a URL de acesso ao banco de dados (este arquivo é criado automaticamente pelo Prisma ORM). Logo, a google_key deverá ser acrescentada ao .env já existente, pois, em caso de sobrescrita do mesmo, o servidor perderá o acesso ao banco de dados. 

Obrigrado!

## Como executar o projeto

**Pré-requisitos:** Node.js, Docker, PostgreSQL, IDE com suporte ao TypeScript e um simulador de requisições (Postman, Insomnia, etc...).

```bash
# Clonar o repositório
git clone https://github.com/Tibetano/shopper_test.git

# Navegar até o diretório raiz do projento onde se encontra o arquivo "package.json"
cd shopper_test-main

## Executar o projeto via terminal
 - Para executar o projeto sem o uso do Docker, será necessário ter o banco de dados Postgres instalado e ouvindo na porta padrão (5432).

# Baixar as dependencias do projeto
npm intall

# Executar o projeto
npm run dev

## Executar o projeto via Docker
# Subir aplicação via Docker
docker compose up --build -d

# Derrubar a aplicação do Docker
docker compose down
```






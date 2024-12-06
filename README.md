# shopper_test

Olá, seja bem vindo(a)!

Este projeto consiste em uma aplicação fullstack para solicitação de corridas (tipo uma versão super simplificada do Uber), solicitada em um teste para uma vaga fullstack na Shopper.

## Como executar o projeto

**Pré-requisitos:** Docker.

> **IMPORTANTE:** Para executar o projeto, será necessário uma chave de aplicação do google para que a aplicação consiga acessar a api de rotas do google. Essa key deve ser informada em um arquivo .env que deverá estar no diretório raiz do projeto.

```bash
# Clonar o repositório
git clone https://github.com/Tibetano/shopper_test.git

# Navegar até o diretório raiz do projento onde se encontra o arquivo "package.json"
cd shopper_test-main

# Subir aplicação via Docker
docker compose up --build -d

# Derrubar a aplicação do Docker
docker compose down
```

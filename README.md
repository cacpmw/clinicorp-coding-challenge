# Clinicorp Coding Challenge

Projeto realizado como parte do processo seletivo da empresa Clinicorp em Jaragua do sul

# Case

**Requisitos funcionais**:

1. O sistema deve permitir cadastrar tarefas
1. O sistema deve exibir todos os dados

**Requisitos não funcionais**:

1. O frontend deve ser com react hooks e vite, ficando a seu critério o design de
   componentes

1. O servidor deve ser em node 20 com express e javascript

1. Deve conter um endpoint `/insert-tasks`, que deve conseguir inserir dados

1. Deve conter um endpoint `/get-tasks` que retorne um json com o array de dados

1. Deve salvar no FireStore o nome do computador que fez o insert (Deve pegar
   automaticamente o nome do computador)

1. Deve conter testes unitários com Jest

1. Deve conter um README.md que explique todo o passo a passo para executar o
   projeto

**O que será avaliado**:

1. Estrutura e organização do código
1. Baixo Acoplamento
1. Alta Coesão
1. Testes unitários

# O Projeto

Este projeto foi feito em monorepo separado em 2 pastas: _backend_ e _frontend_

Foi realizado testes de benchmark com autocannon e o projeto aguentou com folga aproximadamente 200 mil requisicoes em 10s com uma media de resposta abaixo de 100ms.

Ao rodar o teste descobri que o firebase tem uma cota diaria de 50 mil leituras por dia e quando atingi 117 mil o banco parou de respodender mas o servidou continuo rodando.

## Backend

A api foi escrita em Node.js 20 LTS com as seguintes dependencias:

- cors
- express
- express-async-errors
- firebase-admin
- helmet
- reflect-metadata
- swagger-ui-express
- zod
- jest

_A versao do NodeJS 20 LTS foi travada atraves do arquivo `.nvmrc` na raiz do projeto_

## Frontend

O frontend foi escrito em React utilizando o vite como feramenta de building e as seguintes dependencias:

- @hookform/resolvers
- @radix-ui/react-dialog
- @tanstack/react-query
- lucide-react
- react
- react-dom
- react-hook-form
- tailwind-merge
- tailwind-variants
- zod

# Rodando o projeto

O projeto esta inteiramente dockerizado mas antes de subir os containers sao necessarios alguns passos.

## Backend

E necessario ter o arquivo `.json` de credenciais do firebase na raiz do projeto backend com o nome `ServiceAccountKey.json`. Eu fornecerei esse arquivo fora do sistema de versionamento (git).

Uma vez baixado o projeto do git, dentro da pasta `backend`, rode o seguinte comando:

1. `npm install`

# Frontend

1 `npm install`

## Rodando containers

Agora que tudo esta configurado basta entrar na raiz do monorepo e rodar:

`docker compose up -d`

# Swagger

E possivel ver documentacao da API pelo endpoint `http://localhost:3000/api-docs`

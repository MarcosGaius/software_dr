# API Software DR

Para rodar a api, antes de tudo é importante configurar as variáveis de ambiente criando um arquivo .env. Recomenda-se criá-lo a partir do .env.example.

## Requisitos

1. Docker
2. Node

## Rodando o projeto

### PostgreSQL Database

É preciso iniciar a database antes de tudo. Use o comando abaixo para isso.

```bash
  docker-compose -f docker-compose.yaml --env-file .env up
```

Caso tenha problemas ao conectar, verifique os dados do banco de dados preenchidos no .env, especialmente as chaves:

```js
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_NAME=
```

Caso ainda tenha problemas, os seguintes passos podem ajudar:

- Rodar o comando `docker compose down`
  - Você pode tentar usar o comando `docker system prune --all	--volumes`, mas entenda que ele deletará todos os contêineres, redes, imagens (pendentes e não referenciados) não utilizados e, opcionalmente, volumes.
- Deletar a pasta `.data` dentro do projeto backend.
- Tentar rodar o projeto novamente.

### Nest API

Basta rodar o seguinte comando para rodar em modo de desenvolvimento

```bash
yarn start:dev
```

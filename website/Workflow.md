### WORKFLOW

## GRAPHQL HOOK
- Basta criar um arquivo na pasta `/src/graphql/**/*.graphql` (pode ser uma query ou mutation);
- Colocar o código (mesmo código que é utilizado no GraphQL playground);
- E rodar o script `yarn gen`, isto fará com que o hook seja criado automaticamente na pasta /src/generated/;
- Assim, será possível ter auto completion ao chamar um hook.



Shoplanner Server

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil de um usuário
- [x] Deve ser possível criar uma lista de compras
- [x] Deve ser possível criar um item da lista de compras
- [x] Deve ser possível adicionar um item na lista de compras
- [x] Deve ser possível atualizar a lista de compras e seus itens
- [ ] Deve ser possível receber a previsão de quanto determinado item
- [ ] Deve ser possível compartilhar uma lista com outro usuário

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado
- [x] Ao criar um usuário, deve-se criar também uma lista de compras automaticamente
- [x] Cada item da lista de compras deve ser único para cada usuário
- [x] O usuário não deve ter dois itens de mesmo nome na mesma lista
- [ ] O usuário deve autorizar receber uma lista de compras compartilhada

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página
- [x] O usuário deve ser identificado por um JWT (JSON Web Token)
- [x] Deve-se atentar a criação de nomes em lowercase e upcase
- [x] Não se deve criar um PRICE com preço zero ao criar um ShoppingListItem

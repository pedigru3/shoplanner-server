Shoplanner Server

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [ ] Deve ser possível obter o perfil de um usuário
- [ ] Deve ser possível criar uma lista de compras

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado
- [ ] Ao criar um usuário, deve-se criar também uma lista de compras automaticamente

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token)

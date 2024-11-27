# Sistema Gestão de Usuários

## Descrição do Projeto

O projeto **ViperIt User Management System** é um sistema web de gerenciamento de usuários, desenvolvido para facilitar o controle de acesso e a administração de usuários dentro de uma aplicação. Ele oferece uma interface amigável e segura para que administradores possam gerenciar contas de usuários, com diferentes níveis de permissão, e realizar ações de CRUD (Create, Read, Update, Delete).

## Funcionalidades Principais

### 1. Tela de Login

- **Campos:** E-mail e Senha.
- **Funcionalidade "Esqueci minha senha":** Caso o usuário esqueça a senha, ele pode clicar em "Forgot Password".
- **Esqueci minha Senha:**
  - O usuário será redirecionado para a tela de *request reset password*, onde deverá inserir o e-mail associado à conta.
  - Um e-mail será enviado para o endereço fornecido, contendo um botão para resetar a senha.
  - Ao clicar no botão, o sistema redirecionará o usuário para uma tela de criação de nova senha.
  - O sistema validará o token antes de permitir a criação de uma nova senha.

### 2. Home Page

- **Navbar:**
  - **Logo e Nome da Empresa:** ViperIt.
  - **Links:**
    - **Home:** Redireciona para a página inicial.
    - **About:** Informações sobre o sistema ou a empresa.
    - **User Icon:** Acessa o perfil do usuário, permite trocar a senha e permite realizar logout.
  - **Adicionar Novo Cliente:** Botão para adicionar um novo usuário ao sistema (disponível apenas para Admin e User).
  - **Search:** Campo de pesquisa para localizar usuários na tabela.

- **Tabela de Usuários:**
  - **Colunas:** 
    - ID
    - Username
    - Nome
    - Sobrenome
    - E-mail
    - Telefone
    - Permissão
    - Ações (View, Update, Delete)
  - **Filtragem:** 
    - Filtro de permissões acima da tabela para selecionar entre "Admin", "User" e "Read".

### 3. Permissões de Usuário

- **Admin:** 
  - Pode adicionar, visualizar, atualizar e deletar usuários.
- **User:**
  - Pode adicionar, visualizar e atualizar usuários, mas não pode deletar.
- **Read:** 
  - Somente visualiza os usuários.

## Tecnologias Utilizadas

- **Frontend:** React
- **Backend:** FastAPI
- **Banco de Dados:** SQLite3
- **Autenticação:** JWT, OAuth
- **Envio de E-mails:** MIMEMultipart

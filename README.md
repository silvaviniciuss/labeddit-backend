<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-como-executar-a-api">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> • 
</p>

## 💻 Sobre o projeto

Projeto desenvolvido no **Bootcamp Web Full-Stack** da [Labenu](https://www.labenu.com.br/curso-de-programacao-web-full-stack-integral), com o intuito de criar uma API, ou seja a comunicação
entre front e back-end.

---

## ⚙️ Funcionalidades
 API disponibiliza os seguintes endpoints de conexão com o banco de dados:
  - [x] Signup - requisição de cadastro de usuários.
  - [x] Login - requisição de login de usuários.
  - [x] Create Post - requisição de criação de posts.
  - [x] Get Posts - requisição de pesquisa e retorno de posts.
  - [x] Edit Post - requisição de edição de post por Id.
  - [x] Delete Post - requisição de deleção de posts (somente admin ou quem criou o post pode deleta-lo)
  - [x] Like / Dislike Post - requisição de atulização de likes e dislikes no post.
  - [x] Create Post Comment - requisição de criação de comentários.
  - [x] Get Post Comment - requisição de pesquisa e retorno de comentários em posts.
  - [x] Edit Post Comment- requisição de edição de comentário por Id.
  - [x] Delete Post Comment- requisição de deleção de comentário (somente admin ou quem criou o post pode deleta-lo)
---

## 🚀 Como executar a api

### Configuração do Banco de Dados

### Pré-requisitos
- [MySQL] - Extensão do VSCode para códigos em SQL.

Configuração da conexão com o banco de dados ilustrado na imagem. 

![image](https://github.com/silvaviniciuss/labeddit/blob/f6aa1d95853a0ad0c3e231dabe3dbfd86a2a2ba3/src/assets/images/banco_img.png)

# Criação de tabelas no banco de dados
```
CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        nickname TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL
    );

CREATE TABLE
    posts (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT (0) NOT NULL,
        dislikes INTEGER DEFAULT (0) NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    likes_dislikes_posts (
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    post_comments (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT (0) NOT NULL,
        dislikes INTEGER DEFAULT (0) NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    likes_dislikes_post_comments (
        user_id TEXT NOT NULL,
        post_comment_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (post_comment_id) REFERENCES post_comments(id) ON UPDATE CASCADE ON DELETE CASCADE
    );
```
Executar cada um dos códigos acima presente no arquivo labeddit.sql na pasta database.


### Pré-requisitos API
Ferramentas que devem ser instaladas para a correta execução da API:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
- [Postman](https://www.postman.com/downloads/) ou a sua versão WEB [PostmanWeb](https://web.postman.co)

Ferramenta para edição de códigos:
- [VSCode](https://code.visualstudio.com/)

#### 🎲 Rodando a API

Utilizar os seguintes comandos:
```bash

# Clone este repositório
$ git clone https://github.com/silvaviniciuss/labeddit

# Acesse a pasta do projeto no terminal/cmd
$ cd labeddit

# Para abrir o vsCode
$ code .

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3003 

```

Referencie a documentação da [API](https://documenter.getpostman.com/view/27681045/2s9Xy5LVoc).

### Requisições
```
'http://localhost:3003/'

```

#### Signup
```
http://localhost:3003/users/signup
```
Necessário informar os seguintes dados para cadastro:
```
{
    "nickname": "bandreid",
    "email": "vinicius@email.com",
    "password": "123456"
}
```

Retorna um token .
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVkNDcyOTUyLTFmN2QtNDU4MC1iMTBmLWRlNGQ3MDkzOWUzNCIsIm5hbWUiOiJWaW5pY2l1cyBkYSBTaWx2YSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTE4NjI1NDYsImV4cCI6MTY5MjQ2NzM0Nn0.EuOmBVhK7m6hvzN5aWZioW0qAJ1TcDLv75JDvL7rXZ4"
}
```
Funções adicionais:
- Geração de ID automático.
- Senha (password) Hasheada

#### Login
```
http://localhost:3003/users/login
```
Retorna um token:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4MzNmM2JkLWE3MzUtNGY2NC04YTNkLTAzNDA2YzE2N2U2MyIsIm5hbWUiOiJEYW5pZWxpIEguIEZlcnJlaXJhIiwicm9sZSI6Ik5PUk1BTCIsImlhdCI6MTY5MTg2MjY0NywiZXhwIjoxNjkyNDY3NDQ3fQ.AY3pD8T0toBcRF5XXWMPyve9XEVKvG-rsrswWTBw5Og"
}
```

##### Create Post
```
http://localhost:3003/posts
```
Necessário informar o conteúdo do post:
```
{
    "content": "Segundo Post do Labeddit"
}
```

Funções adicionais:
- Geração de ID automático.
- Validação de token para criação do post.

#### Get Posts
```
http://localhost:3003/posts
```
Retorna todos os posts em um Array de Obejtos [{}].
```
[
    {
        "id": "835eb538-7121-46cb-a2cb-24ddae02835e",
        "content": "Segundo Post do Labeddit(Editado)",
        "likes": 1,
        "dislikes": 0,
        "createdAt": "20/08/2023, 18:49:23",
        "updateAt": "20/08/2023, 18:50:58",
        "creator": {
            "id": "73cf6c23-8e8f-4b72-a408-133a6642a7f9",
            "nickname": "danihf"
        }
    }
]
```
Funções adicionais:
    - Verificação de token para acesso.

```
```
#### Edit Post
```
http://localhost:3003/posts/:id
```
Nescessário informar o parametro do post (id) que desejar editar,
podendo somente alterar o conteúdo do post.

```
{
    "content": "Primeiro Post do Labeddit(Atualizado)"
}
```
Funções adicionais:
    - Vericação de token para acesso.
    - Data de atualização automática.

#### Delete Post
```
http://localhost:3003/posts/:id
```
Necessário informar o parametro do post (id) que desejar deletar.

Funções adicionais:
    - Verificação de token para acesso. Permitindo somente Admin ou quem criou o post excluir o mesmo.

#### Like / Dislike Post
```
http://localhost:3003/posts/:id/like
```
Necessário informar o parametro do post e passar o corpo:
- Para dar like.
```
{
    "like": true
}
```
- Para dar dislike.
```
{
    "like": false
}
```
##### Create Post Comment
```
http://localhost:3003/comments/:id
```
Necessário passar o id do post como parametro e o conteudo no body.
```
{
    "content": "Primeiro Comentário de um post no Labeddit"
}
```

Funções adicionais:
- Geração de ID automático.
- Validação de token para criação do post.

#### Get Comments By Post Id
```
http://localhost:3003/comments/:id
```
Necessário informar o id do post como paramentro.
Retorna todos os comentários do post em um Array de Objetos [{}].
```
[
    {
        "id": "9d62a2eb-bb0e-403b-8221-66a04c5a7f51",
        "post_id": "835eb538-7121-46cb-a2cb-24ddae02835e",
        "content": "Primeiro Comentário do post do labeddit(Editado)",
        "likes": 0,
        "dislikes": 0,
        "createdAt": "20/08/2023, 18:55:31",
        "updateAt": "20/08/2023, 19:04:08",
        "creator": {
            "id": "9c0064e4-edbe-4617-bd12-c3957903a42b",
            "nickname": "bandreid"
        }
    },
    {
        "id": "f29eb4ab-e7e1-4dd4-8d35-43c472e47c52",
        "post_id": "835eb538-7121-46cb-a2cb-24ddae02835e",
        "content": "Segundo Comentário de um post no Labeddit",
        "likes": 0,
        "dislikes": 0,
        "createdAt": "20/08/2023, 19:06:33",
        "updateAt": "20/08/2023, 19:06:33",
        "creator": {
            "id": "9c0064e4-edbe-4617-bd12-c3957903a42b",
            "nickname": "bandreid"
        }
    }
]
```
Funções adicionais:
    - Verificação de token para acesso.

```
```
#### Edit Post Comment
```
http://localhost:3003/comments/:id
```
Nescessário informar o parametro do comentário (id) que desejar editar,
podendo somente alterar o conteúdo do post.

```
{
    "content": "Primeiro Comentário do post do labeddit(Editado)"
}
```
Funções adicionais:
    - Vericação de token para acesso.
    - Data de atualização automática.

#### Delete Post Comment
```
http://localhost:3003/comments/:id
```
Necessário informar o parametro do comentário (id) que desejar deletar.

Funções adicionais:
    - Verificação de token para acesso. Permitindo somente Admin ou quem criou o post excluir o mesmo.

#### Like / Dislike Post Comment
```
http://localhost:3003/comments/:id/like
```
Necessário informar o parametro do comentário e passar o corpo:
- Para dar like.
```
{
    "like": true
}
```
- Para dar dislike.
```
{
    "like": false
}
```

## 🛠 Tecnologias

Ferramentas utilizadas no desenvolvimento do projeto:

-   [NodeJS](https://nodejs.org/en/) - software que permite a execução de JS fora de um navegador WEB.
-   [CORS](https://expressjs.com/en/resources/middleware/cors.html) - biblioteca que permite enviar requisições de uma página hospedada localmente.
-   [APIs & Express](https://expressjs.com/pt-br/) - framework de recursos para impletar funcionalidades em APIs.
-   [TypeScript](https://www.typescriptlang.org/) - linguagem de programação que adiciona tipagem estática ao JS.
-   [ts-node](https://github.com/TypeStrong/ts-node) - ferramenta de compilação de projetos TypeScript.
-   [SQLite](https://github.com/mapbox/node-sqlite3) - banco de dados.
-   [Knex](https://knexjs.org/guide/query-builder.html) - permite que os códigos SQL sejam mais estruturados.
-   [UUID]() - Uuid na versão 4 para geração de IDs.
-   [Env]() - Configuração de variáveis de ambiente.
-   [Json Web Token](https://jwt.io/) - Geração de tokens de acesso.
-   [Bcrypt](https://www.npmjs.com/package/bcrypt) - Senha criptografadas (hash)

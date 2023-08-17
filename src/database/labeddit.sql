-- Active: 1692286419439@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO users (id, name, email, password, role)
VALUES ('u001', 'Vinicius', 'vinicius@email.com', '123456', 'adm');

DROP TABLE users;

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


INSERT INTO posts (id, creator_id, content)
VALUES ('p001', 'u001', 'Primeiro post para teste');

DROP TABLE posts;

CREATE TABLE likes_dislikes (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

INSERT INTO likes_dislikes (
    user_id, post_id, like
) 
VALUES (
    'bcc29ab6-01ff-4c24-8eaf-188d89dc84f9', 
    'b23239ff-7375-4188-49d-92c6a9f68f1e', 
    1
);

DROP TABLE likes_dislikes;

SELECT * FROM likes_dislikes
WHERE user_id = 'bcc29ab6-01ff-4c24-8eaf-188d89dc84f9' AND post_id = 'b23239ff-7375-4188-a49d-92c6a9f68f1e';

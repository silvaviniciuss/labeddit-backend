-- Active: 1692287391872@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    nickname TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO users (id, name, nickname ,email, password, role)
VALUES ('u001', 'Vinicius', 'bandreid01','vinicius@email.com', '123456', 'adm');

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

CREATE TABLE likes_dislikes_posts (
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

CREATE TABLE likes_dislikes_post_comments (
    user_id TEXT NOT NULL,
    post_comment_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (post_comment_id) REFERENCES post_comments(id)
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



CREATE TABLE post_comments (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);
INSERT INTO post_comments (id, creator_id, post_id, content)
VALUES('c002', '1c3c5eda-f390-4a0a-965d-ba54917639b6', '4a40ece4-1b90-4382-9ff7-42e3bc7cedcf', 'Mas o windows não é ruim AHAHAH');
-- vini = 86ea2b7d-f077-4c45-8c20-08a05903567d
-- dani 1c3c5eda-f390-4a0a-965d-ba54917639b6



SELECT 
    post_comments.id, 
    post_comments.creator_id,
    post_comments.content, 
    post_comments.likes, 
    post_comments.dislikes, 
    post_comments.created_at, 
    post_comments.updated_at,
    users.nickname as creator_nickname
FROM post_comments
INNER JOIN users 
ON post_comments.creator_id = users.id
INNER JOIN posts
ON post_comments.post_id = posts.id
WHERE post_comments.post_id = '4a40ece4-1b90-4382-9ff7-42e3bc7cedcf';

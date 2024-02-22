\c nc_news_test

INSERT INTO comments (article_id, username, body) VALUES ($1, $2, $3) RETURNING *,
[article_id, username, body]
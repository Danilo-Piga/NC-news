\c nc_news_test

SELECT * 
FROM comments 
WHERE article_id = ?
ORDER BY created_at DESC
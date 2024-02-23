const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const endpoints = require("../endpoints.json");
const {
  getArticleAllComments,
  addCommentToArticle,
  updateArticleById,
} = require("../Models/getArticle.model");

beforeEach(async () => {
  await seed(testData);
});

afterAll(async () => {
  return await db.end();
});

describe("GET /api/topics", () => {
  test("responds with a 200 status code and array of topic objects with slug and description properties", async () => {
    const response = await request(app).get("/api/topics");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(
      response.body.every((topic) => topic.slug && topic.description)
    ).toBe(true);
  });
});

describe("GET /api", () => {
  test("Returns an object describing all the available endpoints on your API", async () => {
    const response = await request(app).get("/api");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(endpoints);
  });
});

describe("GET /api/articles/:article_id", () => {
  test("should return the article object for a valid article_id", async () => {
    const articleId = 1;
    const response = await request(app).get(`/api/articles/${articleId}`);
    expect(response.status).toBe(200);
    expect(response.body.article).toEqual({
      title: "Living in the shadow of a great man",
      topic: "mitch",
      author: "butter_bridge",
      body: "I find this existence challenging",
      created_at: "2020-07-09T20:11:00.000Z",
      votes: 100,
      article_img_url:
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      article_id: 1,
      comment_count: "11",
    });
  });

  test("should return 404 for an invalid article_id", async () => {
    const invalidArticleId = 999;
    const response = await request(app).get(
      `/api/articles/${invalidArticleId}`
    );

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(
      `Article with ID ${invalidArticleId} not found.`
    );
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("Returns an array of comments for the given article_id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body.comments)).toBe(true);
        expect(Object.keys(res.body.comments[0])).toEqual(
          expect.arrayContaining([
            "comment_id",
            "votes",
            "created_at",
            "author",
            "body",
            "article_id",
          ])
        );
      });
  });
  test("Returns 404, for non-existent article_id", () => {
    return request(app)
      .get("/api/articles/9999/comments")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Article not found");
      });
  });
  test("400: invalid article ID", () => {
    return request(app)
      .get("/api/articles/hello/comments")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Article not found");
      });
  });
  test("200: no comments found", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then((res) => {
        expect(res.body.comments.length).toBe(0);
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("should add a comment for an article", async () => {
    const articleId = 1;
    const newComment = {
      username: "butter_bridge",
      body: "This is a test comment",
    };
    const newAuthor = {
      author: "butter_bridge",
      body: "This is a test comment",
    };
    const response = await request(app)
      .post(`/api/articles/${articleId}/comments`)
      .send(newComment)
      .expect(201);

    expect(response.body).toMatchObject(newAuthor);
  });
  test(`should throw a 404 error if username doesn't exist`, async () => {
    const articleId = 1;
    const newComment = { username: "user_1", body: "This is a test comment" };
    const response = await request(app)
      .post(`/api/articles/${articleId}/comments`)
      .send(newComment)
      .expect(404);

    expect(response.body.message).toMatch(/foreign key constraint/);
  });

  test("should throw an error if any required parameter is missing", async () => {
    const articleId = 1;
    const res1 = await request(app)
      .post(`/api/articles/${articleId}/comments`)
      .send({ username: null, body: "Test body" })
      .expect(400);

    expect(res1.body.error).toBe("Username and body are required");

    const res2 = await request(app)
      .post(`/api/articles/${articleId}/comments`)
      .send({ username: "testuser", body: null })
      .expect(400);

    expect(res2.body.error).toBe("Username and body are required");
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("should update the article's vote count", async () => {
    const articleId = 1;
    const newVote = { inc_votes: 10 };
    const response = await request(app)
      .patch(`/api/articles/${articleId}`)
      .send(newVote)
      .expect(200);

    expect(response.body.votes).toBe(110);
  });

  test("should decrement the article's vote count", async () => {
    const articleId = 1;
    const newVote = { inc_votes: -50 };
    const response = await request(app)
      .patch(`/api/articles/${articleId}`)
      .send(newVote)
      .expect(200);

    expect(response.body.votes).toBe(50);
  });

  test("should return 404 for an invalid article_id", async () => {
    const invalidArticleId = 999;
    const newVote = { inc_votes: 10 };
    const response = await request(app)
      .patch(`/api/articles/${invalidArticleId}`)
      .send(newVote)
      .expect(404);

    expect(response.body.message).toBe(
      `Article with ID ${invalidArticleId} not found.`
    );
  });

  test("should return 400 for missing inc_votes in request body", async () => {
    const articleId = 1;
    const response = await request(app)
      .patch(`/api/articles/${articleId}`)
      .send({})
      .expect(400);

    expect(response.body.error).toBe("inc_votes parameter is required");
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("should delete the comment and respond with status 204", async () => {
    const response = await request(app)
      .delete("/api/comments/1")
      .expect(204);
    expect(response.status).toBe(204);
  });

  test("should return 404 if the comment does not exist", async () => {
    const response = await request(app)
      .delete("/api/comments/9999")
      .expect(404);
    expect(response.body.message).toBe("Comment not found");
  });
});

describe("GET /api/users", () => {
  test("should respond with a successful status code", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200);
  });
  test("should respond with an array of users with expected properties of username, name, and avatar_url", async () => {
    const response = await request(app).get("/api/users");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.users)).toBe(true);
    expect(response.body.users.every(user => (
      user.hasOwnProperty("username") &&
      user.hasOwnProperty("name") &&
      user.hasOwnProperty("avatar_url")
    ))).toBe(true);
  });
  test("should respond with JSON content type", async () => {
    const response = await request(app).get("/api/users");
    expect(response.type).toMatch(/json/);
  });
  test("should return consistent data across multiple requests", async () => {
    const response1 = await request(app).get("/api/users");
    const response2 = await request(app).get("/api/users");
    expect(response1.body.users).toEqual(response2.body.users);
  });
  test("should include a specific user in the response", async () => {
    const specificUsername = "icellusedkars";
    const response = await request(app).get("/api/users");
    const foundUser = response.body.users.find(user => user.username === specificUsername);
    expect(foundUser).toBeDefined();
  });
});

describe("GET /api/articles", () => {
  test("should respond with a successful status code", async () => {
    const response = await request(app).get("/api/articles");
    expect(response.status).toBe(200);
    expect(response.status).toBeLessThan(300);
  });
  test("should return articles for a valid topic query", async () => {
    const response = await request(app).get("/api/articles?topic=mitch");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.articles)).toBe(true);
    expect(response.body.articles.length).toBeGreaterThan(0);
  });
  test("should respond with a successful status code when filtered by topic", async () => {
    const response = await request(app).get("/api/articles?topic=football");
    expect(response.status).toBe(200);
    expect(response.status).toBeLessThan(300);
  });
  test("should return all articles if topic query is omitted", async () => {
    const response = await request(app).get("/api/articles");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.articles)).toBe(true);
    expect(response.body.articles.length).toBeGreaterThan(0);
  });
});
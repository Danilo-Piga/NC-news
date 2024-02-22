const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const endpoints = require("../endpoints.json");
const {
  getArticleAllComments,
  addCommentToArticle,
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
    console.log(response.body);
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

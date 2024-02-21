const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const endpoints = require("../endpoints.json");

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
        created_at: '2020-07-09T20:11:00.000Z',
        votes: 100,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          article_id: 1
      }, );
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

describe('GET /api/articles', () => {
    test('Get: 200 should respond with an array of all article objects with expected properties', () => {
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then((response) => {
            const articles = response.body.articles; 
            expect(articles.length).toBeGreaterThan(0)
            if (articles.length > 0) {
                articles.forEach(article => {
                    expect(article).toHaveProperty('author');
                    expect(article).toHaveProperty('title');
                    expect(article).toHaveProperty('article_id');
                    expect(article).toHaveProperty('topic');
                    expect(article).toHaveProperty('created_at');
                    expect(article).toHaveProperty('votes');
                    expect(article).toHaveProperty('article_img_url');
                    expect(article).toHaveProperty('comment_count');
                });
            } else {
                throw new Error('No articles found in the response');
            }
        });
    });
});


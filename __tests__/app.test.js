const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const endpoints = require("../endpoints.json");
const { getArticleById } = require("../Models/getArticleById.model");

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
    const expectedArticle = await getArticleById(articleId);
    expectedArticle.created_at = new Date(
      expectedArticle.created_at
    ).toISOString();
    const response = await request(app).get(`/api/articles/${articleId}`);
    expect(response.status).toBe(200);
    expect(response.body.article).toEqual(expectedArticle);
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

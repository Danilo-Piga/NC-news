const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");

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

const request = require("supertest");
const app = require("../api_server/app");

describe("POST /api/register", () => {
  describe("when passed a username and password", () => {
    test("should respond with a 200 status code", async () => {
      expect.assertions(1);
      const response = await request(app).post("/api/register").send({
        username: "usernmae",
        password: "password",
      });
      expect(response.statusCode).toBe(200);
    });

    test("should specify json as the content-type in the response header", async () => {
      expect.assertions(1);
      const response = await request(app).post("/api/register").send({
        username: "usernmae",
        password: "password",
      });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("should contain status and message in the response body", async () => {
      expect.assertions(2);
      const response = await request(app).post("/api/register").send({
        username: "usernmae",
        password: "password",
      });
      expect(response.body.status).toBeDefined();
      expect(response.body.message).toBeDefined();
    });
  });

  describe("when the username or password is missing", () => {
    test("should status be 1", async () => {
      expect.assertions(2);
      const response1 = await request(app)
        .post("/api/register")
        .send({ username: "username" });
      const response2 = await request(app)
        .post("/api/register")
        .send({ passowrd: "password" });
      expect(response1.body.status).toBe(1);
      expect(response2.body.status).toBe(1);
    });
  });
});

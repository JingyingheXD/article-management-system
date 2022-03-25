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
  });
});

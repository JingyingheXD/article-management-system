// const request = require("supertest");
// const app = require("../api-server/app");
const db = require("../api-server/db/index");
const db_current = db.db_test;
const userHandler = require("../api-server/router-handler/user");

// describe("register()", () => {
//   describe("when the username exists", () => {
//     beforeEach(() => {
//       db_current.query("DELETE FROM env_users");
//     });
//     test("should call res.cc with argument - 'This usernmae exists, please change another one'.", async () => {
//       const sql =
//         "INSERT INTO env_users (username, password) VALUES ('Jenny', '123456')";
//       db_current.query(sql, (err, results) => {
//         console.log(err);
//       });

//       const req = {
//         body: {
//           username: "Jenny",
//           password: "123456",
//         },
//       };
//       const response = {
//         status: 1,
//         message: "This usernmae exists, please change another one.",
//       };

//       expect(userHandler.register(req, res)).toEqual(response);
//     });
//   });
// });

describe("POST /api/register", () => {
  describe("when passed a username and password", () => {
    test("should respond with a 200 status code", async () => {
      expect.assertions(1);
      const response = await request(app).post("/api/register").send({
        username: "username",
        password: "password",
      });
      expect(response.statusCode).toBe(200);
    });

    test("should specify json as the content-type in the response header", async () => {
      expect.assertions(1);
      const response = await request(app).post("/api/register").send({
        username: "username",
        password: "password",
      });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("should contain status and message in the response body", async () => {
      expect.assertions(2);
      const response = await request(app).post("/api/register").send({
        username: "username",
        password: "password",
      });
      expect(response.body.status).toBeDefined();
      expect(response.body.message).toBeDefined();
    });

    test("should status be 1 if invalid input and be 0 if valid input", async () => {
      expect.assertions(5);
      const response1 = await request(app).post("/api/register").send({
        username: "a",
        password: "password",
      });
      const response2 = await request(app).post("/api/register").send({
        username: "asd#",
        password: "password",
      });
      const response3 = await request(app).post("/api/register").send({
        username: "username",
        password: "123 456",
      });
      const response4 = await request(app).post("/api/register").send({
        username: "username",
        password: "pas",
      });
      const response5 = await request(app).post("/api/register").send({
        username: "anthony",
        password: "asdf1234",
      });
      expect(response1.body.status).toBe(1);
      expect(response2.body.status).toBe(1);
      expect(response3.body.status).toBe(1);
      expect(response4.body.status).toBe(1);
      expect(response5.body.status).toBe(0);
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

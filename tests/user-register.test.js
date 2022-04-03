const request = require("supertest");
const app = require("../api-server/app");
const db = require("../api-server/db/index");
const db_current = db.db_test;

describe("POST /api/register", () => {
  describe("input with invalid username and password", () => {
    beforeEach((done) => {
      db_current.query("DELETE FROM ev_users", (err, results) => {
        if (err) {
          throw done(err);
        } else {
          done();
        }
      });
    });

    test("should respond with status 1 when not pass a username", (done) => {
      request(app)
        .post("/api/register")
        .send({
          password: "password",
        })
        .then((response) => {
          expect(response.body.status).toBe(1);

          const sql = `SELECT COUNT(*) AS user_count FROM ev_users`;
          db_current.query(sql, (err, results) => {
            if (err) throw done(err);
            const rowsNumber = results[0].user_count;
            expect(rowsNumber).toBe(0);
            done();
          });
        });
    });

    // test("should respond with status 1 when username including symbol", async () => {});
    // test("should respond with status 1 when password length less than 6", async () => {});
  });
  // describe("input with valid username and password", () => {
  //   test("should respond with status 1 and message when the username already exists in the database", async () => {});
  //   test("should respond with status 0 and message when the user register successfully", async () => {});
  // });
});

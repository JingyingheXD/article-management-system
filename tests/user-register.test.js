const request = require("supertest");
const app = require("../api-server/app");
const db = require("../api-server/db/index");
const db_current = db.db_test;

describe("POST /api/register", () => {
  beforeEach((done) => {
    db_current.query(`DELETE FROM ev_users`, (err, results) => {
      if (err) {
        throw done(err);
      } else {
        done();
      }
    });
  });

  const respond = (done, userCase, ExpectedStuatus, ExpectedRowsNumber) => {
    const res = request(app)
      .post("/api/register")
      .send(userCase)
      .then((response) => {
        expect(response.body.status).toBe(ExpectedStuatus);

        const sql = `SELECT COUNT(*) AS user_count FROM ev_users`;
        db_current.query(sql, (err, results) => {
          if (err) throw done(err);
          const rowsNumber = results[0].user_count;
          expect(rowsNumber).toBe(ExpectedRowsNumber);
          done();
        });
      })
      .catch((e) => {
        throw done(e);
      });
  };

  describe("input with invalid username and password", () => {
    test("should respond with status 1 and no database changes when not pass a username", (done) => {
      const userCase1 = {
        password: "password",
      };
      respond(done, userCase1, 1, 0);
    });

    test("should respond with status 1 and no database changes when username including symbols", (done) => {
      const userCase2 = {
        username: "username!@#",
        password: "password",
      };
      respond(done, userCase2, 1, 0);
    });

    test("should respond with status 1 and no database changes when password length less than 6", (done) => {
      const userCase3 = {
        username: "username",
        password: "pwd",
      };
      respond(done, userCase3, 1, 0);
    });
  });

  describe("input with valid username and password", () => {
    test("should respond with status 1 and no database changes when the username already exists in the database", (done) => {
      db_current.query(
        `INSERT INTO ev_users (username, password) VALUES ('Jane', 'asdfgh')`,
        (err, results) => {
          if (err) throw done(err);
          const userCase4 = {
            username: "Jane",
            password: "123456",
          };
          respond(done, userCase4, 1, 1);
        }
      );
    });

    test("should respond with status 0 and insert a row into database when the user register successfully", (done) => {
      const userCase5 = {
        username: "Jenny",
        password: "098765",
      };
      respond(done, userCase5, 0, 1);
    });
  });
});

const { string } = require("joi");
const request = require("supertest");
const app = require("../api-server/app");
const db = require("../api-server/db/index");
const db_current = db.db_test;
const bcrypt = require("bcryptjs");

const existedUsername = "Jane";
const existedPassword = "123456";
const encryptExistedPassword = bcrypt.hashSync(existedPassword, 10);

describe("POST /api/login", () => {
  beforeEach((done) => {
    const sql1 = `DELETE FROM ev_users`;
    db_current.query(sql1, (err, results) => {
      if (err) throw done(err);

      const sql2 = `INSERT INTO ev_users SET ?`;
      db_current.query(
        sql2,
        { username: existedUsername, password: encryptExistedPassword },
        (err, results) => {
          if (err) throw done(err);
          done();
        }
      );
    });
  });

  function respond(done, userCase, ExpectedStuatus, ExpectedRowsNumber) {
    const res = request(app)
      .post("/api/login")
      .send(userCase)
      .then((response) => {
        expect(response.body.status).toBe(ExpectedStuatus);

        if (response.body.status === 0) {
          expect(response.body).toHaveProperty("token");
        }

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
  }

  describe("input with invalid username and password", () => {
    test("should respond with status 1 and no database changes when not pass a password", (done) => {
      const userCase1 = {
        username: "username",
      };
      respond(done, userCase1, 1, 1);
    });
    test("should respond with status 1 and no database changes when username length more than 11", (done) => {
      const userCase2 = {
        username: "usernameusername",
        password: "password",
      };
      respond(done, userCase2, 1, 1);
    });
    test("should respond with status 1 and no database changes when password including space", (done) => {
      const userCase3 = {
        username: "username",
        password: "pass word",
      };
      respond(done, userCase3, 1, 1);
    });
  });

  describe("input with valid username and password", () => {
    test("should respond with status 1 and no database changes when username not exist in the database", (done) => {
      const userCase4 = {
        username: "Jenny",
        password: "123456",
      };
      respond(done, userCase4, 1, 1);
    });
    test("should respond with status 1 and no database changes when pass the wrong password", (done) => {
      const userCase5 = {
        username: "Jane",
        password: "password",
      };
      respond(done, userCase5, 1, 1);
    });
    test("should respond with status 0 and a token and no database changes when pass the correct username and password", (done) => {
      const userCase6 = {
        username: existedUsername,
        password: existedPassword,
      };
      respond(done, userCase6, 0, 1);
    });
  });
});

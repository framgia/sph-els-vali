const { myapp } = require("../../app");
const request = require("supertest");
const { User } = require("../../models");
const bcrypt = require("bcrypt");

const app = myapp();

describe("POST /admin/login", () => {
  it("Email validation should fail if input is not an email", async () => {
    const response = await request(app).post("/admin/login").send({
      email: "aasfs",
      password: "12345fh",
    });

    expect(response.statusCode).toBe(422);
    expect(JSON.parse(response.text).error).toBe("Incorrect email or password");
  });

  it("Password validation should fail if the input length less than 5", async () => {
    const response = await request(app).post("/admin/login").send({
      email: "aasfs@gmail.com",
      password: "12",
    });

    expect(response.statusCode).toBe(422);
    expect(JSON.parse(response.text).error).toBe("Incorrect email or password");
  });

  it("Should fail if the email does not exist", async () => {
    const response = await request(app).post("/admin/login").send({
      email: "aasfs@gmail.com",
      password: "12345345",
    });

    expect(response.statusCode).toBe(422);
    expect(JSON.parse(response.text).error).toBe("Incorrect email or password");
  });

  it("Should fail if the user is not an admin", async () => {
    const spy = jest
      .spyOn(User, "findOne")
      .mockImplementation(() => Promise.resolve({ admin: false }));

    const response = await request(app).post("/admin/login").send({
      email: "aasfs@gmail.com",
      password: "12345345",
    });

    expect(response.statusCode).toBe(422);
    expect(JSON.parse(response.text).error).toBe("Incorrect email or password");

    spy.mockClear();
  });

  it("Should fail if password is incorrect", async () => {
    const spy = jest
      .spyOn(User, "findOne")
      .mockImplementation(() =>
        Promise.resolve({ admin: true, password: "password" })
      );

    const response = await request(app).post("/admin/login").send({
      email: "aasfs@gmail.com",
      password: "12345345",
    });

    expect(response.statusCode).toBe(422);
    expect(JSON.parse(response.text).error).toBe("Incorrect email or password");

    spy.mockClear();
  });

  it("Admin login succeed", async () => {
    const spy = jest
      .spyOn(User, "findOne")
      .mockImplementation(() =>
        Promise.resolve({ admin: true, password: "password", id: 1 })
      );

    jest
      .spyOn(bcrypt, "compare")
      .mockImplementation(() => Promise.resolve(true));

    const response = await request(app).post("/admin/login").send({
      email: "aasfs@gmail.com",
      password: "12345345",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.text).id).toBe(1);
    expect(JSON.parse(response.text).token).toEqual(expect.anything());

    spy.mockClear();
  });
});

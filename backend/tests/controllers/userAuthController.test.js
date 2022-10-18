const { myapp } = require("../../app");
const request = require("supertest");
const { User } = require("../../models");
const bcrypt = require("bcrypt");

const app = myapp();

describe("POST /signup", () => {
  it("First name validation should fail if input length less than 1", async () => {
    jest.spyOn(User, "findOne").mockImplementation(() => Promise.resolve(null));
    const response = await request(app).post("/signup").send({
      first_name: "",
      last_name: "aa",
      email: "aasfs@mail.com",
      password: "12345fh",
    });

    expect(response.statusCode).toBe(422);
    expect(JSON.parse(response.text).error).toBe(
      "Please enter valid first name"
    );
  });

  it("Last name validation should fail if input length less than 1", async () => {
    const spy = jest
      .spyOn(User, "findOne")
      .mockImplementation(() => Promise.resolve(null));
    const response = await request(app).post("/signup").send({
      first_name: "aa",
      last_name: "",
      email: "aasfs@mail.com",
      password: "12345fh",
    });

    expect(response.statusCode).toBe(422);
    expect(JSON.parse(response.text).error).toBe(
      "Please enter valid last name"
    );

    spy.mockClear();
  });

  it("Email validation should fail if input is not an email", async () => {
    const response = await request(app).post("/signup").send({
      first_name: "aa",
      last_name: "aa",
      email: "aasfs",
      password: "12345fh",
    });

    expect(response.statusCode).toBe(422);
    expect(JSON.parse(response.text).error).toBe("Please enter a valid email");
  });

  it("Email validation should fail if the email already exists in db", async () => {
    const spy = jest
      .spyOn(User, "findOne")
      .mockImplementation(() => Promise.resolve([]));
    const response = await request(app).post("/signup").send({
      first_name: "aa",
      last_name: "aa",
      email: "aasfs@mail.com",
      password: "12345fh",
    });

    expect(response.statusCode).toBe(422);
    expect(JSON.parse(response.text).error).toBe(
      "The Email is already exist, please try with another email"
    );

    spy.mockClear();
  });

  it("Password validation should fail if the input length less than 5", async () => {
    const spy = jest
      .spyOn(User, "findOne")
      .mockImplementation(() => Promise.resolve(null));
    const response = await request(app).post("/signup").send({
      first_name: "aa",
      last_name: "aa",
      email: "aasfs@mail.com",
      password: "123",
    });

    expect(response.statusCode).toBe(422);
    expect(JSON.parse(response.text).error).toBe(
      "Password should be at least 5 character long, please also make sure there is no white spaces"
    );
    spy.mockClear();
  });

  it("The signup request should succeed", async () => {
    const user = {
      first_name: "aa",
      last_name: "aa",
      email: "aasfs@mail.com",
      password: "1234567",
    };

    const spy = jest
      .spyOn(User, "create")
      .mockImplementation(() => Promise.resolve(user));

    const response = await request(app).post("/signup").send(user);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.text).message).toBe("User created");
    spy.mockClear();
  });
});

describe("POST /login", () => {
  it("Email validation should fail if input is not an email", async () => {
    const response = await request(app).post("/login").send({
      email: "aasfs",
      password: "12345fh",
    });

    expect(response.statusCode).toBe(422);
    expect(JSON.parse(response.text).error).toBe("Incorrect email or password");
  });

  it("Password validation should fail if the input length less than 5", async () => {
    const response = await request(app).post("/login").send({
      email: "aasfs@gmail.com",
      password: "12",
    });

    expect(response.statusCode).toBe(422);
    expect(JSON.parse(response.text).error).toBe("Incorrect email or password");
  });

  it("If email does not match it should fail", async () => {
    jest.spyOn(User, "findOne").mockImplementation(() => Promise.resolve(null));

    const response = await request(app).post("/login").send({
      email: "aasfs@gmail.com",
      password: "12gfgfg1",
    });

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.text).error).toBe("Incorrect email or password");
    expect(JSON.parse(response.text).resend_flag).toBe(true);
  });

  it("If password does not match it should fail", async () => {
    jest
      .spyOn(User, "findOne")
      .mockImplementation(() => Promise.resolve({ password: "password" }));
    jest
      .spyOn(bcrypt, "compare")
      .mockImplementation(() => Promise.resolve(false));

    const response = await request(app).post("/login").send({
      email: "aasfs@gmail.com",
      password: "12gfgfg1",
    });

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.text).error).toBe("Incorrect email or password");
    expect(JSON.parse(response.text).resend_flag).toBe(true);
  });

  it("If user email is not verified, login should fail", async () => {
    jest
      .spyOn(User, "findOne")
      .mockImplementation(() =>
        Promise.resolve({ password: "password", verified: false })
      );
    jest
      .spyOn(bcrypt, "compare")
      .mockImplementation(() => Promise.resolve(true));

    const response = await request(app).post("/login").send({
      email: "aasfs@gmail.com",
      password: "12gfgfg1",
    });

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.text).error).toBe("You are not verified");
    expect(JSON.parse(response.text).resend_flag).toBe(false);
  });

  it("Login succeed", async () => {
    jest
      .spyOn(User, "findOne")
      .mockImplementation(() =>
        Promise.resolve({ password: "password", verified: true, id: 1 })
      );
    jest
      .spyOn(bcrypt, "compare")
      .mockImplementation(() => Promise.resolve(true));

    const response = await request(app).post("/login").send({
      email: "aasfs@gmail.com",
      password: "12gfgfg1",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.text).id).toBe(1);
    expect(JSON.parse(response.text).token).toEqual(expect.anything());
    expect(JSON.parse(response.text).resend_flag).toBe(true);
  });
});

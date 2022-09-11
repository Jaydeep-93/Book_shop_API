const request = require("supertest");
const app = require("../index");
const User = require("../src/model/user");

describe("User CRUD operation", () => {
  beforeAll(async () => {
    await User.deleteMany();
  });

  let userId = null;

  it("create user", async () => {
    // ARRANGE
    const user = { email: "user@test", password: "123" };

    // ACT
    const response = await request(app).post("/user").send(user);

    userId = response.body.result._id;

    // ASSERT
    expect(response).toHaveProperty("status", 201);
  });

  it("get user by Id", async () => {
    // ARRANGE
    // userId

    // ACT
    const response = await request(app).get(`/user/${userId}`).send();


    // ASSERT
    expect(response).toHaveProperty("status", 200);
  });

  it("login user with email password", async () => {
    // ARRANGE
    const user = { email: "user@test", password: "123" };

    // ACT
    const response = await request(app).get("/user/login").send(user);


    // ASSERT
    expect(response).toHaveProperty("status", 200);
  });

  it("get all users", async () => {
    // ARRANGE

    // ACT
    const response = await request(app).get("/user").send();

    // ASSERT
    expect(response).toHaveProperty("status", 200);
  });

  it("update user by id", async () => {
    // ARRANGE
    const user = {
      _id: userId,
      email: "user@test__updated",
      password: "123__updated",
    };

    // ACT
    const response = await request(app).put(`/user/${userId}`).send(user);

    // ASSERT
    expect(response).toHaveProperty("status", 200);
  });

  it("delete user by id", async () => {
    // ARRANGE
    // userId

    // ACT
    const response = await request(app).delete(`/user/${userId}`).send();

    // ASSERT
    expect(response).toHaveProperty("status", 200);
  });

  it("delete all users", async () => {
    // ARRANGE

    // ACT
    const response = await request(app).delete('/user/deleteAll').send();

    // ASSERT
    expect(response).toHaveProperty("status", 200);
  });
});

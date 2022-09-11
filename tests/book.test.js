const request = require("supertest");
const app = require("../index");
const Book = require("../src/model/book");

describe("Book CRUD testing", () => {
  beforeAll(async () => {
    await Book.deleteMany();
  });

  let bookId = null;

  test("Create book", async () => {
    // ARRANGE
    const book = {
      name: "Harry porter",
      category: "Witchcraft",
      price: 12.99,
    };

    // ACT
    const resultOfCreation = await request(app).post("/book").send(book);

    // ASSERT
    bookId = resultOfCreation.body.result._id;
    expect(resultOfCreation.body).toHaveProperty(
      "message",
      "Book created successfully :)"
    );
    expect(resultOfCreation).toHaveProperty("status", 201);
  });

  test("Get Book by Id", async () => {
    // ARRANGE
    // bookId

    // ACT
    const result = await request(app).get(`/book/${bookId}`).send();

    // ASSERT
    expect(result.body).toHaveProperty("message", "Requested book found :)");
    expect(result).toHaveProperty("status", 200);
  });

  test("Get all books", async () => {
    // ARRANGE

    // ACT
    const books = await request(app).get("/book").send();

    // ASSERT
    expect(books.body).toHaveProperty(
      "message",
      "Books fetched successFully :)"
    );
    expect(books).toHaveProperty("status", 200);
  });

  test("update Book by Id", async () => {
    // ARRANGE
    const data = {
      _id: bookId,
      name: "updated Harry porter",
      category: "updated Witchcraft",
      price: 13.99,
    };

    // ACT
    const result = await request(app).put(`/book/${data._id}`).send(data);

    // ASSERT
    expect(result.body).toHaveProperty(
      "message",
      "Book updated successFully :)"
    );
    expect(result).toHaveProperty("status", 200);
  });

  test("delete Book by Id", async () => {
    // ARRANGE
    // bookId

    // ACT
    const result = await request(app).delete(`/book/${bookId}`).send();

    // ASSERT
    expect(result.body).toHaveProperty(
      "message",
      "Book deleted successfully :)"
    );
    expect(result).toHaveProperty("status", 201);
  });

  test("delete all books", async () => {
    // ARRANGE

    // ACT
    const result = await request(app).delete("/book/deleteAll").send();

    // ASSERT
    expect(result.body).toHaveProperty(
      "message",
      "Deleted all books sucessfully"
    );
    expect(result).toHaveProperty("status", 200);
  });
});

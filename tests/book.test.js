jest.setTimeout(10000);
const mathFunction = require("../math");

describe("Testing functionality of temprature converter", () => {
  it("Convert F to C", () => {
    // ARRANGE
    const input = 32;

    // ACT
    const result = mathFunction.fahrenheitToCelsius(input);

    // ASSERT
    expect(result).toBe(0);
  });

  it("Convert C to F", () => {
    // ARRANGE
    const input = 0;

    // ACT
    const result = mathFunction.celsiusToFahrenheit(input);

    // ASSERT
    expect(result).toBe(32);
  });
});

describe("test settimeout", () => {
  it("test async funtion", (done) => {
    setTimeout(() => {
      expect(1).toBe(1);
      done();
    }, 2000);
  });
});

describe("test to check async function", () => {
  it("test async addition", (done) => {
    // ARRANGE
    const num1 = 10;
    const num2 = 20;

    // ACT
    mathFunction.add(num1, num2).then((value) => {
      // ASSERT
      expect(value).toBe(30);
      done();
    });
  });
});

describe("test to check async function", () => {
  it("test async addition with await", async () => {
    // ARRANGE
    const num1 = 20;
    const num2 = 10;

    // ACT
    const result = await mathFunction.add(num1, num2);

    // ASSERT
    expect(result).toBe(30);
  });
});

// Goal: Test temperature conversion functions
//
// 1. Export both functions and load them into test suite
// 2. Create "Should convert 32 F to 0 C"
// 3. Create "Should convert 0 C to 32 F"
// 4. Run the Jest to test your work!

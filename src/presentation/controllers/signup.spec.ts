import { SignUpController } from "./signup";

describe("Signup Controller", () => {
  test("Should return 400 if no name is provided", async () => {
    //system under test
    const sut = new SignUpController();

    const httpRequest = {
      body: {
        email: "any_email@email.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse).toHaveProperty("code");
    expect(httpResponse.code).toBe(400);
    expect(httpResponse.body).toEqual(new Error("Missing param: name"));
  });

  test("Should return 400 if no email is provided", async () => {
    //system under test
    const sut = new SignUpController();

    const httpRequest = {
      body: {
        name: "any_name",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse).toHaveProperty("code");
    expect(httpResponse.code).toBe(400);
    expect(httpResponse.body).toEqual(new Error("Missing param: email"));
  });
});

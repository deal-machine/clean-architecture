import { SignUpController } from "./signup";

describe("Signup Controller", () => {
  test("Should return 400 if no name is provided", async () => {
    //system under test
    const sut = new SignUpController();

    const httpRequest = {
      body: {
        email: "",
        password: "",
        passwordConfirmation: "",
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse).toHaveProperty("code");
    expect(httpResponse.code).toBe(400);
  });
});

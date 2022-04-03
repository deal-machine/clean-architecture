import { SignUpController } from "./signup";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { MissingParamError } from "../errors/missing-param-error";
import { InvalidParamError } from "../errors/invalid-param-error";
import { ServerError } from "../errors/server-error";
import { EmailValidator } from "../protocols/email-validator";

interface MakeSutTypes {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
}

//system under test
const makeSut = (): MakeSutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  const emailValidatorStub = new EmailValidatorStub();
  const sut = new SignUpController(emailValidatorStub);

  return {
    sut,
    emailValidatorStub,
  };
};

describe("Signup Controller", () => {
  test("Should return 400 if no name is provided", () => {
    const { sut } = makeSut();

    const httpRequest: HttpRequest = {
      body: {
        email: "any_email@email.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    const httpResponse: HttpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  test("Should return 400 if no email is provided", () => {
    const { sut } = makeSut();

    const httpRequest: HttpRequest = {
      body: {
        name: "any_name",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    const httpResponse: HttpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  test("Should return 400 if no password is provided", () => {
    const { sut } = makeSut();

    const httpRequest: HttpRequest = {
      body: {
        name: "any_name",
        email: "any_email@email.com",
        passwordConfirmation: "any_password",
      },
    };

    const httpResponse: HttpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });

  test("Should return 400 if no password is provided", () => {
    const { sut } = makeSut();

    const httpRequest: HttpRequest = {
      body: {
        name: "any_name",
        email: "any_email@email.com",
        password: "any_password",
      },
    };

    const httpResponse: HttpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError("passwordConfirmation")
    );
  });

  test("Should return 400 if an invalid email is provided", () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);

    const httpRequest: HttpRequest = {
      body: {
        name: "any_name",
        email: "invalidEmail@email.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    const httpResponse: HttpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("email"));
  });

  test("Should be able validate EmailValidator with correct email", () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");
    const httpRequest: HttpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    const httpResponse = sut.handle(httpRequest);
    // console.log(httpResponse);
    expect(isValidSpy).toHaveBeenCalledWith("any_email@mail.com");
  });

  test("Should return 500 if EmailValidator throws", () => {
    class EmailValidatorStub implements EmailValidator {
      isValid(email: string): boolean {
        throw new Error("");
      }
    }
    const emailValidatorStub = new EmailValidatorStub();
    const sut = new SignUpController(emailValidatorStub);

    const httpRequest: HttpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});

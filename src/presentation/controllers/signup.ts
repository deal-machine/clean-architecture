import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse,
} from "../protocols";
import { MissingParamError, InvalidParamError } from "../errors";
import { badRequest, serverError } from "../helpers/http-helper";

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        "name",
        "email",
        "password",
        "passwordConfirmation",
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field])
          return badRequest(new MissingParamError(field));
      }

      const isValidEmail = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValidEmail) return badRequest(new InvalidParamError("email"));

      const isPasswordConfirmationValid =
        httpRequest.body.password !== httpRequest.body.passwordConfirmation;
      if (isPasswordConfirmationValid)
        return badRequest(new InvalidParamError("passwordConfirmation"));
    } catch (error) {
      return serverError();
    }
  }
}

import { Encrypter } from "../../protocols/encrypter";
import { DbAddAccount } from "./db-add-account";

interface SutTypes {
  sut: DbAddAccount;
  encrypterStub: Encrypter;
}

const makeEncrypter = () => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_value"));
    }
  }
  return new EncrypterStub();
};

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  return {
    encrypterStub,
    sut: new DbAddAccount(encrypterStub),
  };
};

describe("DbAddAccount Usecase", () => {
  test("Should call the Encrypter with the correct password", async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, "encrypt");
    const account = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    await sut.add(account);
    expect(encryptSpy).toHaveBeenCalledWith("valid_password");
  });
});

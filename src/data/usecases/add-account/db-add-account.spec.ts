import { Encrypter } from "../../protocols/encrypter";
import { DbAddAccount } from "./db-add-account";

describe("DbAddAccount Usecase", () => {
  test("Should call the encrypter", async () => {
    class EncrypterStub implements Encrypter {
      async encrypt(value: string): Promise<string> {
        return new Promise((resolve) => resolve("hashed_value"));
      }
    }
    const encrypterStub = new EncrypterStub();
    const sut = new DbAddAccount(encrypterStub);
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

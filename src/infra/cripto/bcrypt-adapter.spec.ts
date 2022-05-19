import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";

jest.mock("bcrypt", () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve("hash_value"));
  },
}));

const salt = 12;

describe("Bcrypt Adapter", () => {
  test("Should be call Bcryp with correct value", async () => {
    const sut = new BcryptAdapter(salt);
    const bcryptSpy = jest.spyOn(bcrypt, "hash");
    await sut.encrypt("any_value");
    expect(bcryptSpy).toHaveBeenCalledWith("any_value", salt);
  });
  test("Should return hashed on success", async () => {
    const sut = new BcryptAdapter(salt);
    const hash = await sut.encrypt("any_value");
    expect(hash).toEqual("hash_value");
  });
});

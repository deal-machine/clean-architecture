import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";

describe("Bcrypt Adapter", () => {
  test("Should be call Bcryp with correct value", async () => {
    const salt = 12;
    const sut = new BcryptAdapter(salt);
    const bcryptSpy = jest.spyOn(bcrypt, "hash");
    await sut.encrypt("valid_value");

    expect(bcryptSpy).toHaveBeenCalledWith("valid_value", salt);
  });
});

import { MongoHelper } from "../helpers/mongodb-helper";
import { AccountMongodbRepository } from "./account";

const makeSut = (): AccountMongodbRepository => {
  return new AccountMongodbRepository();
};

describe("Account Mongo Repository", () => {
  beforeAll(async () => MongoHelper.connect(process.env.MONGO_URL));
  beforeEach(async () => MongoHelper.clearCollection("accounts"));
  afterAll(async () => MongoHelper.disconnect());

  test("Should return an account on success", async () => {
    const sut = makeSut();
    const account = await sut.add({
      name: "any_name",
      email: "any_mail@mail.com",
      password: "any_password",
    });
    expect(account).toHaveProperty("id");
    expect(account.id).toBeTruthy();
    expect(account.name).toEqual("any_name");
    expect(account.email).toEqual("any_mail@mail.com");
    expect(account.password).toEqual("any_password");
  });
});

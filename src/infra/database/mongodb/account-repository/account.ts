import { MongoHelper } from "../helpers/mongodb-helper";
import {
  AddAccountModel,
  AddAccountRepository,
  AccountModel,
} from "./account-protocols";

export class AccountMongodbRepository implements AddAccountRepository {
  async add(account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection("accounts");
    const { insertedId } = await accountCollection.insertOne(account);
    return {
      id: insertedId.toString(),
      name: account.name,
      email: account.email,
      password: account.password,
    };
  }
}

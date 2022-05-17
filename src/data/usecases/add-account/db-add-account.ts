import {
  AddAccount,
  AddAccountModel,
  AccountModel,
  Encrypter,
  AddAccountRepository,
} from "./db-add-account-protocols";

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter;
  private readonly addAccountRepository: AddAccountRepository;

  constructor(
    encrypter: Encrypter,
    addAccountRepository: AddAccountRepository
  ) {
    this.encrypter = encrypter;
    this.addAccountRepository = addAccountRepository;
  }

  async add({ name, email, password }: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(password);
    return await this.addAccountRepository.add({
      name,
      email,
      password: hashedPassword,
    });
  }
}

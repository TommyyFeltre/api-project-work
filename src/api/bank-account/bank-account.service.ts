import { BankAccount } from './bank-account.entity';
import { BankAccount as BanckAccountModel } from './bank-account.model';
import { User } from '../user/user.entity';

export class BankAccountService {

  async add(user: User): Promise<BankAccount> {
    const newItem = await BanckAccountModel.create({user: user});
    await newItem.populate('user');
    return newItem;
  }

  async BankAccountId(iban: string): Promise<string> {
    const bankAccount = await BanckAccountModel.findOne({ iban });
    return bankAccount?.id;
  }
}

export default new BankAccountService();
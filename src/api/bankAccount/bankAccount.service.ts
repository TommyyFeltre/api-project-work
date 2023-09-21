import { assign } from 'lodash';
import { NotFoundError } from '../../errors/not-found';
import { BankAccount } from './bankAccount.entity';
import { BankAccounts as BanckAccountModel } from './bankAccount.model';
import { User } from '../user/user.entity';

export class BankAccountService {

  async add(user: User): Promise<BankAccount> {
    const newItem = await BanckAccountModel.create({user: user});
    await newItem.populate('user');
    return newItem;
  }
}

export default new BankAccountService();
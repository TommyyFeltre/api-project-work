import { Types } from "mongoose";
import { NotFoundError } from "../../errors/not-found";
import { Transaction } from "./transaction.entity";
import { Transaction as TransactionModel } from "./transaction.model";
import { BankAccount } from "../bank-account/bank-account.entity";
import categoryService from "../category/category.service";
import { InsufficientBalance } from "../../errors/insufficient balance";

export class TransactionService {
  async addInit(transaction: Transaction): Promise<Transaction> {
    const newTransaction = await TransactionModel.create({ ...transaction });
    await newTransaction.populate('bankAccount category');
    return newTransaction;
  }

  private async findLastTrans(bankAccount: string | Types.ObjectId | BankAccount): Promise<Transaction> {
    const lastTransaction = await TransactionModel.findOne({ bankAccount })
      .sort({ date: -1 })
      .limit(1)
      .populate('bankAccount category')
    if (lastTransaction) {
      return lastTransaction;
    } else {
      throw new NotFoundError();
    }
  }

  async add(transaction: Transaction): Promise<Transaction> {
    const lastTransaction = await this.findLastTrans(transaction.bankAccount);
    const category = await categoryService.typeCategory(transaction.category);
    let balance = 0;
    if (category.type === 'Uscita') {
      balance = lastTransaction.balance! - transaction.amount;
    }
    if (category.type === 'Entrata') {
      balance = lastTransaction.balance! + transaction.amount;
    }
    if (balance < 0) {
      throw new InsufficientBalance();
    }
    const newTransaction = await TransactionModel.create({ ...transaction, balance });
    await newTransaction.populate('bankAccount category balance');
    return newTransaction;
  }

  async find(
    bankAccount: string, 
    record?: number, 
    category?: string,
    firstDate?: Date,
    secondDate?: Date
  ): Promise<Transaction[]> {
    // if (!record && category && !firstDate && !secondDate) {
    //   const transactions = await TransactionModel.find({ bankAccount, category })
    //     .sort({ date: -1 })
    //     .populate('bankAccount category')
    //   return transactions;
    // }
    // if (record && !category && !firstDate && !secondDate) {
    //   const transactions = await TransactionModel.find({ bankAccount })
    //     .sort({ date: -1 })
    //     .limit(record!)
    //     .populate('bankAccount category')
    //   return transactions;
    // }
    // if (record && category && !firstDate && !secondDate) {
    //   const transactions = await TransactionModel.find({ bankAccount, category })
    //     .sort({ date: -1 })
    //     .limit(record)
    //     .populate('bankAccount category')
    //   return transactions;
    // }
    // if (record && firstDate && secondDate) {
    //   const transactions = await TransactionModel.find({
    //     bankAccount,
    //     date: {
    //       $gte: firstDate,
    //       $lte: secondDate
    //     }
    //   })
    //     .sort({ date: -1 })
    //     .limit(record)
    //     .populate('bankAccount category')

    //   return transactions;
    // }

    /* ritorna la lista completa*/
    const transactions = TransactionModel.find({ bankAccount })

    if(record){
      transactions.limit(record);
    }
    if(category){
      transactions.find({category})
    }
    if(firstDate && secondDate){
      transactions.find({
        date: {
          $gte: firstDate,
          $lte: secondDate
        }
      })
    }
    const query = await transactions.sort({ date: -1 }).populate('bankAccount category').exec()
    
    return query;
  }

  async phoneTopUp(transaction: Transaction): Promise<Transaction> {
    const lastTransaction = await this.findLastTrans(transaction.bankAccount);
    const balance = lastTransaction.balance! - transaction.amount;
    if (balance < 0) {
      throw new InsufficientBalance();
    }

    const newTransaction = await TransactionModel.create({ ...transaction, balance })
    await newTransaction.populate('bankAccount category balance');
    return newTransaction;
  }

  async bankTransfer(transaction: Transaction): Promise<Transaction> {
    const lastTransaction = await this.findLastTrans(transaction.bankAccount);
    const balance = lastTransaction.balance! - transaction.amount;
    if (balance < 0) {
      throw new InsufficientBalance();
    }
    const newTransaction = await TransactionModel.create({ ...transaction, balance })
    await newTransaction.populate('bankAccount category balance');
    return newTransaction;
  }
}

export default new TransactionService();
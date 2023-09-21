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
        if(lastTransaction) {
            return lastTransaction;
        } else {
            throw new NotFoundError();
        }
    }

    async add(transaction: Transaction): Promise<Transaction> {
        const lastTransaction = await this.findLastTrans(transaction.bankAccount);
        const category = await categoryService.typeCategory(transaction.category);
        const currentBalance = lastTransaction.balance! += transaction.amount; 
        if(category.type === 'Uscita' && currentBalance < 0) {
            throw new InsufficientBalance();
        }
        const newTransaction = await TransactionModel.create({ ...transaction, balance: currentBalance });
        await newTransaction.populate('bankAccount category');
        return newTransaction;
    }
}

export default new TransactionService();
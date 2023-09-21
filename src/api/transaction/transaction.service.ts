import { NotFoundError } from "../../errors/not-found";
import { Transaction } from "./transaction.entity";
import { Transaction as TransactionModel } from "./transaction.model";

export class TransactionService {
    async addInit(transaction: Transaction): Promise<Transaction> {
        const newTransaction = await TransactionModel.create({ ...transaction });
        await newTransaction.populate('bankAccount category');
        return newTransaction;
    }

    private async findLastTrans(bankAccount: string): Promise<Transaction> {
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
}

export default new TransactionService();
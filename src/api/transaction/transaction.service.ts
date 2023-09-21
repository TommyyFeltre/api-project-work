import { Transaction } from "./transaction.entity";
import { Transaction as TransactionModel } from "./transaction.model";

export class TransactionService {
    async add(transaction: Transaction) {
        const newTransaction = await TransactionModel.create({ ...transaction })
        return ;
    }

    // private async findSaldo() {
    //     const list = await 
    // }
}
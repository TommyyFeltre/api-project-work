import { Transactions } from "./transactions.model";


export class TransactionService{
    

    async bankTransfer(amount: number, accountId: string, description: string, tipology: string){
        const transactionDate = new Date();
        const balance = await (this.getBalance(accountId)).toString();
        const numericBalance = parseInt(balance);
        const newBalance = numericBalance - amount;
        const newTransaction = await Transactions.create({date: transactionDate, amount: amount, balance: newBalance, description: description, bankAccountId: accountId, category: tipology});
    await newTransaction.populate("category, bankAccountId");
    return newTransaction;
    }


    async getBalance(id: string){
        return Transactions.findOne({_bankAccountId: id}).populate("category, bankAccountId");
    }

}export default new TransactionService();
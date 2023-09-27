import { last } from "lodash";
import { Account } from "../bankAccount/bankAccount.model";
import { CategoryMovement } from "../categoryMovement/categoryMovement.model";
import { Transactions } from "./transactions.model";
import { Transactions as iTransactions } from "./transactions.entity";


export class TransactionService{
    

    async bankTransfer(amount: number, accountId: string, description: string, tipology: string){
        
        const transactionDate = new Date();
        const balance = await (this.getBalance(accountId)).toString();
        const numericBalance = parseInt(balance);
        const newBalance = numericBalance - amount;
        const newTransaction = await Transactions.create({date: transactionDate, amount: amount, balance: newBalance, description: description, bankAccount: accountId, category: tipology});
    await newTransaction.populate("category bankAccount");
    return newTransaction;
    }


    async getBalance(id: string){
        return Transactions.findOne({_bankAccount: id}).populate("category bankAccount");
    }

    async getMovements(numMov: number): Promise<iTransactions[]>{

        const movements = Transactions.find().limit(numMov).sort({ date: -1 }).populate("category bankAccount");
        //await movements.populate("category bankAccountId");
        return movements;
    }

    async getMovementsByCategory(numMov: number, catMov: string){

        
      const movementsByCategory = Transactions.find({category:catMov}).limit(numMov).sort({ date: -1 }).populate("category bankAccount").select("-balance");;
      //await movementsByCategory.populate("category bankAccountId");
      return movementsByCategory;
    }

    async getMovementsByPeriod(numMov: number, firstDate: Date, lastDate: Date){
        const movementsByPeriod = Transactions.find({date:{
            $gte: firstDate,
            $lt: lastDate
        }}).populate("category bankAccount", {
            balance: false,
          }).limit(numMov).sort({ date: -1 }).select("-balance");
        return movementsByPeriod;
    }

}export default new TransactionService();
import { User } from "../user/user.entity";
import { Account } from "./bankAccount.model";


export class bankAccountService{

    async add(user: User){
        
        const creationDate = new Date(); 

        const initialBalance = 0;        

        const IBAN = this.IBANCreator();

       const newAccount = await Account.create({ creationDate: creationDate, iban: IBAN, balance: initialBalance, user: user })

       return IBAN;
    }

    async getById(id: string){
        return Account.findOne({_id: id}).populate("user");
    }

    async IBANCreator(){
        const randomCinNum = Math.floor(Math.random() * (99 - 1) + 1).toString();

        const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const randomletter = alfabeto[Math.floor(Math.random() * alfabeto.length)];

        const ABI = 73825;
        const CAB = 60148;

        let randomNum = Math.floor(Math.random() * 10000000000).toString();

        for(let i = randomNum.length;i<=12;i++){
            const op = randomNum;
            randomNum = "0"+op;
        }
        return "IT"+randomCinNum+randomletter+ABI+CAB+randomNum;
    }


}export default new bankAccountService();
import { Types } from "mongoose";
import { CategoryMovement } from "../categoryMovement/categoryMovement.entity";
import { Account } from "../bankAccount/bankAccount.entity";

export interface Transactions{
    Id?: string;
    date: Date;
    amount: number;
    balance: number;
    description: string;
    category: Types.ObjectId | string | CategoryMovement; 
    bankAccount: Types.ObjectId | string | Account; 
}
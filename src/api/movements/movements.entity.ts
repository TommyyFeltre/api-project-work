import { Types } from "mongoose";
import { CategoryMovement } from "../categoryMovement/categoryMovement.entity";
import { BankAccount } from "../bankAccount/bankAccount.entity";

export interface Movements{
    Id: string;
    date: Date;
    amount: number;
    description: string;
    category: Types.ObjectId | string | CategoryMovement; 
    bankAccountId: Types.ObjectId | string | BankAccount; 
}
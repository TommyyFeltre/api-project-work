import { Types } from "mongoose";
import { Category } from "../category/category.entity";
import { BankAccount } from "../bank-account/bank-account.entity";

export interface Transaction {
    id: string;
    bankAccount: Types.ObjectId | string | BankAccount;
    date: Date;
    amount: number;
    balance: number;
    category: Types.ObjectId | string | Category;
    description: string;
}
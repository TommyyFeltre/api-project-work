import { User } from "../user/user.entity";

export interface BankAccount{
    bankAccountId?: string;
    creationData: Date;
    iban: string;
    user: User;
    balance: number;
}
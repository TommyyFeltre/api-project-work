import { Types } from "mongoose";
import { CategoryMovement } from "../categoryMovement/categoryMovement.entity";
import { User } from "../user/user.entity";

export interface Account{

    bankAccountId: string;
    creationData: Date;
    iban: string;
    movements: Types.ObjectId | string | CategoryMovement; 
    user: Types.ObjectId | string | User;

}
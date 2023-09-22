import { Types } from "mongoose";
import { User } from "../user/user.entity";

export interface Account{

    id?: string;
    creationDate: Date;
    iban: string;
    user: Types.ObjectId | string | User;

}
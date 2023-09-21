import { Type } from "class-transformer";
import { IsMongoId, IsNumber, IsString } from "class-validator";
import { IsExistsInModel } from "../../utils/checkIfExists.validator";
import { BankAccount } from "../bank-account/bank-account.model";
import { Category as CategoryModel } from "../category/category.model";

export class AddTransactionDTO {
    @IsExistsInModel(BankAccount)
    bankAccount: string;

    @IsNumber()
    @Type(() => Number)
    amount: number;

    @IsExistsInModel(CategoryModel)
    category: string;

    @IsString()
    description: string;
    
}
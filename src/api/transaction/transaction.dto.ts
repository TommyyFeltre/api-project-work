import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { IsExistsInModel } from "../../utils/checkIfExists.validator";
import { BankAccount as BankAccountModel } from "../bank-account/bank-account.model";
import { Category as CategoryModel } from "../category/category.model";

export class AddTransactionDTO {
    @IsExistsInModel(BankAccountModel)
    bankAccount: string;

    @IsNumber()
    @Type(() => Number)
    amount: number;

    @IsExistsInModel(CategoryModel)
    category: string;

    @IsString()
    description: string;
    
}

export class AddTransactionRegDTO {
    @IsExistsInModel(BankAccountModel)
    bankAccount: string;

    @IsExistsInModel(CategoryModel)
    category: string;
}

export class FindTransByNumDTO {
    @IsExistsInModel(BankAccountModel)
    bankAccount: string;

    @IsNumber()
    @Type(() => Number)
    record: number;
}

export class FindTransByNumCatDTO {
    @IsExistsInModel(BankAccountModel)
    bankAccount: string;

    @IsNumber()
    @Type(() => Number)
    record: number;

    @IsExistsInModel(CategoryModel)
    category: string;
}
import { Type } from "class-transformer";
import { IsIn, IsNumber, IsOptional, IsPhoneNumber, IsString, Min, isPhoneNumber, min } from "class-validator";
import { IsExistsInModel } from "../../utils/checkIfExists.validator";
import { BankAccount as BankAccountModel } from "../bank-account/bank-account.model";
import { Category as CategoryModel } from "../category/category.model";
import { IsIbanInModel } from "../../utils/ibanExists.validator";

export class AddTransactionDTO {
    @IsExistsInModel(BankAccountModel)
    bankAccount: string;

    @IsNumber()
    @Type(() => Number)
    @Min(1)
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
    @Min(1)
    @IsOptional()
    record: number;
}

export class FindTransByNumCatDTO {
    @IsExistsInModel(BankAccountModel)
    bankAccount: string;

    @IsNumber()
    @Type(() => Number)
    @Min(1)
    record: number;

    @IsExistsInModel(CategoryModel)
    category: string;
}

export class phoneTopUpDTO {
    @IsExistsInModel(BankAccountModel)
    bankAccount: string;

    @IsPhoneNumber('IT')
    phoneNumber: string;

    @IsString()
    phoneOperator: string;

    @IsNumber()
    @Type(() => Number)
    @IsIn([5, 10, 20, 30, 40, 50])
    amount: number;
}

export class BankTransferDTO {

    @IsExistsInModel(BankAccountModel)
    bankAccount: string;

    @IsString()
    @IsIbanInModel(BankAccountModel)
    iban: string;

    @IsNumber()
    @Type(() => Number)
    @Min(1)
    amount: number;
    
    @IsString()
    description: string;
}
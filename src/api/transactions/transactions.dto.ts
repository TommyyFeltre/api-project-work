import { IsMongoId, IsNumber, IsString } from "class-validator";


export class transactionDTO {
    @IsMongoId()
    id:string;
    
    @IsString()
    description:string;

    @IsString()
    tipology:string;
    
    @IsNumber()
    amount:number;
}
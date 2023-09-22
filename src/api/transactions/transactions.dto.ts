import { Type } from "class-transformer";
import { IsDate, IsMongoId, IsNumber, IsString } from "class-validator";


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

export class listDTO{
    @IsNumber()
    numMov: number;
}


export class listByCategoryDTO{
    @IsNumber()
    numMov: number;

    @IsString()
    catMov: string;
}


export class listByPeriodDTO{
    @IsNumber()
    numMov: number;

    @IsDate()
    @Type(()=>Date)
    firstDate: Date;

    @IsDate()
    @Type(()=>Date)
    lastDate: Date;
}
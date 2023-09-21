import { IsMongoId } from "class-validator";


export class accountDTO {
    @IsMongoId()
    id:string;
    
}
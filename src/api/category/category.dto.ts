import { IsIn, IsString } from 'class-validator';
export class AddCategoryDTO {
    @IsString()
    @IsIn(['Apertura Conto', 'Bonifico Entrata', 'Bonifico Uscita', 'Prelievo contanti', 'Pagamento Utenze', 'Ricarica', 'Versamento Bancomat'])
    name: string;

    @IsString()
    @IsIn(['Entrata', 'Uscita'])
    type: string;
}
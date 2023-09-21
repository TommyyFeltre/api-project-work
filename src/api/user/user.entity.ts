export interface User {
    id?: string;
    firstName: string;
    lastName: string;
    fullName?: string;
    iban: string;
    creationDate?: Date;
}
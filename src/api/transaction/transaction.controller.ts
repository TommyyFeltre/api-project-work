import { NextFunction, Response } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { AddTransactionDTO } from "./transaction.dto";

export const add = async (
    req: TypedRequest<AddTransactionDTO>,
    res: Response,
    next: NextFunction
) => {
    try {
    } catch(err) {
        
    }
}
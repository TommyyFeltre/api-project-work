import { NextFunction, Request, Response } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { AddTransactionDTO, AddTransactionRegDTO } from "./transaction.dto";
import { Transaction } from "./transaction.entity";
import transactionService from "./transaction.service";
import { InsufficientBalance } from "../../errors/insufficient balance";

export const addRegister = async (
    req: TypedRequest<AddTransactionRegDTO>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { bankAccount, category } = req.body;
        const balance = 0;
        const amount = 0;
        const description = "Creazione account avvenuta con successo";
        const newTransaction: Transaction = {
            bankAccount,
            balance,
            amount,
            category,
            description
        }
        const transaction = await transactionService.addInit(newTransaction);
        res.json(transaction);
    } catch(err) {
        next(err);
    }
}

export const add =async (
    req: TypedRequest<AddTransactionDTO>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { bankAccount, amount, category, description } = req.body;
        const newTransaction: Transaction = {
            bankAccount,
            amount,
            category,
            description
        }
        const transaction = await transactionService.add(newTransaction);
        res.json(transaction);
    } catch(err) {
        if(err instanceof InsufficientBalance) {
            res.json({
                error: err.name,
                message: err.message
            })
        }
        else {
            next(err);
        }
    }
}
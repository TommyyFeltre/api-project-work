import { NextFunction, Request, Response } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { AddTransactionDTO, AddTransactionRegDTO, BankTransferDTO, FindTransByNumCatDTO, phoneTopUpDTO } from "./transaction.dto";
import { Transaction } from "./transaction.entity";
import transactionService from "./transaction.service";
import { InsufficientBalance } from "../../errors/insufficient balance";
import categoryService from "../category/category.service";
import ipAddressService from "../ip-users/ip.service";
import bankAccountService from "../bank-account/bank-account.service";

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

export const list = async (
    req: TypedRequest<FindTransByNumCatDTO>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { bankAccount, record, category, firstDate, secondDate } = req.body;
        const list = await transactionService.find(bankAccount, record, category, firstDate, secondDate);
        res.json(list);
    } catch(err) {
        next(err);
    }
}

export const phoneTopUp = async (
    req: TypedRequest<phoneTopUpDTO>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { bankAccount, phoneNumber, amount,  phoneOperator } = req.body;
        const description = 'Ricarica telefonica avvenuta con successo';
        const category = await categoryService.phoneTopUp();
        const newTransaction: Transaction = {
            bankAccount,
            amount,
            description,
            category
        }
        const transaction = await transactionService.phoneTopUp(newTransaction);
        res.json(transaction);
        await ipAddressService.add(req.ip, "Ricarica accettata");
    } catch(err) {
        if(err instanceof InsufficientBalance) {
            res.json({
                error: err.name,
                message: err.message
            })
            await ipAddressService.add(req.ip, "Ricarica rifiutata");
        } else {
            await ipAddressService.add(req.ip, "Ricarica rifiutata");
            next(err);
            
        }
    }
}

export const bankTransfer = async (
    req: TypedRequest<BankTransferDTO>,
    res: Response,
    next: NextFunction
) => {
    try {
        const ip = req.ip;
        const { bankAccount, amount, description, iban } = req.body;
        const category = await categoryService.bankTransfer();
        const categoryIn = await categoryService.bankTransferIn();
        const newTransaction: Transaction = {
            bankAccount,
            amount,
            description,
            category
        }
        const AccountId = await bankAccountService.BankAccountId(iban);
        const newTransactionIn: Transaction = {
            bankAccount: AccountId,
            amount,
            description,
            category: categoryIn
        }
        const transaction = await transactionService.bankTransfer(newTransaction);
        await transactionService.bankTransferIn(newTransactionIn);
        const response = {
            transaction,
            ip
        }
        res.json(response);
        await ipAddressService.add(req.ip, "Bonifico accettato");
    } catch(err) {
        if(err instanceof InsufficientBalance) {
            res.json({
                error: err.name,
                message: err.message
            })
            await ipAddressService.add(req.ip, "Bonifico rifiutato");
        } else {
            await ipAddressService.add(req.ip, "Bonifico rifiutato");
            next(err);
        }
    }
}

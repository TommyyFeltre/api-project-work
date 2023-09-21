import { NextFunction, Response, Request } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import transactionsService from "./transactions.service";
import { transactionDTO } from "./transactions.dto";


export const bankTransfer = async(
    req: TypedRequest<transactionDTO>,
    res: Response,
    next: NextFunction
  ) => {

    const amount = req.body.amount;
    const id = req.body.id;
    const description = req.body.description;    
    const tipology = req.body.tipology;

    const currentAccount = await transactionsService.bankTransfer(amount, id, description, tipology);

    res.json();
  }
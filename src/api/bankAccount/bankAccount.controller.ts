import { NextFunction, Request, Response } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { accountDTO } from "./bankAccount.dto";
import bankAccountService from "./bankAccount.service";

export const myAccount = async(
    req: TypedRequest<accountDTO>,
    res: Response,
    next: NextFunction
  ) => {

    const id = req.params.accountId;

    const currentAccount = await bankAccountService.getById(id!)

    res.json(currentAccount);
  }

/* export const add = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    


} */

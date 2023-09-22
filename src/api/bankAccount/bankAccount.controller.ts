import { NextFunction, Request, Response } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { accountDTO } from "./bankAccount.dto";
import bankAccountService from "./bankAccount.service";

export const myAccount = async(
    req: TypedRequest<accountDTO>,
    res: Response,
    next: NextFunction
  ) => {

    const idAcc = req.body.id;

    const currentAccount = await bankAccountService.getById(idAcc!)

    res.json(currentAccount);
  }



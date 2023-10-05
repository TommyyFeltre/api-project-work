import { NextFunction, Response, Request } from "express";
import { BankAccount as BankAccountModel } from "./bank-account.model";
import bankAccountService from "./bank-account.service";

export const account = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const account = await BankAccountModel.findOne({user: req.user?.id!}).populate('user')


  res.json(account);
}

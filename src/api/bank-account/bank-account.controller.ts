import { NextFunction, Response, Request } from "express";
import { BankAccount as BankAccountModel } from "./bank-account.model";

export const account = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _account = await BankAccountModel.findOne({user: req.user?.id!})
  console.log(_account);
  const account = _account?.toObject()

  res.json(account);
}
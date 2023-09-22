import { NextFunction, Response, Request } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import transactionsService from "./transactions.service";
import { listByCategoryDTO, listByPeriodDTO, listDTO, transactionDTO } from "./transactions.dto";


export const bankTransfer = async(
    req: TypedRequest<transactionDTO>,
    res: Response,
    next: NextFunction
  ) => {

    const amount = req.body.amount;
    const id = req.body.id;
    const description = req.body.description;    
    const tipology = req.body.tipology;

    const currentMovement = await transactionsService.bankTransfer(amount, id, description, tipology);

    res.json(currentMovement);
  }


export const movementsList = async(
    req: TypedRequest<listDTO>,
    res: Response,
    next: NextFunction
  ) => {

    const numMov = req.body.numMov;

    const currentMovement = await transactionsService.getMovements(numMov);

    res.json(currentMovement);
  }

  
export const categoryMovementsList = async(
  req: TypedRequest<listByCategoryDTO>,
  res: Response,
  next: NextFunction
) => {

  const numMov = req.body.numMov;
  const catMov = req.body.catMov;

  const currentMovement = await transactionsService.getMovementsByCategory(numMov, catMov);

  res.json(currentMovement);
}
  
export const periodMovementsList = async(
  req: TypedRequest<listByPeriodDTO>,
  res: Response,
  next: NextFunction
) => {

  const numMov = req.body.numMov;
  const firstDate = req.body.firstDate;
  const lastDate = req.body.lastDate;

  const currentMovement = await transactionsService.getMovementsByPeriod(numMov, firstDate, lastDate);

  res.json(currentMovement);
}
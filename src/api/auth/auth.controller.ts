import { NextFunction, Response } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { AddUserDTO, LoginDTO, ResetPasswordDTO, changePasswordDTO } from "./auth.dto";

import { omit, pick } from 'lodash';
import { UserExistsError } from "../../errors/user-exists";
import userService from '../user/user.service';
import passport from "passport";
import * as jwt from 'jsonwebtoken';
import bankAccountService from "../bank-account/bank-account.service";
import { Strategy as LocalStrategy } from "passport-local";
import { UserIdentity } from "../../utils/auth/local/user-identity.model";
import * as bcrypt from 'bcrypt';
import { User as UserModel } from "../user/user.model";
import { WrongPasswordError } from "../../errors/wrong-password";
import transactionService from "../transaction/transaction.service";
import { Transaction } from "../transaction/transaction.entity";


const JWT_SECRET = 'my_jwt_secret';

export const add = async (
  req: TypedRequest<AddUserDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = omit(req.body, 'username', 'password');
    const credentials = pick(req.body, 'username', 'password');
    const newUser = await userService.add(userData, credentials);
    const newAccount = await bankAccountService.add(newUser);
    const newTransaction: Transaction = {
      bankAccount: newAccount.id!,
      balance: 0,
      amount: 0,
      category: '650c36b34fbb7705e5fe4fcf',
      description: 'Creazione account avvenuta con successo'
  }
    await transactionService.addInit(newTransaction);
    res.send(newAccount);
    
  } catch (err) {
    if (err instanceof UserExistsError) {
      res.status(400);
      res.send(err.message);
    } else {
      next(err);
    }
  }
}

export const login = async (
  req: TypedRequest<LoginDTO>,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    console.log(user)
    if (!user) {
      res.status(401);
      res.json({
        error: 'LoginError',
        message: info.message
      });
      return;
    }
    const token = jwt.sign(user, JWT_SECRET, {expiresIn: '7 days'});
    res.status(200);
    res.json({
      user,
      token
    });
  })(req, res, next);
}

export const changePassword = async (
  req: TypedRequest<changePasswordDTO>,
  res: Response,
  next: NextFunction  
) => {try {
  const userData = omit(req.body, 'username', 'password');
  const credentials = pick(req.body, 'username', 'password');
  //const newPassword = await userService.changePassword();
  //res.send(newPassword);
  
} catch (err) {
  if (err instanceof UserExistsError) {
    res.status(400);
    res.send(err.message);
  } else {
    next(err);
  }
}

}


export const resetPassword = async (
  req: TypedRequest<ResetPasswordDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!;
    const { oldPassword, newPassword } = req.body;

    if (oldPassword === newPassword) {
      res.status(400);
      res.json({
        error: 'PasswordValidationError',
        message: 'New password must be different from the last one',
      });
      return;
    }
    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const modifiedUser = await userService.update(userId.id!, newPassword, oldPassword);


    res.status(200);
    res.json({
      modifiedUser,
      message: 'Password changed'
    });
  } catch (err) {
    if (err instanceof WrongPasswordError) {
      res.status(400);
      res.send(err.message);
    } else {
      next(err);
    }
  }
    
}

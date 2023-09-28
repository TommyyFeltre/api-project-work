import { NextFunction, Response } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { AddUserDTO, LoginDTO, ResetPasswordDTO } from "./auth.dto";
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
import ipAddressService from "../ip-users/ip.service";


const JWT_SECRET = 'my_jwt_secret';

export const add = async (
  req: TypedRequest<AddUserDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = omit(req.body, 'username', 'password', 'confPassword');
    const { password, confPassword } = req.body;
    if(password !== confPassword){
      throw new WrongPasswordError();
    }
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
  passport.authenticate('local', async (err, user, info) => {
    if (err) {
      await ipAddressService.add(req.ip, "Login rifiutato");
      return next(err);
    }
    console.log(user)
    if (!user) {
      res.status(401);
      res.json({
        error: 'LoginError',
        message: info.message
      });
      await ipAddressService.add(req.ip, "Login Rifiutato");
      return;
    }
    const token = jwt.sign(user, JWT_SECRET, {expiresIn: '7 days'});
    res.status(200);
    res.json({
      user,
      token
    });
    await ipAddressService.add(req.ip, "Login accettato");
  })(req, res, next);
}

export const resetPassword = async (
  req: TypedRequest<ResetPasswordDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const { oldPassword, newPassword } = req.body;

    if (oldPassword === newPassword) {
      res.status(400);
      res.json({
        error: 'PasswordValidationError',
        message: 'New password must be different from the last one',
      });
      await ipAddressService.add(req.ip, "Reset password rifiutato");
      return;
    }
    if (!req.user) {
      await ipAddressService.add(req.ip, "Reset password rifiutato");
      return res.status(404).json({ message: 'User not found' });
    }

    const modifiedUser = await userService.update(userId!, newPassword, oldPassword);


    res.status(200);
    res.json({
      modifiedUser,
      message: 'Password changed'
    });
    await ipAddressService.add(req.ip, "Reset password accettato");
  } catch (err) {
    if (err instanceof WrongPasswordError) {
      res.status(400);
      res.send(err.message);
      await ipAddressService.add(req.ip, "Reset password rifiutato");
    } else {
      await ipAddressService.add(req.ip, "Reset password rifiutato");
      next(err);
    }
  }
    
}
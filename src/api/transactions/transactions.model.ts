import mongoose, { Schema, model } from 'mongoose';
import { Transactions as iTransactions } from './transactions.entity';
import { CategoryMovement } from '../categoryMovement/categoryMovement.model';
import { CategoryMovement as iCategoryMovement } from '../categoryMovement/categoryMovement.entity';
import { Account } from '../bankAccount/bankAccount.model';

export const transactionsSchema = new Schema<iTransactions>({
  Id: String,
  date: Date,
  amount: Number,
  balance: Number,
  description: String,
  category: {type : Schema.Types.ObjectId, ref: CategoryMovement},
  bankAccount: { type: Schema.Types.ObjectId, ref: Account},
});

transactionsSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

transactionsSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
export const Transactions = model<iTransactions>('Transactions', transactionsSchema);
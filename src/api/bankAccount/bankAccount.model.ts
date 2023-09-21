import  mongoose, { Schema } from 'mongoose';
import { BankAccount } from "./bankAccount.entity"
import { User } from '../user/user.model';
import IBANcreator from '../../utils/iban-creator';

const _iban = IBANcreator();

export const BanckAccountSchema = new mongoose.Schema<BankAccount>({
    creationData: {type: Date, default: new Date()},
    iban: {type: String, default: _iban},
    user: {type : Schema.Types.ObjectId, ref: "User"},
    balance: {type: Number, default: 0}
  });

  BanckAccountSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const BankAccounts = mongoose.model<BankAccount>('BankAccount', BanckAccountSchema);

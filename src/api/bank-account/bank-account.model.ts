import mongoose, { Schema } from "mongoose";
import { BankAccount as iBankAccount } from "./bank-account.entity";
import IBANcreator from "../../utils/iban-creator";

const _iban = IBANcreator();

export const BanckAccountSchema = new mongoose.Schema<iBankAccount>({
    creationDate: {type: Date, default: new Date()},
    iban: {type: Schema.Types.String, default: _iban},
    user: {type : Schema.Types.ObjectId, ref: 'User'},
  });

  BanckAccountSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});


export const BankAccount = mongoose.model<iBankAccount>('BankAccount', BanckAccountSchema);
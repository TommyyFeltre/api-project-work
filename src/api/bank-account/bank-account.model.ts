import mongoose, { Schema } from "mongoose";
import { BankAccount as iBankAccount } from "./bank-account.entity";
import IBANcreator from "../../utils/iban-creator";

const _iban = IBANcreator();

export const BankAccountSchema = new mongoose.Schema<iBankAccount>({
    creationDate: {type: Date, default: Date.now},
    iban: {type: Schema.Types.String, default: _iban},
    user: {type : Schema.Types.ObjectId, ref: 'User'},
  });

BankAccountSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

BankAccountSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
  }
})



export const BankAccount = mongoose.model<iBankAccount>('BankAccount', BankAccountSchema);
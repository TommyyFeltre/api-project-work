import mongoose, { Schema } from "mongoose";
import { BankAccount as iBankAccount } from "./bank-account.entity";

export const accountSchema = new mongoose.Schema<iBankAccount>({
    creationDate: Date,
    iban: String,
    user: {type : Schema.Types.ObjectId, ref: "User"},
  });


accountSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

accountSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});


export const BankAccount = mongoose.model<iBankAccount>('BankAccount', accountSchema);
import  mongoose, { Schema, model } from 'mongoose';
import { Account as iAccount } from "./bankAccount.entity"
import { User } from '../user/user.model';

export const accountSchema = new mongoose.Schema<iAccount>({
    id: String,
    creationDate: Date,
    iban: String,
    user: {type : Schema.Types.ObjectId, ref: User}
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


export const Account = mongoose.model<iAccount>('bankAccounts', accountSchema);

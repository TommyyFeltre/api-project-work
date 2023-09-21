import  mongoose, { Schema } from 'mongoose';
import { Account } from "./bankAccount.entity"

export const accountSchema = new mongoose.Schema<Account>({
    bankAccountId: String,
    creationData: Date,
    iban: String,
    movements: {type : Schema.Types.ObjectId, ref: "CategoryMovement"},
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
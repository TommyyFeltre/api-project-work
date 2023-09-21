import  mongoose, { Schema } from 'mongoose';
import { Transactions } from './transactions.entity';

export const transactionsSchema = new mongoose.Schema<Transactions>({     
    Id: String,
    date: Date,
    amount: Number,
    balance: Number,
    description: String,
    category: {type : Schema.Types.ObjectId, ref: "categoryMovement"}, 
    bankAccountId: {type : Schema.Types.ObjectId, ref: "Account"} 
  });


  transactionsSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

transactionsSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});
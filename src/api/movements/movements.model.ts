import  mongoose, { Schema } from 'mongoose';
import { Movements } from './movements.entity';

export const movementsSchema = new mongoose.Schema<Movements>({     
    Id: String,
    date: Date,
    amount: Number,
    balance: Number,
    description: String,
    category: {type : Schema.Types.ObjectId, ref: "categoryMovement"}, 
    bankAccountId: {type : Schema.Types.ObjectId, ref: "Account"} 
  });


movementsSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

movementsSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});
import  mongoose from 'mongoose';
import { CategoryMovement } from "./categoryMovement.entity"

export const movementSchema = new mongoose.Schema<CategoryMovement>({
    CategoryMovementId: String,
    CategoryName: String,
    Tipology: String
  });


movementSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

movementSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});
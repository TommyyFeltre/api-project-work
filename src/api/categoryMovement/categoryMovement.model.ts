import  mongoose, { Schema, model } from 'mongoose';
import { CategoryMovement as iCategoryMovement } from "./categoryMovement.entity"


export const categoryMovementSchema = new Schema<iCategoryMovement>({
  id:  String,
  CategoryName: String,
  Tipology: String
});



categoryMovementSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

categoryMovementSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const CategoryMovement = model<iCategoryMovement>('Categories', categoryMovementSchema);



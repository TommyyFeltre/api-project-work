import mongoose, { Schema } from "mongoose";
import { Category as iCategory } from "./category.entity";

const CategorySchema = new Schema<iCategory>({
    name: String,
    type: String
})

CategorySchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
})

CategorySchema.set('toObject', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
})

export const Category = mongoose.model<iCategory>('Category', CategorySchema);
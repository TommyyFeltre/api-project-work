import mongoose, { Schema } from "mongoose";
import { Transaction as iTransaction } from "./transaction.entity";

const TransactionSchema = new Schema<iTransaction>({
    bankAccount: {type: Schema.Types.ObjectId, ref: 'BankAccount'},
    date: Date,
    amount: Number,
    balance: Number,
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    description: String
})

TransactionSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
})

TransactionSchema.set('toObject', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
})

export const Transaction = mongoose.model<iTransaction>('Transaction', TransactionSchema);
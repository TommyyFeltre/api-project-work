import { Types } from "mongoose";
import { NotFoundError } from "../../errors/not-found";
import { Category } from "./category.entity";
import { Category as CategoryModel } from "./category.model";

export class  CategoryService {
    async add(category: Category): Promise<Category> {
        const newCategory = await CategoryModel.create({ ...category })
        return newCategory;
    }

    async typeCategory(categoryId: string | Types.ObjectId | Category): Promise<Category> {
        const typeExit = await CategoryModel.findById(categoryId);
        if(typeExit) {
            return typeExit;
        } else {
            throw new NotFoundError();
        }
    }

    async listCategory(): Promise<Category[]> {
        const typeExit = await CategoryModel.find();
        if(typeExit) {
            return typeExit;
        } else {
            throw new NotFoundError();
        }
    }

    async phoneTopUp(): Promise<string> {
        const categoryPhoneId =  await CategoryModel.findOne({ name: 'Ricarica' });
        return categoryPhoneId?.id;
    }

    async bankTransfer(): Promise<string> {
        const categoryTransfer = await CategoryModel.findOne({ name: 'Bonifico Uscita' });
        return categoryTransfer?.id;
    }
}

export default new CategoryService();
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
}

export default new CategoryService();
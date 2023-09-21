import { Category } from "./category.entity";
import { Category as CategoryModel } from "./category.model";

export class  CategoryService {
    async add(category: Category): Promise<Category> {
        const newCategory = await CategoryModel.create({ ...category })
        return newCategory;
    }
}

export default new CategoryService();
import { NextFunction, Response } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { AddCategoryDTO } from "./category.dto";
import categoryService from "./category.service";
import { Category } from "./category.entity";


export const add = async (
    req: TypedRequest<AddCategoryDTO>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, type } = req.body;
        const newCategory: Category = {
            name,
            type
        } 
        const category = await categoryService.add(newCategory);
        res.json(category); 
    } catch(err) {
        next(err);
    }
}
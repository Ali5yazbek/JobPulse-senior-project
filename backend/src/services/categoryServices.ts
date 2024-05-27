const category = require('../DataAccess/category');
import { category } from "../models/category";

export async function getCategory(){
    try{
    return await category.getCategory();
    }
    catch(error){
        console.error('error in categoryService ',error);
        throw error;
    }    
    }
    export async function addCategory(newCategory: category) {
        try{
            return await category.addCategory(newCategory);
        }catch(error){
            console.error("error in Categoryservice ",error);
            throw error;
        }
    }
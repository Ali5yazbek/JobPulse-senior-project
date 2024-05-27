import express from 'express';
import * as categoryService from '../services/categoryServices'
import { category } from '../models/category';

const routerCategory =  express.Router();

routerCategory.get('/categories',async(req,res)=>{
    try{
        const category = await categoryService.getCategory();
        if(category){
            res.json(category);
        }else{
            res.status(404).json({message: 'category not found'})
        }

    }catch(error){
        console.error("error in internalService ",error);
        throw error;
        }
})

routerCategory.post('/addCategory', async(req,res)=>{
    try{
        const category:category= req.body;
        await categoryService.addCategory(category);
        res.status(201).json({ message: 'category added successfully' });
    }catch(error){
        console.error("error in internalService ",error);
        throw error;
    }
})

export default routerCategory;
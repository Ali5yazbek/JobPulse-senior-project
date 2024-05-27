import express from 'express';
import * as companyServices from '../services/companyServices'
import * as companyAccess from '../DataAccess/companyAccess'
import {company} from '../models/company'

const routerCompany =  express.Router();

routerCompany.get('/company', async (req, res)=>{
    try{
        const company = await companyAccess.getCompanies();
        if(company){
            res.json(company);
        }else{
            res.status(404).json({message: 'user not found'})
        }
    }catch(error){
        console.error('Error in userRoutes: ',error);
    res.status(500).json({message:'Internal server Error'})
    }
})

routerCompany.post('/companyCheck', async (req, res)=>{
    try{
        const checkCompany = req.body
        const company = await companyAccess.getCompany(checkCompany);
        if(company){
            res.json(company);
        }else{
            res.status(404).json({message: 'user not found'})
        }
    }catch(error){
        console.error('Error in userRoutes: ',error);
    res.status(500).json({message:'Internal server Error'})
    }
})


routerCompany.post('/companySearch', async (req, res)=>{
    try{
        const checkCompany = req.body
        const company = await companyAccess.getCompaniesBySearch(checkCompany);
        if(company){
            res.json(company);
        }else{
            res.status(404).json({message: 'user not found'})
        }
    }catch(error){
        console.error('Error in userRoutes: ',error);
    res.status(500).json({message:'Internal server Error'})
    }
})

routerCompany.post('/addCompany',async (req,res)=>{
    try{
        const newCompany: company = req.body;
        // const userId = await userService.addUser(newUser);
       await companyAccess.AddCompany(newCompany);
       res.status(201).json({ message: 'User added successfully' });
    }catch(error){
        console.error('Error in userRoutes: ',error);
        res.status(500).json({message:'Internal server Error'})
    }
})

routerCompany.put('/update',async(req,res)=>{
    try{
        const u = req.body;
        await companyAccess.updateUser(u)
        res.status(201).json({message:' password updated!'})
    }catch(error){
        console.error('error in userroutes', error);
        res.status(500).json({message:'Internal server Error'});
    }
})

routerCompany.delete('/deleteCompany/:company_id',async(req,res)=>{
    try{
        // const deleteApp: appId2 = req.body;
        const company_id = req.params.company_id;
        await companyAccess.deleteCompany(parseInt(company_id))
        res.status(201).json({message:' Company deleted!'})

    }catch(error){
        console.error('error in CompanyRoutes', error);
        res.status(500).json({message:'Internal server Error'});
    }
})


export default routerCompany;
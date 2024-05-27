import express from 'express';
import * as applicationServices from '../services/applicationServices';
import * as applicationAccess from '../DataAccess/ApplicationAccess'
import { application,appId,appUserId,appId2,updateStatus } from '../models/application';

const routerApp =  express.Router();

routerApp.post('/application', async(req,res)=>{
    try{
        const appId: appId = req.body;
        const app = await applicationAccess.getApp(appId);
    if(app){
        res.json(app)
    }else{
        res.status(404).json({message: 'application not found'})
    }

    }catch(error){
        console.error("error in internalService ",error);
        throw error;
    }
})

routerApp.delete('/deleteApp/:application_id',async(req,res)=>{
    try{
        // const deleteApp: appId2 = req.body;
        const application_id = req.params.application_id;
        await applicationAccess.deleteApp(parseInt(application_id))
        res.status(201).json({message:' Application deleted!'})

    }catch(error){
        console.error('error in AppRoutes', error);
        res.status(500).json({message:'Internal server Error'});
    }
})

routerApp.post('/appUser',async(req,res)=>{
    try{
        const appId: appUserId = req.body;
        const app = await applicationAccess.getAppUSer(appId);
    if(app){
        res.json(app)
    }else{
        res.status(404).json({message: 'application not found'})
    }
    
    }catch(error){
        console.error('error in Approutes', error);
        res.status(500).json({message:'Internal server Error'});
    }
})

routerApp.post('/addApp',async(req,res)=>{
    try{
        const app: application= req.body
        await applicationAccess.AddApp(app)
        

    }catch(error){
        console.error('error in Approutes', error);
        res.status(500).json({message:'Internal server Error'});
    }
})
routerApp.put('/update',async(req,res)=>{
    try{
        const app = req.body;
        await applicationAccess.updateApp(parseInt(app.application))
        res.status(201).json({message:' Application updated!'})
    }catch(error){
        console.error('error in Approutes', error);
        res.status(500).json({message:'Internal server Error'});
    }
})



export default routerApp;
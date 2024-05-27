import express from 'express';
import * as userService from '../services/userServices'
import * as userAccess from '../DataAccess/userAccess'
import {check, user,userId} from '../models/user'

const routerUser =  express.Router();

routerUser.get('/getUsers', async (req, res) =>{
try {
    const user = await userAccess.getUsers();
    if(user){
        res.json(user);
    }else{
        res.status(404).json({message: 'user not found'})
    }
}catch(error){
    console.error('Error in userRoutes: ',error);
    res.status(500).json({message:'Internal server Error'})
}});
routerUser.post('/userById', async (req,res)=>{
    try{
        const newUser: userId = req.body;
        // const userId = await userService.addUser(newUser);
     const user=  await userAccess.getUserbyId(newUser);
     if(user){
        res.json(user);
    }else{
        res.status(404).json({message: 'user not found'})
    }

    }catch(error){
    console.error('Error in userRoutes: ',error);
    res.status(500).json({message:'Internal server Error'})
    }
})

routerUser.post('/adduser', async(req,res)=>{
    try{
        const newUser: user = req.body;
        // const userId = await userService.addUser(newUser);
       await userAccess.AddUser(newUser);
       res.status(201).json({ message: 'User added successfully' });

    }catch(error){
    console.error('Error in userRoutes: ',error);
    res.status(500).json({message:'Internal server Error'})
    }
})
routerUser.post('/check',async(req,res)=>{
    try{
        const checkUser:check = req.body;
        const user= await userAccess.getUsercheck(checkUser);
        if(user){
        res.json(user);
        
    }else{
        res.status(404).json({message: 'user not found'})
    }
    }catch(error){
        console.error('Error in userRoutes: ',error);
        res.status(500).json({message:'Internal server Error'})
    }
})

routerUser.put('/update',async(req,res)=>{
    try{
        const u = req.body;
        await userAccess.updateUser(u)
        res.status(201).json({message:' password updated!'})
    }catch(error){
        console.error('error in userroutes', error);
        res.status(500).json({message:'Internal server Error'});
    }
})

routerUser.delete('/deleteUser/:userId',async(req,res)=>{
    try{
        // const deleteApp: appId2 = req.body;
        const userId = req.params.userId;
        await userAccess.deleteUser(parseInt(userId))
        res.status(201).json({message:' user deleted!'})

    }catch(error){
        console.error('error in UserRoutes', error);
        res.status(500).json({message:'Internal server Error'});
    }
})


export default routerUser;
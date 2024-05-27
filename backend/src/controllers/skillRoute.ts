import express from 'express';
import * as skillsService from '../services/skillServices'
import * as skillAccess from '../DataAccess/skillAccess'
import { skills } from '../models/skills';
import { userId } from '../models/user';

const routerSkills =  express.Router();

routerSkills.post('/skills',async(req,res)=>{
    try{
        const id:userId= req.body
        const skill = await skillAccess.getSkills(id);
        if(skill){
            res.json(skill);
        }else{
            res.status(404).json({message: 'skill not found'})
        }

    }catch(error){
        console.error("error in internalService ",error);
        throw error;
        }
})

routerSkills.post('/addSkill', async(req,res)=>{
    try{
        const skill:skills= req.body;
        await skillAccess.addSkills(skill);
        res.status(201).json({ message: 'skill added successfully' });
    }catch(error){
        console.error("error in internalService ",error);
        throw error;
    }
})

routerSkills.delete('/deleteSkill/:skillId',async(req,res)=>{
    try{
        // const deleteApp: appId2 = req.body;
        const skillId = req.params.skillId;
        await skillAccess.DeleteSkill(parseInt(skillId))
        res.status(201).json({message:' skill deleted!'})

    }catch(error){
        console.error('error in SkillRoutes', error);
        res.status(500).json({message:'Internal server Error'});
    }
})


export default routerSkills;
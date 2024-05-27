import express from 'express';
import * as jobServices from '../services/jobServices'
import * as jobAccess from '../DataAccess/jobAccess';
import {job, jobSalary,jobD, jobCategory} from '../models/job'

const routerJob =  express.Router();

routerJob.get('/getJobs', async (req,res) =>{
try{
    const job = await jobAccess.getJobs();
    if(job){
        res.json(job);
    }else{
        res.status(404).json({message: 'user not found'})
    }
}catch(error){
    console.error('Error in userRoutes: ',error);
    res.status(500).json({message:'Internal server Error'})
}
})

routerJob.post('/getJobCategory', async (req,res) =>{
    try{
        const body:jobCategory = req.body
        const job = await jobAccess.getJobByCategoryId(body);
        if(job){
            res.json(job);
        }else{
            res.status(404).json({message: 'user not found'})
        }
    }catch(error){
        console.error('Error in userRoutes: ',error);
        res.status(500).json({message:'Internal server Error'})
    }
    })

    routerJob.post('/getJobCompanyId', async (req,res) =>{
        try{
            const body = req.body
            const job = await jobAccess.getJobByCompanyId(body)
            if(job){
                res.json(job);
            }else{
                res.status(404).json({message: 'user not found'})
            }
        }catch(error){
            console.error('Error in userRoutes: ',error);
            res.status(500).json({message:'Internal server Error'})
        }
        })
routerJob.put('/updateStatus', async (req,res)=>{
    try{
        const job_id= req.body;
        const job = await jobAccess.updateStatus(parseInt(job_id.job_id));
        res.status(201).json({message:' job updated!'});
    }catch(error){
        console.error('Error in jobRoutes: ',error);
        res.status(500).json({message:'Internal server Error'})
    }
})


routerJob.post('/addJob', async(req,res)=>{
    try{
        const newJob: job = req.body;
        // const userId = await userService.addUser(newUser);
       await jobAccess.AddJob(newJob)
       res.status(201).json({ message: 'Job added successfully' });
    }catch(error){
        console.error('Error in jobRoutes: ',error);
        res.status(500).json({message:'Internal server Error'})
    }
})
routerJob.put('/updateSalary',async(req,res)=>{
    try{
        const newJobSalary:jobSalary = req.body
        await jobServices.updateSalary(newJobSalary)
    }catch(error){
        console.error('error in jobRoutes', error);
        res.status(500).json({message:'Internal server Error'})
    }
})
routerJob.delete('/deleteJob/:job_id',async(req,res)=>{
    try{
        const job_id = parseInt(req.params.job_id);
        await jobAccess.deleteJob(job_id)

    }catch(error){
        console.error('error in jobRoutes', error);
        res.status(500).json({message:'Internal server Error'})
    }
})




export default routerJob;
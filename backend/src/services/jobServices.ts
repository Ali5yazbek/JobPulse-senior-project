const jobs = require('../DataAccess/jobAccess')
import {job,jobSalary,jobD} from '../models/job'

export async function getJobs(){
    try{
    return await jobs.getJobs();
    }
    catch(error){
        console.error('error in jobService ',error);
        throw error;
    }    
    }
    export async function addJob(newJob: job) {
        try{
            return await jobs.addJob(newJob)
        }catch(error){
            console.error("error in Jobservice ",error);
            throw error;
        }
    }
    export async function updateSalary(newJobSalary: jobSalary) {
        try{
            return await jobs.updateSalary(newJobSalary)
        }catch(error){
            console.error("error in JobService ",error);
            throw error
        }
    }

    export async function deleteJob(id:jobD) {
        try{
            return await jobs.deleteJob(id.job_id)

        }catch(error){
            console.error("error in JobService ",error)
            throw error
        }
    }
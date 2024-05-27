import { Int } from 'msnodesqlv8';
import * as sql from 'mssql'
import {job, jobSalary,jobD, jobCategory, jobCompany} from '../models/job';


const config: sql.config={
    user: 'sa',
    password: '123123123',
    server:'DESKTOP-VFPP5K8\\SQLEXPRESS',
    database:'jobTracker',
    port:1433,
    
    options: { 
        connectTimeout: 15000,
        trustServerCertificate: true,
    }
};

export async function getJobs(){
    try{ 
        const pool = await sql.connect(config);
        const result = await pool.request()
        .execute('dbo.getAllJobs');
        if(result.recordset.length > 0){
            // return result.recordset[0];
            return result.recordset;
        }
        return null;
    }
    catch(error){
        console.error('Error fetching job: ',error);
        throw error;
    }}
    export async function getJobByCategoryId(jobsC: jobCategory){
        try{ 
            const pool = await sql.connect(config);
            const result = await pool.request()
            .input("category_id",sql.Int, jobsC.category_id)
            .query('select * from job where category_id=@category_id')
            if(result.recordset.length > 0){
                // return result.recordset[0];
                return result.recordset;
            }
            return null;
        }
        catch(error){
            console.error('Error fetching job: ',error);
            throw error;
        }}
        export async function getJobByCompanyId(id:jobCompany){
            try{ 
                const pool = await sql.connect(config);
                const result = await pool.request()
                .input("company_id",sql.Int, id.company_id)
                .query('select * from job where company_id=@company_id')
                if(result.recordset.length > 0){
                    // return result.recordset[0];
                    return result.recordset;
                }
                return null;
            }
            catch(error){
                console.error('Error fetching job: ',error);
                throw error;
            }}



 export async function AddJob(newJob: job){
        try{
            const pool = await sql.connect(config);
            const result = (await pool.request()
            .input('title',sql.VarChar(50),newJob.title)
            .input('description',sql.VarChar(50),newJob.description)
            .input('salary',sql.VarChar(50),newJob.salary)
            .input('skills',sql.VarChar(50),newJob.skills)
            .input('postDate',sql.VarChar(50),newJob.postDate)
            .input('company_id',sql.Int,newJob.company_id)
            .input('admin_id',sql.Int,newJob.admin_id)
            .input('category_id',sql.Int,newJob.category_id)
            .input('location',sql.VarChar(50),newJob.location)
            .input('time',sql.VarChar(50),newJob.time)
            .input('status',sql.Int,newJob.status)
            .query('insert into job values(@title,@description,@salary,@skills,@postDate,@company_id,@admin_id,@category_id,@location,@time,@status)')
            );
            console.log("recorded added!")            
            await pool.close()

        }catch(error){
            console.error('error insert job: ',error);
            throw error;
        }
    }
    export async function updateSalay(updateJob: jobSalary) {
        try{
            const pool = await sql.connect(config);
            const result = (await pool.request()
            .input('job_id',sql.Int,updateJob.job_id)
            .input('salary',sql.VarChar(50),updateJob.salary)
            .execute('dbo.updateJobSalary'))
            console.log('job updated!');
            pool.close();

        }catch(error){
            console.error('error insert job: ',error);
            throw error;
        }
    }
    export async function deleteJob(job_id:number) {
        try{
            const pool =await sql.connect(config);
            const result = (await pool.request()
            .input('job_id',sql.Int,job_id)
            
            .query('delete from job where job_id=@job_id'));
            console.log('item deleted! ');
            pool.close();
        }catch(error){
            console.error('error delete job: ',error);
            throw error;
        }
    }
    export async function updateStatus(job_id:number) {
        try{
            const pool = await sql.connect(config);
            const result = (await pool.request()
            .input('job_id',sql.Int,job_id)
            .input('status',sql.Int,1)
            .query('UPDATE job SET status = @status WHERE job_id = @job_id'));
            console.log('job updated! ');
            pool.close();
        }catch(error){
            console.error('error update job: ',error);
            throw error;
        }
    }



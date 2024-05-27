import { Int } from 'msnodesqlv8';
import * as sql from 'mssql'
import { application,appId,appUserId, appId2,updateStatus} from '../models/application';


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

export async function getApp(id: appId){
    try{ 
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('company_id',sql.Int,id.company_id)
        .query('select * from application where company_id=@company_id')
        if(result.recordset.length > 0){
            // return result.recordset[0];
            return result.recordset;
        }
        return null;
    }
    catch(error){
        console.error('Error fetching application: ',error);
        throw error;
    }}
    export async function getAppUSer(id: appUserId) {
        try {
          const pool = await sql.connect(config);
          const result = await pool
            .request()
            .input('user_id', sql.Int, id.user_id)
            .query('select * from application where user_id=@user_id');
      
          return result.recordset;
        } catch (error) {
          console.error('Error fetching application: ', error);
          throw error; 
        }
      }
      

      export async function deleteApp(id: number) {
        const pool = await sql.connect(config);
        try {
            
            const result = await pool.request()
                .input('application_id', sql.Int, id)
                .query('delete from application where application_id=@application_id');
                
            console.log('Application deleted!');
            pool.close();
        } catch (error) {
            console.error('Error deleting application: ', error);
            throw error;
        } 
    }
    

    
    export async function AddApp(newApplication: application){
        try{
            const pool = await sql.connect(config);
            const result = (await pool.request()
            .input('status',sql.VarChar(50),newApplication.status)
            .input('appliedDate',sql.VarChar(50),newApplication.appliedDate)
            .input('user_id',sql.Int,newApplication.user_id)
            .input('company_id',sql.Int,newApplication.company_id)
            .input('jobName',sql.VarChar(50),newApplication.jobName)
            .input('userName',sql.VarChar(50),newApplication.userName)
            .input('phone',sql.VarChar(50),newApplication.phone)
            .input('email',sql.VarChar(50),newApplication.email)
            .input('Description',sql.VarChar(50),newApplication.Description)
            .query('INSERT INTO application VALUES(@status, @appliedDate, @user_id, @company_id, @jobName, @userName,@phone,@email,@Description)')
            );
            console.log("recorded added!")            
            await pool.close()

        }catch(error){
            console.error('error insert application: ',error);
            throw error;
        }
    }

    export async function updateApp(status:number) {
        try{
            const pool = await sql.connect(config);
            const result = (await pool.request()
            .input('application_id',sql.Int,status)
            .query('update application set status="true" where application_id=@application_id'));
            pool.close();

        }catch(error){
            console.error('error update application: ',error);
            throw error;
        }
    }
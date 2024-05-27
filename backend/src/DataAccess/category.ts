import { Int } from 'msnodesqlv8';
import * as sql from 'mssql'
import {category} from '../models/category';
import {userId} from '../models/user';

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

export async function getCategory(id:userId){
    try{ 
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('user_id',sql.Int,id.id)
        .execute('dbo.getCategories');
        if(result.recordset.length > 0){
            // return result.recordset[0];
            return result.recordset;
        }
        return null;
    }
    catch(error){
        console.error('Error fetching category: ',error);
        throw error;
    }}
    export async function AddCategory(newCategory:category){
        try{
            const pool = await sql.connect(config);
            const result = (await pool.request()
            .input('name',sql.VarChar(50),newCategory.category_name)
            .input('phone',sql.VarChar(50),newCategory.admin_id)
            .execute('dbo.addCategory')
            );
            console.log("recorded added!")            
            await pool.close()

        }catch(error){
            console.error('error insert Category: ',error);
            throw error;
        }
    }
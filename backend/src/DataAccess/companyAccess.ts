import { Int } from 'msnodesqlv8';
import * as sql from 'mssql'
import {company, checkC,companyChange} from '../models/company';
const bcrypt = require('bcrypt');

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

export async function getCompanies(){
    try{ 
        const pool = await sql.connect(config);
        const result = await pool.request()
        .query('select * from company');
        if(result.recordset.length > 0){
            // return result.recordset[0];
            return result.recordset;
        }
        return null;
    }
    catch(error){
        console.error('Error fetching company: ',error);
        throw error;
    }}

    export async function getCompaniesBySearch(name:string){
        try{ 
            const pool = await sql.connect(config);
            const result = await pool.request()
            .input("name",sql.VarChar(50),`%${name}%`)
            .query('SELECT * FROM company WHERE name LIKE @name');
            if(result.recordset.length > 0){
                // return result.recordset[0];
                return result.recordset;
            }
            return null;
        }
        catch(error){
            console.error('Error fetching company: ',error);
            throw error;
        }}

    export async function getCompany(newCheck:checkC){
        try{ 
            let validPassword:boolean=false;

            const plainTextPassword = newCheck.password;
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);

            const pool = await sql.connect(config);
            const result = await pool.request()
            .input('email',sql.VarChar(50),newCheck.email)
            .input('password',sql.VarChar(64),hashedPassword)
            .query('SELECT * FROM company where email=@email')
            if(result.recordset.length === 1){
                // return result.recordset[0];
                const user= result.recordset[0];
         
            validPassword =  bcrypt.compare(
                    user.password,
                    newCheck.password
                    );
                
                // return result.recordset;
                if(validPassword){
                    return result.recordset
                }
            }
            return null;
        }
        catch(error){
            console.error('Error fetching company: ',error);
            throw error;
        }}





    export async function AddCompany(newCompany: company){
        try{

            const plainTextPassword = newCompany.password;
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);

            const pool = await sql.connect(config);
            const result = (await pool.request()
            .input('name',sql.VarChar(50),newCompany.name)
            .input('phone',sql.VarChar(50),newCompany.phone)
            .input('email',sql.VarChar(50),newCompany.email)
            .input('password',sql.VarChar(64),hashedPassword)
            .input('location',sql.VarChar(50),newCompany.location)
            .execute('dbo.addCompany')
            );
            console.log("recorded added!")            
            await pool.close()

        }catch(error){
            console.error('error insert company: ',error);
            throw error;
        }
    }

    export async function updateUser(company: companyChange) {
        try{
            const plainTextPassword = company.password;
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);

            const pool = await sql.connect(config);
            const result = (await pool.request()
            .input('company_Id',sql.Int,company.company_Id)
            .input('password',sql.VarChar(64),hashedPassword)
            .query('update company set password=@password where company_Id=@company_Id'));
            pool.close();

        }catch(error){
            console.error('error update user: ',error);
            throw error;
        }
    }

    export async function deleteCompany(company_id: number) {
        const pool = await sql.connect(config);
        try {
            
            const result = await pool.request()
                .input('company_id', sql.Int, company_id)
                .query('delete from company where company_id=@company_id');
                
            console.log('company deleted!');
            pool.close();
        } catch (error) {
            console.error('Error deleting company: ', error);
            throw error;
        } 
    }
import { Int } from 'msnodesqlv8';
import * as sql from 'mssql';
import {user,check,userId, userChange} from '../models/user'
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
export async function getUsers(){
    try{ 
        const pool = await sql.connect(config);
        const result = await pool.request()
        .query('select * from users')
        if(result.recordset.length > 0){
            // return result.recordset[0];
            return result.recordset;
        }
        return null;
    }
    catch(error){
        console.error('Error fetching user: ',error);
        throw error;
    }}
    export async function getUserbyId(id:userId){
        try{ 
            const pool = await sql.connect(config);
            const result = await pool.request()
            .input('id',sql.Int,id.id)
            .execute('dbo.getUserById');
            if(result.recordset.length > 0){
                // return result.recordset[0];
                return result.recordset;
            }
            return null;
        }
        catch(error){
            console.error('Error fetching user: ',error);
            throw error;
        }}

    // export async function getUsercheck(checkUser:check){
    //     try{ 
            
            
    //         const pool = await sql.connect(config);
    //         const result = await pool.request()
    //         .input('email',sql.VarChar(50),checkUser.email)
    //         .input('password',sql.VarChar(64),checkUser.password)
    //         .query('select * from users where email=@email and password=@password')
    //         if(result.recordset.length > 0){
             
    //             return result.recordset;
    //         }
    //         return null;
    //     }
    //     catch(error){
    //         console.error('Error fetching user: ',error);
    //         throw error;
    //     }}
    
    export async function AddUser(newUser: user){
        try{
            const plainTextPassword = newUser.password;
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    
            const pool = await sql.connect(config);
            const result = (await pool.request()
            .input('email',sql.VarChar(50),newUser.email)
            .input('password',sql.VarChar(64),hashedPassword)
            .input('name',sql.VarChar(50),newUser.name)
            .input('phoneNumber',sql.VarChar(50),newUser.phoneNumber)
            .input('isCompany',sql.VarChar(50),newUser.isCompany)
            .execute('dbo.addUsers')
            );
            console.log("recorded added!") 
            await pool.close()

        }catch(error){
            console.error('error insert user: ',error);
            throw error;
        }
    }
    
    export async function updateUser(user: userChange) {
        try{
            const plainTextPassword = user.password;
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    

            const pool = await sql.connect(config);
            const result = (await pool.request()
            .input('userId',sql.Int,user.userId)
            .input('password',sql.VarChar(64),hashedPassword)
            .query('update users set password=@password where userId=@userId'));
            pool.close();

        }catch(error){
            console.error('error update user: ',error);
            throw error;
        }
    }

    export async function deleteUser(userId: number) {
        const pool = await sql.connect(config);
        try {
            
            const result = await pool.request()
                .input('userId', sql.Int, userId)
                .query('delete from users where userId=@userId');
                
            console.log('user deleted!');
            pool.close();
        } catch (error) {
            console.error('Error deleting user: ', error);
            throw error;
        } 
    }

    export async function getUsercheck(checkUser:check){
        try{ 
            let validPassword:boolean=false;
            
            const pool = await sql.connect(config);
            const result = await pool.request()
            .input('email',sql.VarChar(50),checkUser.email)
            .input('password',sql.VarChar(64),checkUser.password)
            .query('select * from users where email=@email')
            if(result.recordset.length === 1){
                // return result.recordset[0];
                const user= result.recordset[0];
         
            validPassword =  bcrypt.compare(
                    user.password,
                    checkUser.password
                    );
                
                // return result.recordset;
                if(validPassword){
                    return result.recordset
                }
            }
            return null;
        }
        catch(error){
            console.error('Error fetching user: ',error);
            throw error;
        }}
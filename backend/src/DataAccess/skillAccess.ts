import { Int } from 'msnodesqlv8';
import * as sql from 'mssql'
import {skills} from '../models/skills';
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

export async function getSkills(id:userId){
    try{ 
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('user_id',sql.Int,id.id)
        .execute('dbo.getSkill');
        if(result.recordset.length > 0){
            // return result.recordset[0];
            return result.recordset;
        }
        return null;
    }
    catch(error){
        console.error('Error fetching skills: ',error);
        throw error;
    }}
    export async function addSkills(newSkills:skills){
        try{
            const pool = await sql.connect(config);
            const result = (await pool.request()
            .input('name', sql.VarChar(50), newSkills.name)
            .input('user_id', sql.Int, newSkills.user_id)
            .input('level', sql.Int, newSkills.level)
            .query('INSERT INTO skill (name, user_id, level) VALUES (@name, @user_id, @level)')

            );
            console.log("recorded added!")            
            await pool.close()

        }catch(error){
            console.error('error insert skill: ',error);
            throw error;
        }
    }

    export async function DeleteSkill(skill_id:number) {
        try{
            const pool= await sql.connect(config)
            const result = ( await pool.request()
            .input('skillId',sql.Int,skill_id)
            .query('delete from skill where skillId=@skillId')
            );

        }catch(error){
            console.log('error delete skill:', error);
            throw error;
        }
    }
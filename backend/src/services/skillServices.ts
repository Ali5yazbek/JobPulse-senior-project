const skills = require('../DataAccess/skillAccess')
import { skills } from "../models/skills";
import {userId} from '../models/user';

export async function getSkills(id:userId){
    try{
    return await skills.getSkills(id.id);
    }
    catch(error){
        console.error('error in skillsService ',error);
        throw error;
    }    
    }
    export async function addSkill(newSkill: skills) {
        try{
            return await skills.addSkills(newSkill);
        }catch(error){
            console.error("error in Skillsservice ",error);
            throw error;
        }
    }
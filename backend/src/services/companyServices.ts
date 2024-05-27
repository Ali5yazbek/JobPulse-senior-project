const company = require('../DataAccess/companyAccess');
import {company} from '../models/company'

export async function getCompanies(){
    try{
    return await company.getCompanies();
    }
    catch(error){
        console.error('error in userService ',error);
        throw error;
    }    
    }
    export async function addCompany(newCompany: company) {
        try{
            return await company.addCompany(newCompany);
        }catch(error){
            console.error("error in userservice ",error);
            throw error;
        }
    }
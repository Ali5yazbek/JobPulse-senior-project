const application = require('../DataAccess/ApplicationAccess');
import { application,appId } from "../models/application";

export async function getApp(id:appId){
    try{
    return await application.getApp(id.company_id);
    }
    catch(error){
        console.error('error in ApplicationService ',error);
        throw error;
    }    
    }
    export async function addApp(newApp:application) {
        try{
            return await application.addApp(newApp);
        }catch(error){
            console.error("error in Applicationservice ",error);
            throw error;
        }
    }
    export async function deleteJob(id:appId) {
        try{
            return await application.deleteApp(id.company_id)

        }catch(error){
            console.error("error in ApplicationService ",error)
            throw error
        }
    }
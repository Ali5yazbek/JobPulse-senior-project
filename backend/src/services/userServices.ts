const user = require('../DataAccess/userAccess');
import {user} from '../models/user'


export async function getUsers(){
    try{
    return await user.getAllUsers();
    }
    catch(error){
        console.error('error in userService ',error);
        throw error;
    }    
    }
    export async function adduser(newUser: user) {
        try{
            return await user.addUser(newUser);
        }catch(error){
            console.error("error in userservice ",error);
            throw error;
        }
    }
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsercheck = exports.deleteUser = exports.updateUser = exports.AddUser = exports.getUserbyId = exports.getUsers = void 0;
const sql = __importStar(require("mssql"));
const bcrypt = require('bcrypt');
const config = {
    user: 'sa',
    password: '123123123',
    server: 'DESKTOP-VFPP5K8\\SQLEXPRESS',
    database: 'jobTracker',
    port: 1433,
    options: {
        connectTimeout: 15000,
        trustServerCertificate: true,
    }
};
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield sql.connect(config);
            const result = yield pool.request()
                .query('select * from users');
            if (result.recordset.length > 0) {
                // return result.recordset[0];
                return result.recordset;
            }
            return null;
        }
        catch (error) {
            console.error('Error fetching user: ', error);
            throw error;
        }
    });
}
exports.getUsers = getUsers;
function getUserbyId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield sql.connect(config);
            const result = yield pool.request()
                .input('id', sql.Int, id.id)
                .execute('dbo.getUserById');
            if (result.recordset.length > 0) {
                // return result.recordset[0];
                return result.recordset;
            }
            return null;
        }
        catch (error) {
            console.error('Error fetching user: ', error);
            throw error;
        }
    });
}
exports.getUserbyId = getUserbyId;
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
function AddUser(newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const plainTextPassword = newUser.password;
            const saltRounds = 10;
            const hashedPassword = yield bcrypt.hash(plainTextPassword, saltRounds);
            const pool = yield sql.connect(config);
            const result = (yield pool.request()
                .input('email', sql.VarChar(50), newUser.email)
                .input('password', sql.VarChar(64), hashedPassword)
                .input('name', sql.VarChar(50), newUser.name)
                .input('phoneNumber', sql.VarChar(50), newUser.phoneNumber)
                .input('isCompany', sql.VarChar(50), newUser.isCompany)
                .execute('dbo.addUsers'));
            console.log("recorded added!");
            yield pool.close();
        }
        catch (error) {
            console.error('error insert user: ', error);
            throw error;
        }
    });
}
exports.AddUser = AddUser;
function updateUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const plainTextPassword = user.password;
            const saltRounds = 10;
            const hashedPassword = yield bcrypt.hash(plainTextPassword, saltRounds);
            const pool = yield sql.connect(config);
            const result = (yield pool.request()
                .input('userId', sql.Int, user.userId)
                .input('password', sql.VarChar(64), hashedPassword)
                .query('update users set password=@password where userId=@userId'));
            pool.close();
        }
        catch (error) {
            console.error('error update user: ', error);
            throw error;
        }
    });
}
exports.updateUser = updateUser;
function deleteUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield sql.connect(config);
        try {
            const result = yield pool.request()
                .input('userId', sql.Int, userId)
                .query('delete from users where userId=@userId');
            console.log('user deleted!');
            pool.close();
        }
        catch (error) {
            console.error('Error deleting user: ', error);
            throw error;
        }
    });
}
exports.deleteUser = deleteUser;
function getUsercheck(checkUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let validPassword = false;
            const pool = yield sql.connect(config);
            const result = yield pool.request()
                .input('email', sql.VarChar(50), checkUser.email)
                .input('password', sql.VarChar(64), checkUser.password)
                .query('select * from users where email=@email');
            if (result.recordset.length === 1) {
                // return result.recordset[0];
                const user = result.recordset[0];
                validPassword = bcrypt.compare(user.password, checkUser.password);
                // return result.recordset;
                if (validPassword) {
                    return result.recordset;
                }
            }
            return null;
        }
        catch (error) {
            console.error('Error fetching user: ', error);
            throw error;
        }
    });
}
exports.getUsercheck = getUsercheck;

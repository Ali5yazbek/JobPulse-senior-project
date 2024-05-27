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
exports.deleteCompany = exports.updateUser = exports.AddCompany = exports.getCompany = exports.getCompaniesBySearch = exports.getCompanies = void 0;
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
function getCompanies() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield sql.connect(config);
            const result = yield pool.request()
                .query('select * from company');
            if (result.recordset.length > 0) {
                // return result.recordset[0];
                return result.recordset;
            }
            return null;
        }
        catch (error) {
            console.error('Error fetching company: ', error);
            throw error;
        }
    });
}
exports.getCompanies = getCompanies;
function getCompaniesBySearch(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield sql.connect(config);
            const result = yield pool.request()
                .input("name", sql.VarChar(50), `%${name}%`)
                .query('SELECT * FROM company WHERE name LIKE @name');
            if (result.recordset.length > 0) {
                // return result.recordset[0];
                return result.recordset;
            }
            return null;
        }
        catch (error) {
            console.error('Error fetching company: ', error);
            throw error;
        }
    });
}
exports.getCompaniesBySearch = getCompaniesBySearch;
function getCompany(newCheck) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let validPassword = false;
            const plainTextPassword = newCheck.password;
            const saltRounds = 10;
            const hashedPassword = yield bcrypt.hash(plainTextPassword, saltRounds);
            const pool = yield sql.connect(config);
            const result = yield pool.request()
                .input('email', sql.VarChar(50), newCheck.email)
                .input('password', sql.VarChar(64), hashedPassword)
                .query('SELECT * FROM company where email=@email');
            if (result.recordset.length === 1) {
                // return result.recordset[0];
                const user = result.recordset[0];
                validPassword = bcrypt.compare(user.password, newCheck.password);
                // return result.recordset;
                if (validPassword) {
                    return result.recordset;
                }
            }
            return null;
        }
        catch (error) {
            console.error('Error fetching company: ', error);
            throw error;
        }
    });
}
exports.getCompany = getCompany;
function AddCompany(newCompany) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const plainTextPassword = newCompany.password;
            const saltRounds = 10;
            const hashedPassword = yield bcrypt.hash(plainTextPassword, saltRounds);
            const pool = yield sql.connect(config);
            const result = (yield pool.request()
                .input('name', sql.VarChar(50), newCompany.name)
                .input('phone', sql.VarChar(50), newCompany.phone)
                .input('email', sql.VarChar(50), newCompany.email)
                .input('password', sql.VarChar(64), hashedPassword)
                .input('location', sql.VarChar(50), newCompany.location)
                .execute('dbo.addCompany'));
            console.log("recorded added!");
            yield pool.close();
        }
        catch (error) {
            console.error('error insert company: ', error);
            throw error;
        }
    });
}
exports.AddCompany = AddCompany;
function updateUser(company) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const plainTextPassword = company.password;
            const saltRounds = 10;
            const hashedPassword = yield bcrypt.hash(plainTextPassword, saltRounds);
            const pool = yield sql.connect(config);
            const result = (yield pool.request()
                .input('company_Id', sql.Int, company.company_Id)
                .input('password', sql.VarChar(64), hashedPassword)
                .query('update company set password=@password where company_Id=@company_Id'));
            pool.close();
        }
        catch (error) {
            console.error('error update user: ', error);
            throw error;
        }
    });
}
exports.updateUser = updateUser;
function deleteCompany(company_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield sql.connect(config);
        try {
            const result = yield pool.request()
                .input('company_id', sql.Int, company_id)
                .query('delete from company where company_id=@company_id');
            console.log('company deleted!');
            pool.close();
        }
        catch (error) {
            console.error('Error deleting company: ', error);
            throw error;
        }
    });
}
exports.deleteCompany = deleteCompany;

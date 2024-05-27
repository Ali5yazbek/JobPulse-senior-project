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
exports.updateApp = exports.AddApp = exports.deleteApp = exports.getAppUSer = exports.getApp = void 0;
const sql = __importStar(require("mssql"));
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
function getApp(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield sql.connect(config);
            const result = yield pool.request()
                .input('company_id', sql.Int, id.company_id)
                .query('select * from application where company_id=@company_id');
            if (result.recordset.length > 0) {
                // return result.recordset[0];
                return result.recordset;
            }
            return null;
        }
        catch (error) {
            console.error('Error fetching application: ', error);
            throw error;
        }
    });
}
exports.getApp = getApp;
function getAppUSer(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield sql.connect(config);
            const result = yield pool
                .request()
                .input('user_id', sql.Int, id.user_id)
                .query('select * from application where user_id=@user_id');
            return result.recordset;
        }
        catch (error) {
            console.error('Error fetching application: ', error);
            throw error;
        }
    });
}
exports.getAppUSer = getAppUSer;
function deleteApp(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield sql.connect(config);
        try {
            const result = yield pool.request()
                .input('application_id', sql.Int, id)
                .query('delete from application where application_id=@application_id');
            console.log('Application deleted!');
            pool.close();
        }
        catch (error) {
            console.error('Error deleting application: ', error);
            throw error;
        }
    });
}
exports.deleteApp = deleteApp;
function AddApp(newApplication) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield sql.connect(config);
            const result = (yield pool.request()
                .input('status', sql.VarChar(50), newApplication.status)
                .input('appliedDate', sql.VarChar(50), newApplication.appliedDate)
                .input('user_id', sql.Int, newApplication.user_id)
                .input('company_id', sql.Int, newApplication.company_id)
                .input('jobName', sql.VarChar(50), newApplication.jobName)
                .input('userName', sql.VarChar(50), newApplication.userName)
                .input('phone', sql.VarChar(50), newApplication.phone)
                .input('email', sql.VarChar(50), newApplication.email)
                .input('Description', sql.VarChar(50), newApplication.Description)
                .query('INSERT INTO application VALUES(@status, @appliedDate, @user_id, @company_id, @jobName, @userName,@phone,@email,@Description)'));
            console.log("recorded added!");
            yield pool.close();
        }
        catch (error) {
            console.error('error insert application: ', error);
            throw error;
        }
    });
}
exports.AddApp = AddApp;
function updateApp(status) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield sql.connect(config);
            const result = (yield pool.request()
                .input('application_id', sql.Int, status)
                .query('update application set status="true" where application_id=@application_id'));
            pool.close();
        }
        catch (error) {
            console.error('error update application: ', error);
            throw error;
        }
    });
}
exports.updateApp = updateApp;

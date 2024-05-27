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
exports.updateStatus = exports.deleteJob = exports.updateSalay = exports.AddJob = exports.getJobByCompanyId = exports.getJobByCategoryId = exports.getJobs = void 0;
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
function getJobs() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield sql.connect(config);
            const result = yield pool.request()
                .execute('dbo.getAllJobs');
            if (result.recordset.length > 0) {
                // return result.recordset[0];
                return result.recordset;
            }
            return null;
        }
        catch (error) {
            console.error('Error fetching job: ', error);
            throw error;
        }
    });
}
exports.getJobs = getJobs;
function getJobByCategoryId(jobsC) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield sql.connect(config);
            const result = yield pool.request()
                .input("category_id", sql.Int, jobsC.category_id)
                .query('select * from job where category_id=@category_id');
            if (result.recordset.length > 0) {
                // return result.recordset[0];
                return result.recordset;
            }
            return null;
        }
        catch (error) {
            console.error('Error fetching job: ', error);
            throw error;
        }
    });
}
exports.getJobByCategoryId = getJobByCategoryId;
function getJobByCompanyId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield sql.connect(config);
            const result = yield pool.request()
                .input("company_id", sql.Int, id.company_id)
                .query('select * from job where company_id=@company_id');
            if (result.recordset.length > 0) {
                // return result.recordset[0];
                return result.recordset;
            }
            return null;
        }
        catch (error) {
            console.error('Error fetching job: ', error);
            throw error;
        }
    });
}
exports.getJobByCompanyId = getJobByCompanyId;
function AddJob(newJob) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield sql.connect(config);
            const result = (yield pool.request()
                .input('title', sql.VarChar(50), newJob.title)
                .input('description', sql.VarChar(50), newJob.description)
                .input('salary', sql.VarChar(50), newJob.salary)
                .input('skills', sql.VarChar(50), newJob.skills)
                .input('postDate', sql.VarChar(50), newJob.postDate)
                .input('company_id', sql.Int, newJob.company_id)
                .input('admin_id', sql.Int, newJob.admin_id)
                .input('category_id', sql.Int, newJob.category_id)
                .input('location', sql.VarChar(50), newJob.location)
                .input('time', sql.VarChar(50), newJob.time)
                .input('status', sql.Int, newJob.status)
                .query('insert into job values(@title,@description,@salary,@skills,@postDate,@company_id,@admin_id,@category_id,@location,@time,@status)'));
            console.log("recorded added!");
            yield pool.close();
        }
        catch (error) {
            console.error('error insert job: ', error);
            throw error;
        }
    });
}
exports.AddJob = AddJob;
function updateSalay(updateJob) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield sql.connect(config);
            const result = (yield pool.request()
                .input('job_id', sql.Int, updateJob.job_id)
                .input('salary', sql.VarChar(50), updateJob.salary)
                .execute('dbo.updateJobSalary'));
            console.log('job updated!');
            pool.close();
        }
        catch (error) {
            console.error('error insert job: ', error);
            throw error;
        }
    });
}
exports.updateSalay = updateSalay;
function deleteJob(job_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield sql.connect(config);
            const result = (yield pool.request()
                .input('job_id', sql.Int, job_id)
                .query('delete from job where job_id=@job_id'));
            console.log('item deleted! ');
            pool.close();
        }
        catch (error) {
            console.error('error delete job: ', error);
            throw error;
        }
    });
}
exports.deleteJob = deleteJob;
function updateStatus(job_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield sql.connect(config);
            const result = (yield pool.request()
                .input('job_id', sql.Int, job_id)
                .input('status', sql.Int, 1)
                .query('UPDATE job SET status = @status WHERE job_id = @job_id'));
            console.log('job updated! ');
            pool.close();
        }
        catch (error) {
            console.error('error update job: ', error);
            throw error;
        }
    });
}
exports.updateStatus = updateStatus;

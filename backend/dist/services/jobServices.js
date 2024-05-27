"use strict";
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
exports.deleteJob = exports.updateSalary = exports.addJob = exports.getJobs = void 0;
const jobs = require('../DataAccess/jobAccess');
function getJobs() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield jobs.getJobs();
        }
        catch (error) {
            console.error('error in jobService ', error);
            throw error;
        }
    });
}
exports.getJobs = getJobs;
function addJob(newJob) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield jobs.addJob(newJob);
        }
        catch (error) {
            console.error("error in Jobservice ", error);
            throw error;
        }
    });
}
exports.addJob = addJob;
function updateSalary(newJobSalary) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield jobs.updateSalary(newJobSalary);
        }
        catch (error) {
            console.error("error in JobService ", error);
            throw error;
        }
    });
}
exports.updateSalary = updateSalary;
function deleteJob(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield jobs.deleteJob(id.job_id);
        }
        catch (error) {
            console.error("error in JobService ", error);
            throw error;
        }
    });
}
exports.deleteJob = deleteJob;

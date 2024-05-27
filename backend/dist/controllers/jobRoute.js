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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobServices = __importStar(require("../services/jobServices"));
const jobAccess = __importStar(require("../DataAccess/jobAccess"));
const routerJob = express_1.default.Router();
routerJob.get('/getJobs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const job = yield jobAccess.getJobs();
        if (job) {
            res.json(job);
        }
        else {
            res.status(404).json({ message: 'user not found' });
        }
    }
    catch (error) {
        console.error('Error in userRoutes: ', error);
        res.status(500).json({ message: 'Internal server Error' });
    }
}));
routerJob.post('/getJobCategory', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const job = yield jobAccess.getJobByCategoryId(body);
        if (job) {
            res.json(job);
        }
        else {
            res.status(404).json({ message: 'user not found' });
        }
    }
    catch (error) {
        console.error('Error in userRoutes: ', error);
        res.status(500).json({ message: 'Internal server Error' });
    }
}));
routerJob.post('/getJobCompanyId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const job = yield jobAccess.getJobByCompanyId(body);
        if (job) {
            res.json(job);
        }
        else {
            res.status(404).json({ message: 'user not found' });
        }
    }
    catch (error) {
        console.error('Error in userRoutes: ', error);
        res.status(500).json({ message: 'Internal server Error' });
    }
}));
routerJob.put('/updateStatus', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const job_id = req.body;
        const job = yield jobAccess.updateStatus(parseInt(job_id.job_id));
        res.status(201).json({ message: ' job updated!' });
    }
    catch (error) {
        console.error('Error in jobRoutes: ', error);
        res.status(500).json({ message: 'Internal server Error' });
    }
}));
routerJob.post('/addJob', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newJob = req.body;
        // const userId = await userService.addUser(newUser);
        yield jobAccess.AddJob(newJob);
        res.status(201).json({ message: 'Job added successfully' });
    }
    catch (error) {
        console.error('Error in jobRoutes: ', error);
        res.status(500).json({ message: 'Internal server Error' });
    }
}));
routerJob.put('/updateSalary', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newJobSalary = req.body;
        yield jobServices.updateSalary(newJobSalary);
    }
    catch (error) {
        console.error('error in jobRoutes', error);
        res.status(500).json({ message: 'Internal server Error' });
    }
}));
routerJob.delete('/deleteJob/:job_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const job_id = parseInt(req.params.job_id);
        yield jobAccess.deleteJob(job_id);
    }
    catch (error) {
        console.error('error in jobRoutes', error);
        res.status(500).json({ message: 'Internal server Error' });
    }
}));
exports.default = routerJob;

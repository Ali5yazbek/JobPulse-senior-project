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
const companyAccess = __importStar(require("../DataAccess/companyAccess"));
const routerCompany = express_1.default.Router();
routerCompany.get('/company', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const company = yield companyAccess.getCompanies();
        if (company) {
            res.json(company);
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
routerCompany.post('/companyCheck', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkCompany = req.body;
        const company = yield companyAccess.getCompany(checkCompany);
        if (company) {
            res.json(company);
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
routerCompany.post('/companySearch', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkCompany = req.body;
        const company = yield companyAccess.getCompaniesBySearch(checkCompany);
        if (company) {
            res.json(company);
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
routerCompany.post('/addCompany', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCompany = req.body;
        // const userId = await userService.addUser(newUser);
        yield companyAccess.AddCompany(newCompany);
        res.status(201).json({ message: 'User added successfully' });
    }
    catch (error) {
        console.error('Error in userRoutes: ', error);
        res.status(500).json({ message: 'Internal server Error' });
    }
}));
routerCompany.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const u = req.body;
        yield companyAccess.updateUser(u);
        res.status(201).json({ message: ' password updated!' });
    }
    catch (error) {
        console.error('error in userroutes', error);
        res.status(500).json({ message: 'Internal server Error' });
    }
}));
routerCompany.delete('/deleteCompany/:company_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const deleteApp: appId2 = req.body;
        const company_id = req.params.company_id;
        yield companyAccess.deleteCompany(parseInt(company_id));
        res.status(201).json({ message: ' Company deleted!' });
    }
    catch (error) {
        console.error('error in CompanyRoutes', error);
        res.status(500).json({ message: 'Internal server Error' });
    }
}));
exports.default = routerCompany;

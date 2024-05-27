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
const applicationAccess = __importStar(require("../DataAccess/ApplicationAccess"));
const routerApp = express_1.default.Router();
routerApp.post('/application', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appId = req.body;
        const app = yield applicationAccess.getApp(appId);
        if (app) {
            res.json(app);
        }
        else {
            res.status(404).json({ message: 'application not found' });
        }
    }
    catch (error) {
        console.error("error in internalService ", error);
        throw error;
    }
}));
routerApp.delete('/deleteApp/:application_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const deleteApp: appId2 = req.body;
        const application_id = req.params.application_id;
        yield applicationAccess.deleteApp(parseInt(application_id));
        res.status(201).json({ message: ' Application deleted!' });
    }
    catch (error) {
        console.error('error in AppRoutes', error);
        res.status(500).json({ message: 'Internal server Error' });
    }
}));
routerApp.post('/appUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appId = req.body;
        const app = yield applicationAccess.getAppUSer(appId);
        if (app) {
            res.json(app);
        }
        else {
            res.status(404).json({ message: 'application not found' });
        }
    }
    catch (error) {
        console.error('error in Approutes', error);
        res.status(500).json({ message: 'Internal server Error' });
    }
}));
routerApp.post('/addApp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const app = req.body;
        yield applicationAccess.AddApp(app);
    }
    catch (error) {
        console.error('error in Approutes', error);
        res.status(500).json({ message: 'Internal server Error' });
    }
}));
routerApp.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const app = req.body;
        yield applicationAccess.updateApp(parseInt(app.application));
        res.status(201).json({ message: ' Application updated!' });
    }
    catch (error) {
        console.error('error in Approutes', error);
        res.status(500).json({ message: 'Internal server Error' });
    }
}));
exports.default = routerApp;

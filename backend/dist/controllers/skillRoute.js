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
const skillAccess = __importStar(require("../DataAccess/skillAccess"));
const routerSkills = express_1.default.Router();
routerSkills.post('/skills', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body;
        const skill = yield skillAccess.getSkills(id);
        if (skill) {
            res.json(skill);
        }
        else {
            res.status(404).json({ message: 'skill not found' });
        }
    }
    catch (error) {
        console.error("error in internalService ", error);
        throw error;
    }
}));
routerSkills.post('/addSkill', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skill = req.body;
        yield skillAccess.addSkills(skill);
        res.status(201).json({ message: 'skill added successfully' });
    }
    catch (error) {
        console.error("error in internalService ", error);
        throw error;
    }
}));
routerSkills.delete('/deleteSkill/:skillId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const deleteApp: appId2 = req.body;
        const skillId = req.params.skillId;
        yield skillAccess.DeleteSkill(parseInt(skillId));
        res.status(201).json({ message: ' skill deleted!' });
    }
    catch (error) {
        console.error('error in SkillRoutes', error);
        res.status(500).json({ message: 'Internal server Error' });
    }
}));
exports.default = routerSkills;

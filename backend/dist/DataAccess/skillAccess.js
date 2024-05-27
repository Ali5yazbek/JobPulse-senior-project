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
exports.DeleteSkill = exports.addSkills = exports.getSkills = void 0;
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
function getSkills(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield sql.connect(config);
            const result = yield pool.request()
                .input('user_id', sql.Int, id.id)
                .execute('dbo.getSkill');
            if (result.recordset.length > 0) {
                // return result.recordset[0];
                return result.recordset;
            }
            return null;
        }
        catch (error) {
            console.error('Error fetching skills: ', error);
            throw error;
        }
    });
}
exports.getSkills = getSkills;
function addSkills(newSkills) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield sql.connect(config);
            const result = (yield pool.request()
                .input('name', sql.VarChar(50), newSkills.name)
                .input('user_id', sql.Int, newSkills.user_id)
                .input('level', sql.Int, newSkills.level)
                .query('INSERT INTO skill (name, user_id, level) VALUES (@name, @user_id, @level)'));
            console.log("recorded added!");
            yield pool.close();
        }
        catch (error) {
            console.error('error insert skill: ', error);
            throw error;
        }
    });
}
exports.addSkills = addSkills;
function DeleteSkill(skill_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield sql.connect(config);
            const result = (yield pool.request()
                .input('skillId', sql.Int, skill_id)
                .query('delete from skill where skillId=@skillId'));
        }
        catch (error) {
            console.log('error delete skill:', error);
            throw error;
        }
    });
}
exports.DeleteSkill = DeleteSkill;

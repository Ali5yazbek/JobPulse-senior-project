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
exports.addSkill = exports.getSkills = void 0;
const skills = require('../DataAccess/skillAccess');
function getSkills(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield skills.getSkills(id.id);
        }
        catch (error) {
            console.error('error in skillsService ', error);
            throw error;
        }
    });
}
exports.getSkills = getSkills;
function addSkill(newSkill) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield skills.addSkills(newSkill);
        }
        catch (error) {
            console.error("error in Skillsservice ", error);
            throw error;
        }
    });
}
exports.addSkill = addSkill;

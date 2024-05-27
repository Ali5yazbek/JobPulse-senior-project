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
exports.addCompany = exports.getCompanies = void 0;
const company = require('../DataAccess/companyAccess');
function getCompanies() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield company.getCompanies();
        }
        catch (error) {
            console.error('error in userService ', error);
            throw error;
        }
    });
}
exports.getCompanies = getCompanies;
function addCompany(newCompany) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield company.addCompany(newCompany);
        }
        catch (error) {
            console.error("error in userservice ", error);
            throw error;
        }
    });
}
exports.addCompany = addCompany;

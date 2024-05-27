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
exports.deleteJob = exports.addApp = exports.getApp = void 0;
const application = require('../DataAccess/ApplicationAccess');
function getApp(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield application.getApp(id.company_id);
        }
        catch (error) {
            console.error('error in ApplicationService ', error);
            throw error;
        }
    });
}
exports.getApp = getApp;
function addApp(newApp) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield application.addApp(newApp);
        }
        catch (error) {
            console.error("error in Applicationservice ", error);
            throw error;
        }
    });
}
exports.addApp = addApp;
function deleteJob(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield application.deleteApp(id.company_id);
        }
        catch (error) {
            console.error("error in ApplicationService ", error);
            throw error;
        }
    });
}
exports.deleteJob = deleteJob;

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
exports.addCategory = exports.getCategory = void 0;
const category = require('../DataAccess/category');
function getCategory() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield category.getCategory();
        }
        catch (error) {
            console.error('error in categoryService ', error);
            throw error;
        }
    });
}
exports.getCategory = getCategory;
function addCategory(newCategory) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield category.addCategory(newCategory);
        }
        catch (error) {
            console.error("error in Categoryservice ", error);
            throw error;
        }
    });
}
exports.addCategory = addCategory;

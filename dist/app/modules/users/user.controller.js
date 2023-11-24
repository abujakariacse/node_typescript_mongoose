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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const student_validation_1 = __importDefault(require("./student.validation"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const validatedData = student_validation_1.default.parse(user);
        const result = yield user_service_1.UserServices.createUserToDB(validatedData);
        res.status(201).json({
            status: true,
            message: 'User created successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message,
            error: {
                code: res.statusCode,
                description: err.message,
            },
        });
    }
});
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.getAllUser();
        res.status(200).json({
            status: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message,
            error: {
                code: res.statusCode,
                description: err.message,
            },
        });
    }
});
const getAUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.getSpecificUser(Number(userId));
        res.status(200).json({
            status: true,
            message: 'User fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(404).json({
            status: false,
            message: err.message,
            error: {
                code: res.statusCode,
                description: err.message,
            },
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const userData = req.body;
        const validatedUserData = student_validation_1.default.parse(userData);
        const result = yield user_service_1.UserServices.updateSpecificUser(Number(userId), validatedUserData);
        res.status(200).json({
            status: true,
            message: 'User updated successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(404).json({
            status: false,
            message: err.message,
            error: {
                code: res.statusCode,
                description: err.message,
            },
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.deleteSpecificUser(Number(userId));
        res.status(200).json({
            status: true,
            message: 'User deleted successfully!',
            data: null,
        });
    }
    catch (err) {
        res.status(404).json({
            status: false,
            message: err.message,
            error: {
                code: res.statusCode,
                description: err.message,
            },
        });
    }
});
exports.UserController = {
    createUser,
    getUsers,
    getAUser,
    updateUser,
    deleteUser,
};

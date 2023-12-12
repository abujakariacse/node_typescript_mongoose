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
const user_validation_1 = __importDefault(require("./user.validation"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const { error, value } = user_validation_1.default.validate(user);
        const result = yield user_service_1.UserServices.createUserToDB(value);
        res.status(201).json({
            status: true,
            message: 'User created successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message || 'Something went wrong',
            error: err,
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message || 'Something went wrong',
            error: err,
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(404).json({
            status: false,
            message: err.message,
            error: {
                code: res.statusCode,
                description: 'User not found',
            },
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const userData = req.body;
        const { error, value } = user_validation_1.default.validate(userData);
        const result = yield user_service_1.UserServices.updateSpecificUser(Number(userId), value);
        res.status(200).json({
            status: true,
            message: 'User updated successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(404).json({
            status: false,
            message: err.message || 'User not found',
            error: {
                code: res.statusCode,
                description: 'User not found',
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(404).json({
            status: false,
            message: err.message || 'User not found',
            error: {
                code: res.statusCode,
                description: 'User not found',
            },
        });
    }
});
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const body = req.body;
        const result = yield user_service_1.UserServices.createOrderToDB(Number(userId), body);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message || 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.getOrderFromDB(Number(userId));
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message || 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const sumOfOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.getTotalPriceOfOrders(Number(userId));
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message || 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
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
    createOrder,
    getOrders,
    sumOfOrders,
};

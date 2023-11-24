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
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
// Create User
const createUserToDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExist(user === null || user === void 0 ? void 0 : user.userId)) {
        throw new Error('User already exist');
    }
    const result = yield user_model_1.User.create(user);
    return result;
});
// Get Users
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.aggregate([
        {
            $project: {
                username: 1,
                fullName: 1,
                age: 1,
                email: 1,
                address: 1,
            },
        },
    ]);
    return users;
});
// Retrive Specific User
const getSpecificUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExist(userId)) {
        const user = yield user_model_1.User.findOne({ userId });
        return user;
    }
    else {
        throw new Error('User not found');
    }
});
const updateSpecificUser = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExist(userId)) {
        const updatedUserInfo = yield user_model_1.User.findOneAndUpdate({ userId }, { $set: userData }, { new: true });
        return updatedUserInfo;
    }
    else {
        throw new Error('User not found');
    }
});
const deleteSpecificUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExist(userId)) {
        const result = yield user_model_1.User.deleteOne({ userId });
        return null;
    }
    else {
        throw new Error('User not found');
    }
});
exports.UserServices = {
    createUserToDB,
    getAllUser,
    getSpecificUser,
    updateSpecificUser,
    deleteSpecificUser,
};

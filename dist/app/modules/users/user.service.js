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
                _id: 0,
                userId: 0,
                isActive: 0,
                hobbies: 0,
                orders: 0,
                fullName: {
                    _id: 0,
                },
                address: {
                    _id: 0,
                },
                isDeleted: 0,
                __v: 0,
            },
        },
    ]);
    return users;
});
// Retrive Specific User
const getSpecificUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExist(userId)) {
        const user = yield user_model_1.User.findOne({ userId }).select('-_id -orders -__v -fullName._id -address._id -isDeleted');
        return user;
    }
    else {
        throw new Error('User not found');
    }
});
const updateSpecificUser = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExist(userId)) {
        const updatedUserInfo = yield user_model_1.User.findOneAndUpdate({ userId }, { $set: userData }, { new: true }).select('-_id -orders -__v -fullName._id -address._id -isDeleted');
        return updatedUserInfo;
    }
    else {
        throw new Error('User not found');
    }
});
const deleteSpecificUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExist(userId)) {
        const result = yield user_model_1.User.findOneAndUpdate({ userId }, { isDeleted: true }).select('isDeleted');
        if (result === null || result === void 0 ? void 0 : result.isDeleted)
            return null;
    }
    else {
        throw new Error('User not found');
    }
});
const createOrderToDB = (userId, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExist(userId)) {
        const result = yield user_model_1.User.findOneAndUpdate({ userId: userId }, { $push: { orders: orderData } }, { new: true });
        return null;
    }
    else {
        throw new Error('User not found');
    }
});
const getOrderFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExist(userId)) {
        const result = yield user_model_1.User.findOne({ userId }).select('-orders._id -_id -userName -age -address -isDeleted -isActive -fullName -username -userId -password -email -hobbies -__v');
        return result;
    }
    return null;
});
const getTotalPriceOfOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExist(userId)) {
        const getUserId = yield user_model_1.User.findOne({
            userId,
        }).select('_id');
        const userData = yield user_model_1.User.aggregate([
            // Stage -1
            {
                $match: {
                    _id: {
                        $in: [getUserId._id],
                    },
                },
            },
            // Stage - 2
            {
                $unwind: '$orders',
            },
            // Stage - 3
            // Multiply product price and quantity
            {
                $project: {
                    orders: 1,
                    total: {
                        $multiply: ['$orders.quantity', '$orders.price'],
                    },
                },
            },
            // Stage - 4
            // Sum total
            {
                $group: {
                    _id: 'orders.price',
                    totalPrice: {
                        $sum: { $sum: '$total' },
                    },
                },
            },
            //stage -5
            //  Sum Total Price
            {
                $group: {
                    _id: '$_id._id',
                    totalPrice: {
                        $sum: { $sum: '$totalPrice' },
                    },
                },
            },
            //stage -6
            //  remove _id using project
            {
                $project: {
                    _id: 0,
                },
            },
        ]);
        return userData;
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
    createOrderToDB,
    getOrderFromDB,
    getTotalPriceOfOrders,
};

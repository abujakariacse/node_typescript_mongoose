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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const AddressSchema = new mongoose_1.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
});
const FullNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
});
const OrderShema = new mongoose_1.Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});
const UserSchema = new mongoose_1.Schema({
    userId: { type: Number, unique: true, required: true },
    username: { type: String, required: true, unique: true, trim: true },
    password: {
        type: String,
        required: true,
    },
    fullName: { type: FullNameSchema, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
    hobbies: { type: [String], required: true },
    address: { type: AddressSchema, required: true },
    orders: {
        type: [OrderShema],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, 
// This will return data without password as response
{
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
            return ret;
        },
    },
});
// Pre middleware/hooks
// Pre hook to save password as hash
// It will works on create and update password
UserSchema.pre(/^(updateOne|save|findOneAndUpdate)/, function (next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias, @typescript-eslint/no-explicit-any
        const user = this;
        try {
            if (user.password) {
                if (user.isModified('password')) {
                    user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.salt_round));
                }
                return next();
            }
            // eslint-disable-next-line no-unsafe-optional-chaining
            const userCredentails = (_a = user.getUpdate()) === null || _a === void 0 ? void 0 : _a.$set;
            if (userCredentails === null || userCredentails === void 0 ? void 0 : userCredentails.password) {
                user._update.password = yield bcrypt_1.default.hash(userCredentails === null || userCredentails === void 0 ? void 0 : userCredentails.password, Number(config_1.default.salt_round));
            }
            next();
        }
        catch (error) {
            console.log(error);
        }
    });
});
//Pre hook to check user is deleted or not
UserSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
UserSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
UserSchema.pre('aggregate', function () {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});
// Custom Statics
UserSchema.statics.isUserExist = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.User.findOne({ userId });
        return existingUser;
    });
};
exports.User = (0, mongoose_1.model)('Users', UserSchema);

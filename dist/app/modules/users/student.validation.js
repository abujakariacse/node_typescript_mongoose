"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const AddressValidationSchema = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string(),
});
const FullNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .max(20, { message: 'First name must be at most 20 characters long' }),
    lastName: zod_1.z
        .string()
        .max(20, { message: 'Last name must be at most 20 characters long' }),
});
const UserValidationSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string(),
    password: zod_1.z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' }),
    fullName: FullNameValidationSchema,
    age: zod_1.z.number(),
    email: zod_1.z.string().email(),
    isActive: zod_1.z.boolean().default(true),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: AddressValidationSchema,
});
exports.default = UserValidationSchema;

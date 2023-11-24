import { Schema, model } from 'mongoose';
import { Address, FullName, User } from './user.interface';

const AddressSchema = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const FullNameSchema = new Schema<FullName>({
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

const UserSchema = new Schema<User>(
  {
    userId: { type: Number, required: true, unique: true },
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
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  },
);

export const UserModel = model<User>('Users', UserSchema);

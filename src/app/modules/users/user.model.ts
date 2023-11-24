import { Schema, model } from 'mongoose';
import { Address, FullName, User } from './user.interface';

const AddressSchema = new Schema<Address>({
  street: { type: String, required: [true, 'Street is required'] },
  city: { type: String, required: [true, 'City is required'] },
  country: { type: String, required: [true, 'City is required'] },
});

const FullNameSchema = new Schema<FullName>({
  firstName: { type: String, required: [true, 'First name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
});

const UserSchema = new Schema<User>(
  {
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be 8 charecter or more'],
    },
    fullName: { type: FullNameSchema, required: [true, 'Name is required'] },
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

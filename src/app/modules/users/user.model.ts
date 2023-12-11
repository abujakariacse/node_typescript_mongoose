import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  UserModel,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const AddressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const FullNameSchema = new Schema<TFullName>({
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

const OrderShema = new Schema<TOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const UserSchema = new Schema<TUser, UserModel>(
  {
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
  },
);

// Pre middleware/hooks

// Pre hook to save password as hash
UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.salt_round));
  next();
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

// Custom Statics
UserSchema.statics.isUserExist = async function (userId) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>('Users', UserSchema);

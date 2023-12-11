import { TOrder, TUser } from './user.interface';
import { User } from './user.model';

// Create User
const createUserToDB = async (user: TUser) => {
  if (await User.isUserExist(user?.userId)) {
    throw new Error('User already exist');
  }

  const result = await User.create(user);
  return result;
};

// Get Users
const getAllUser = async () => {
  const users = await User.aggregate([
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
};

// Retrive Specific User
const getSpecificUser = async (userId: number) => {
  if (await User.isUserExist(userId)) {
    const user = await User.findOne({ userId }).select(
      '-_id -orders -__v -fullName._id -address._id -isDeleted',
    );
    return user;
  } else {
    throw new Error('User not found');
  }
};

const updateSpecificUser = async (userId: number, userData: TUser) => {
  if (await User.isUserExist(userId)) {
    const updatedUserInfo = await User.findOneAndUpdate(
      { userId },
      { $set: userData },
      { new: true },
    ).select('-_id -orders -__v -fullName._id -address._id -isDeleted');
    return updatedUserInfo;
  } else {
    throw new Error('User not found');
  }
};

const deleteSpecificUser = async (userId: number) => {
  if (await User.isUserExist(userId)) {
    const result = await User.findOneAndUpdate(
      { userId },
      { isDeleted: true },
    ).select('isDeleted');
    if (result?.isDeleted) return null;
  } else {
    throw new Error('User not found');
  }
};

const createOrderToDB = async (userId: number, data: TOrder) => {
  if (await User.isUserExist(userId)) {
    const result = await User.findOneAndUpdate(
      { userId },
      { $set: { orders: data } },
    ).select('orders');
  }
  return null;
};

export const UserServices = {
  createUserToDB,
  getAllUser,
  getSpecificUser,
  updateSpecificUser,
  deleteSpecificUser,
  createOrderToDB,
};

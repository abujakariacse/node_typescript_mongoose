import { TUser } from './user.interface';
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
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    },
  ]);
  return users;
};

// Retrive Specific User
const getSpecificUser = async (userId: number) => {
  if (await User.isUserExist(userId)) {
    const user = await User.findOne({ userId });
    return user;
  } else {
    throw new Error('User not found');
  }
};

const updateSpecificUser = async (userId: number, userData: TUser) => {
  if (await User.isUserExist(userId)) {
    const updatedUserInfo = await User.updateOne(
      { userId },
      { $set: userData },
    );
    return updatedUserInfo;
  } else {
    throw new Error('User not found');
  }
};

const deleteSpecificUser = async (userId: number) => {
  if (await User.isUserExist(userId)) {
    const result = await User.deleteOne({ userId });
    return result;
  } else {
    throw new Error('User not found');
  }
};

export const UserServices = {
  createUserToDB,
  getAllUser,
  getSpecificUser,
  updateSpecificUser,
  deleteSpecificUser,
};

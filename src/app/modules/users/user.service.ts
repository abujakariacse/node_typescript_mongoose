import { User } from './user.interface';
import { UserModel } from './user.model';

// Create User
const createUserToDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

// Get Users
const getAllUser = async () => {
  const users = await UserModel.aggregate([
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
  const user = await UserModel.findOne({ userId });
  return user;
};

const updateSpecificUser = async (userId: number, userData: User) => {
  const updatedUserInfo = await UserModel.updateOne(
    { userId },
    { $set: userData },
  );
  return updatedUserInfo;
};

const deleteSpecificUser = async (userId: number) => {
  const result = await UserModel.deleteOne({ userId });
  return result;
};

export const UserServices = {
  createUserToDB,
  getAllUser,
  getSpecificUser,
  updateSpecificUser,
  deleteSpecificUser,
};

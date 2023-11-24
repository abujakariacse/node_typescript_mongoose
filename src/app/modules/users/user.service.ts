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

const getSpecificUser = async (userId: number) => {
  const user = await UserModel.findOne({ userId });
  return user;
};

export const UserServices = {
  createUserToDB,
  getAllUser,
  getSpecificUser,
};

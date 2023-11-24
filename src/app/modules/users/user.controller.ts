import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { User } from './user.interface';
import UserValidationSchema from './student.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const validatedData = UserValidationSchema.parse(user);

    const result = await UserServices.createUserToDB(validatedData);

    res.status(200).json({
      status: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong!',
      error: err,
    });
  }
};
const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUser();
    res.status(200).json({
      status: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: 'Users not found!',
      error: err,
    });
  }
};
const getAUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSpecificUser(Number(userId));
    res.status(200).json({
      status: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      status: false,
      message: 'Users not found!',
      error: err,
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    const validatedUserData = UserValidationSchema.parse(userData);

    const result = await UserServices.updateSpecificUser(
      Number(userId),
      validatedUserData as User,
    );
    res.status(200).json({
      status: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      status: false,
      message: 'Users not found!',
      error: err,
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.deleteSpecificUser(Number(userId));
    res.status(200).json({
      status: true,
      message: 'User deleted successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      status: false,
      message: 'Something went wrong!',
      error: err,
    });
  }
};

export const UserController = {
  createUser,
  getUsers,
  getAUser,
  updateUser,
  deleteUser,
};

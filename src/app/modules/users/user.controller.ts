import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { TUser } from './user.interface';
import UserValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const { error, value } = UserValidationSchema.validate(user);

    const result = await UserServices.createUserToDB(value);

    res.status(201).json({
      status: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message || 'Something went wrong',
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
      message: err.message || 'Something went wrong',
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
      message: err.message,
      error: {
        code: res.statusCode,
        description: 'User not found',
      },
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    const { error, value } = UserValidationSchema.validate(userData);

    const result = await UserServices.updateSpecificUser(
      Number(userId),
      value as TUser,
    );
    res.status(200).json({
      status: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      status: false,
      message: err.message || 'User not found',
      error: {
        code: res.statusCode,
        description: 'User not found',
      },
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
      data: null,
    });
  } catch (err: any) {
    res.status(404).json({
      status: false,
      message: err.message || 'User not found',
      error: {
        code: res.statusCode,
        description: 'User not found',
      },
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

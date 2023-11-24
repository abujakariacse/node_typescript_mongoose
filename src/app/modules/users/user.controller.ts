import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { User } from './user.interface';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await UserServices.createUserToDB(user);
    res.status(200).json({
      status: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
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
    const updateUserInfo = req.body;

    const result = await UserServices.updateSpecificUser(
      Number(userId),
      updateUserInfo as User,
    );
    res.status(200).json({
      status: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err) {
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
  } catch (err) {
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

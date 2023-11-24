import { Request, Response } from 'express';
import { UserServices } from './user.service';

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
    res.status(400).json({
      status: false,
      message: 'Users not found!',
      error: err,
    });
  }
};

export const UserController = {
  createUser,
  getUsers,
  getAUser,
};

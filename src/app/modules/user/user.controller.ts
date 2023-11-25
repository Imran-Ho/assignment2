import { Request, Response } from 'express';
import { userService } from './user.service';

const createNewUser = async (req: Request, res: Response) => {
  try {
    const { users: userData } = req.body;
    const output = await userService.makeUserDB(userData);

    res.status(200).json({
      success: true,
      message: 'user created successfully.',
      data: output,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

// get user
const getDBExistingUsers = async (req: Request, res: Response) => {
  try {
    const getExistingUser = await userService.getUsers();

    res.status(200).json({
      success: true,
      message: 'Existing users show successfully.',
      data: getExistingUser,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

export const userController = {
  createNewUser,
  getDBExistingUsers,
};

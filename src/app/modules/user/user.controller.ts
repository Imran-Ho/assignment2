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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};
// find single user
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const getSingleUser = await userService.findSingleUser(userId);

    res.status(200).json({
      success: true,
      message: 'user is found successfully.',
      data: getSingleUser,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: err,
    });
  }
};

export const userController = {
  createNewUser,
  getDBExistingUsers,
  getSingleUser,
};

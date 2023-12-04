import { Request, Response } from 'express';
import { userService } from './user.service';

import { User } from '../user.model';

import {
  updateInfoValidation,
  userValidationSchema,
} from './user.joivalidation';

const createNewUser = async (req: Request, res: Response) => {
  try {
    const { error } = userValidationSchema.validate(req.body);
    const output = await userService.makeUserDB(req.body);
    // const { username, fullName, age, email, address } = output;
    if (error) {
      res.status(400).json({
        success: false,
        message: 'you may be wrong something.',
        error: error.details,
      });
    }

    res.status(200).json({
      success: true,
      message: 'user created successfully.',
      data: output,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

// get existing user
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
    const userId = Number(req.params.userId);
    if (await User.isUserExists(userId)) {
      const getSingleUser = await userService.findSingleUser(userId);
      res.status(200).json({
        success: true,
        message: 'user is found successfully.',
        data: getSingleUser,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'User not found',
      error: err,
    });
  }
};
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    if (await User.isUserExists(userId)) {
      await userService.deleteSingleUser(userId);

      res.status(200).json({
        success: true,
        message: 'user is deleted successfully.',
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'User not found',
      error: err,
    });
  }
};

const updatedUserInfo = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const updateInfo = req.body;

    if (await User.isUserExists(userId)) {
      const validateData = updateInfoValidation.validate(updateInfo);

      const result = await userService.updatedUserInfo(
        userId,
        validateData.value,
      );
      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'User not found',
      error: err,
    });
  }
};
//Add New product to order list of a user
const NewProductAddedToOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const orderInfo = req.body;
    if (await User.isUserExists(userId)) {
      await userService.NewPrdouctAddedToOrderDB(userId, orderInfo);
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        (error as Error).message || 'Failed to add new product to orders !',
      error: error,
    });
  }
};

//Retrieve orders list of users
const GetOrdersOfAUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    if (await User.isUserExists(userId)) {
      const result = await userService.GetUsersOrderFromDB(userId);
      res.status(200).json({
        success: true,
        message: 'Order loaded successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        (error as Error).message ||
        'Failed to get all orders of a specific user  !',
      error: error,
    });
  }
};

//Total Price Calculation of Orders of a User
const CalculateTotalPriceOfOrders = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    if (await User.isUserExists(userId)) {
      const result =
        await userService.CalculateTotalPriceOfOrderOfASpecificUserToDB(userId);
      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message || 'Failed to calclulate total price !',
      error: error,
    });
  }
};

export const userController = {
  createNewUser,
  getDBExistingUsers,
  getSingleUser,
  deleteSingleUser,
  updatedUserInfo,
  NewProductAddedToOrder,
  GetOrdersOfAUser,
  CalculateTotalPriceOfOrders,
};

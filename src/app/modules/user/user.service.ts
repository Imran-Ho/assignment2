import { User } from '../user.model';
import { TUser, TUserOrder } from './user.interface';

const makeUserDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('user is existing in database');
  }
  await User.create(userData); // built in static method.
  const userResult = await User.findOne({ userId: userData.userId }).select([
    '-password',
    '-_id',
    '-orders',
  ]);

  return userResult;
};

// get users
const getUsers = async () => {
  const getDBUsers = await User.find().select([
    'userId',
    'username',
    'fullName',
    'age',
    'email',
    'address',
  ]);
  return getDBUsers;
};
const findSingleUser = async (userId: number) => {
  // const singleUser = await User.findOne({ userId });
  const singleUser = await User.aggregate([
    { $match: { userId: userId } },
    {
      $project: {
        userId: 1,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    },
  ]);
  return singleUser;
};
const deleteSingleUser = async (userId: number) => {
  const deletedUser = await User.deleteOne({ userId: userId });
  return deletedUser;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatedUserInfo = async (userId: number, updatedInfo: any) => {
  const result = await User.findOneAndUpdate(
    { userId: userId },
    { $set: updatedInfo },
    {
      new: true,
      runValidators: true,
    },
  ).select(['-password']);
  return result;
};

//Add new product to order
const NewPrdouctAddedToOrderDB = async (
  userId: number,
  orderInfo: TUserOrder,
) => {
  const result = await User.findOneAndUpdate(
    { userId: userId },
    {
      $push: {
        orders: orderInfo,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const userService = {
  makeUserDB,
  getUsers,
  findSingleUser,
  deleteSingleUser,
  updatedUserInfo,
  NewPrdouctAddedToOrderDB,
};

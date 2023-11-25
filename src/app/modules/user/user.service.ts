import { UserModel } from '../user.model';
import { TUser } from './user.interface';

const makeUserDB = async (user: TUser) => {
  const userResult = await UserModel.create(user);
  return userResult;
};

// get users
const getUsers = async () => {
  const getDBUsers = await UserModel.find();
  return getDBUsers;
};
const findSingleUser = async (userId: string) => {
  const singleUser = await UserModel.findOne({ userId });
  return singleUser;
};

export const userService = {
  makeUserDB,
  getUsers,
  findSingleUser,
};

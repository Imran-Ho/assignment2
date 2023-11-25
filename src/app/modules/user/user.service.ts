import { User } from '../user.model';
import { TUser } from './user.interface';

const makeUserDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('user is existing in database');
  }
  const userResult = await User.create(userData); // built in static method

  return userResult;
};

// get users
const getUsers = async () => {
  const getDBUsers = await User.find();
  return getDBUsers;
};
const findSingleUser = async (userId: string) => {
  const singleUser = await User.findOne({ userId });
  return singleUser;
};

export const userService = {
  makeUserDB,
  getUsers,
  findSingleUser,
};

import { Model } from 'mongoose';

export type TFullName = {
  firstName: string;
  lastName: string;
};
export type TAddress = {
  street: string;
  city: string;
  country: string;
};
export type TUserOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies?: string[];
  address: TAddress;
  orders?: TUserOrder[];
  isDeleted: boolean;
};

// for using static method
export interface UserModel extends Model<TUser> {
  isUserExists(userId: number): Promise<TUser | null>;
}

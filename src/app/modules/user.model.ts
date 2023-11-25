import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TUser,
  UserMethods,
  UserModel,
} from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, 'first name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'last name is required'],
    trim: true,
  },
});
const addressSchema = new Schema<TAddress>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, required: true, unique: true, trim: true },
  username: {
    type: String,
    required: [true, 'User name is required.'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    maxlength: [20, 'password should be not more than 20'],
  },
  fullName: { type: fullNameSchema },
  age: { type: Number },
  email: {
    type: String,
  },
  isActive: { type: Boolean },
  hobbies: {
    type: String,
    enum: ['fishing', 'traveling'],
  },
  address: { type: addressSchema },
});
// middleware/hooks
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
userSchema.post('save', function () {});

// static method
userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);

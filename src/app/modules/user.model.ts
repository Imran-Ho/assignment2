import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TUser } from './user/user.interface';

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

const userSchema = new Schema<TUser>({
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

export const UserModel = model<TUser>('User', userSchema);

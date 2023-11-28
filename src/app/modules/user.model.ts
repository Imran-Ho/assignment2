import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TUser,
  TUserOrder,
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

const UserOrdersSchema = new Schema<TUserOrder>(
  {
    productName: {
      type: String,
      trim: true,
      required: [true, 'ProductName is require'],
    },
    price: {
      type: Number,
      trim: true,
      required: [true, 'Price is require'],
    },
    quantity: {
      type: Number,
      trim: true,
      required: [true, 'Quantity is require'],
    },
  },
  { _id: false },
);

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
    type: [String],
    trim: true,
    required: [true, 'hobbies is required'],
  },
  address: { type: addressSchema },
  orders: [UserOrdersSchema],
});
// middleware/hooks
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
userSchema.post('save', function (data, next) {
  data.password = '';
  next();
});

userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// for static method
userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);

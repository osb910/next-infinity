import {Schema} from 'mongoose';
import validator from 'validator';
const {isEmail} = validator;
import {IUser, UserModel} from './user.types';

const userSchema = new Schema<IUser, UserModel>(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [isEmail, 'Invalid Email Address'],
      required: [true, 'Please provide an email address'],
    },
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Store',
      },
    ],
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
    timestamps: true,
  }
);

export default userSchema;

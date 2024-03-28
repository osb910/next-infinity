import {Schema} from 'mongoose';
import {IUser, IUserMethods, UserModel} from './user.types';

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    avatar: String,
    preferredLocale: String,
    location: {
      address: String,
      ip: String,
      country: String,
      countryCode: String,
      region: String,
      city: String,
      longitude: Number,
      latitude: Number,
      zipCode: String,
      timeZone: String,
    },
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
    timestamps: true,
  }
);

export default userSchema;

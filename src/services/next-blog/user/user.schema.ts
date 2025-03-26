import {Schema} from 'mongoose';
import type {IUser, IUserMethods, UserModel} from './user.types';

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
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
    resetPasswordCode: String,
    resetPasswordExpires: Date,
    avatar: {
      key: String,
      ogName: String,
      title: String,
      ogTitle: String,
      ext: String,
      mimeType: String,
      size: Number,
      readableSize: String,
      caption: String,
    },
    preferredLocale: String,
    gender: {
      type: String,
      enum: ['M', 'F'],
      default: 'M',
    },
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

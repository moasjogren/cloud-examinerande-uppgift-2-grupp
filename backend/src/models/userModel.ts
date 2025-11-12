import mongoose, { Schema, InferSchemaType, Types } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    friends:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    friendRequests:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    password: { type: String, required: true },
  },
  { timestamps: true, collection: "users" }
);

export type UserType = InferSchemaType<typeof userSchema> & {
  _id: Types.ObjectId;
};
export const User = mongoose.model("User", userSchema);

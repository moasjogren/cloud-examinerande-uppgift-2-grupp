import mongoose, { Schema, InferSchemaType, Types } from "mongoose";

const entrySchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    userId: { type: Types.ObjectId, required: true },
  },
  { timestamps: true, collection: "entries" }
);

export type EntryType = InferSchemaType<typeof entrySchema>;
export const Entry = mongoose.model("Entry", entrySchema);

import mongoose, { Schema, InferSchemaType, Types } from "mongoose";

const entrySchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    userId: { type: Types.ObjectId, required: true },
    embedding: {
      type: [Number],
      required: false,
      select: false,
    },
  },
  { timestamps: true, collection: "entries" }
);

export type EntryType = InferSchemaType<typeof entrySchema> & {
  _id: Types.ObjectId;
  emmbedding: number[];
};
export const Entry = mongoose.model("Entry", entrySchema);

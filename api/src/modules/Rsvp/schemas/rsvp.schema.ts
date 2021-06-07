import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const RsvpSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    phoneNo: { type: String },
    status: { type: String, default: "backlog" },
    address: {
      properties: {
        country: { type: String },
      },
    },
    sentAt: { type: Date },
  },
  {
    collection: "Rsvps",
    timestamps: true,
  }
);

RsvpSchema.plugin(mongoosePaginate);

import { Document, PaginateModel } from "mongoose";
import { ObjectId } from "mongodb";

export interface Rsvp extends Document {
  _id: ObjectId;
  name: string;
  email: string;
  phoneNo: string;
  status: string;
  address: {
    properties: {
      country: string;
    };
  };
  sentAt: Date;
}

export type RsvpModel = PaginateModel<Rsvp>;

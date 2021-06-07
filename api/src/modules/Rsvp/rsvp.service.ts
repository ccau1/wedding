import { Injectable, Scope } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { RsvpModel, Rsvp } from "./interfaces/rsvp";
import { RsvpSearchModel } from "./models/rsvp.search.model";
import mongoose from "mongoose";

@Injectable()
@Injectable({ scope: Scope.REQUEST })
export class RsvpService {
  constructor(
    @InjectModel("Rsvps") private readonly rsvpRepository: RsvpModel
  ) {}

  protected async castQuery(query: RsvpSearchModel) {
    // initiate query's $and array
    const queryAnd = [];

    if (query.q) {
    }

    // return object optionally with $and field
    return queryAnd.length ? { $and: queryAnd } : {};
  }

  public async find(query: RsvpSearchModel): Promise<Rsvp[]> {
    const q = await this.castQuery(query);
    return this.rsvpRepository.find(q);
  }

  public async findOne(query: RsvpSearchModel): Promise<Rsvp> {
    const q = await this.castQuery(query);
    return this.rsvpRepository.findOne(q);
  }
}

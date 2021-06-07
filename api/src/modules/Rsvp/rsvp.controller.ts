import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RsvpService } from './rsvp.service';
import { Rsvp } from './interfaces/rsvp';
import { AuthGuard } from '../Auth/user.auth.guard';
import { CurrentUser } from '../../core/decorators/currentUser.decorator';

@Controller('users')
export class RsvpController {
  constructor(private readonly userService: RsvpService) {}

  @Get('/me')
  @UseGuards(AuthGuard())
  public async getCurrentRsvp(
    @Request() req,
    @CurrentUser() currentUser,
  ): Promise<Rsvp> {
    return currentUser;
  }
}

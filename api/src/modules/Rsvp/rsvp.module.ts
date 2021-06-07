import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {RsvpSchema} from './schemas/rsvp.schema';
import {RsvpController} from './rsvp.controller';
import {RsvpService} from './rsvp.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Rsvps', schema: RsvpSchema}])
  ],
  controllers: [RsvpController],
  providers: [RsvpService],
  exports: [RsvpService]
})
export class RsvpModule {}

import { Args, Ctx, MutationResponse } from '../../types';
import { Event } from '../../entity/Event';
import { Location } from '../../entity/Location';
import { User } from '../../entity/User';

interface CreateEventInput {
  title: string;
  description: string;
  maxPeopleCount: number;
  leaveDate: Date;
  returnDate: Date;
  meetingPlaceID: number;
  destinyID: number;
  membersIDs: [number];
}

export const EventMutations = {
  async createEvent(
    _root: {},
    args: Args<CreateEventInput>,
    ctx: Ctx
  ): Promise<MutationResponse<Event>> {
    const { input } = args;
    const { manager, user, formatResponse } = ctx;

    if (!user) {
      return formatResponse(false, 'User not logged-in!');
    }

    let event = new Event();
    event.title = input.title;
    event.description = input.description;
    event.maxPeopleCount = input.maxPeopleCount;
    event.leaveDate = input.leaveDate;
    event.returnDate = input.returnDate;
    event.members = [];

    if (input.membersIDs) {
      event.members = await manager.findByIds(User, input.membersIDs);
    }

    try {
      event.meetingPlace = await manager.findOneOrFail(Location, { id: input.meetingPlaceID });
    } catch (e) {
      return formatResponse(
        false,
        `Could not find Location with (meetingPlaceID: ${input.meetingPlaceID})`
      );
    }

    try {
      event.destiny = await manager.findOneOrFail(Location, { id: input.destinyID });
    } catch (e) {
      return formatResponse(false, `Could not find Location with (destinyID: ${input.destinyID})`);
    }

    try {
      event.user = await manager.findOneOrFail(User, { id: user.id });
    } catch (e) {
      return formatResponse(false, `Could not find User with (userID: ${user.id})`);
    }

    try {
      await manager.save(event);
    } catch (e) {
      return formatResponse(false, 'Could not save Event!');
    }

    return formatResponse(true, 'Event successfully created!', event);
  },
};

import { Ctx } from '../../types';
import { Event } from '../../entity/Event';

export const EventQueries = {
  async events(_root: {}, _args: {}, ctx: Ctx): Promise<Event[] | undefined> {
    const { manager, user } = ctx;

    if (!user) return;

    return await manager.find(Event, { relations: ['members', 'user'] });
  },
};

import { User } from '../../entity/User';
import { Event } from '../../entity/Event';
import { Ctx } from '../../types';

export const UserFields = {
  User: {
    async events(user: User, _args: {}, { manager }: Ctx): Promise<Event[]> {
      return await manager.getRepository(Event).find({ relations: ['user'] });
    },
  },
};

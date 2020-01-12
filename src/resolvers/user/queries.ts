import { User } from '../../entity/User';

import { Ctx } from '../../types';

export const UserQueries = {
  async me(_root: {}, _args: {}, ctx: Ctx): Promise<User | null> {
    const { manager, user } = ctx;
    let me: User;

    if (!user) return null;

    const userData = { id: user.id, email: user.email };
    const userRelations = { relations: ['events'] };

    try {
      me = await manager.findOneOrFail(User, userData, userRelations);
    } catch (e) {
      return null;
    }

    return me;
  },
};

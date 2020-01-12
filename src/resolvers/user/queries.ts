import { User } from '../../entity/User';

import { Ctx } from '../../types';

export const UserQueries = {
  async me(_root: {}, _args: {}, ctx: Ctx): Promise<User | null> {
    const { manager, user } = ctx;
    let me: User;

    if (!user) return null;

    try {
      me = await manager.findOneOrFail(User, { id: user.id, email: user.email });
    } catch (e) {
      return null;
    }

    return me;
  },
};

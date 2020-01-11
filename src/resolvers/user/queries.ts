import { User } from '../../entity/User';

import { Ctx, GqlUser } from '../../types';

export const UserQueries = {
  async me(_root: {}, _args: {}, ctx: Ctx): Promise<GqlUser | null> {
    const { manager, user } = ctx;
    let me: GqlUser;

    if (!user) return null;

    try {
      me = await manager.findOneOrFail(User, { id: user.id, email: user.email });
    } catch (e) {
      return null;
    }

    return me;
  },
};

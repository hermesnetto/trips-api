import { GqlLocation, Ctx } from '../../types';
import { Location } from '../../entity/Location';

interface LocationInput {
  id: number;
}

export const LocationQueries = {
  async location(_root: {}, args: LocationInput, ctx: Ctx): Promise<GqlLocation | undefined> {
    const { manager, user } = ctx;

    if (!user) return;

    const location = await manager.findOne(Location, { id: args.id });
    return location;
  },
};

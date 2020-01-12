import { Args, Ctx, MutationResponse } from '../../types';
import { Location } from '../../entity/Location';

interface CreateLocationInput {
  zipcode: string;
  street: string;
  number: number;
  city: string;
  state: string;
  country: string;
  district: string;
}

export const LocationMutations = {
  async createLocation(
    _root: {},
    args: Args<CreateLocationInput>,
    ctx: Ctx
  ): Promise<MutationResponse<Location>> {
    const { input } = args;
    const { manager, user, formatResponse } = ctx;

    if (!user) {
      return formatResponse(false, 'User not logged-in!');
    }

    const loc = new Location();
    loc.zipcode = input.zipcode;
    loc.street = input.street;
    loc.number = input.number;
    loc.city = input.city;
    loc.state = input.state;
    loc.country = input.country;
    loc.district = input.district;

    try {
      await manager.insert(Location, loc);
    } catch (e) {
      return formatResponse(false, 'Could not save location, please, try again later!');
    }

    return formatResponse(true, 'Location successfully created!', loc);
  },
};

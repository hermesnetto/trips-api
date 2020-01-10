import { Args, Ctx, GqlUser } from '../../types';
import { User } from '../../entity/User';

export interface CreateUserInput {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

export const UserMutations = {
  async createUser(_root: {}, args: Args<CreateUserInput>, ctx: Ctx): Promise<GqlUser> {
    const { input } = args;
    const { manager } = ctx;

    const user = new User();
    user.email = input.email;
    user.password = input.password;
    user.firstName = input.firstName;

    if (input.lastName) {
      user.lastName = input.lastName;
    }

    return await manager.save(user);
  }
};

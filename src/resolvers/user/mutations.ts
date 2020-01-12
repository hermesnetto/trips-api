import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { Args, Ctx, GqlToken, MutationResponse } from '../../types';
import { User } from '../../entity/User';

interface SignUpInput {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export const UserMutations = {
  async signUp(_root: {}, args: Args<SignUpInput>, ctx: Ctx): Promise<MutationResponse<User>> {
    const { input } = args;
    const { manager, formatResponse } = ctx;

    const user = new User();
    user.email = input.email;
    user.password = input.password;
    user.firstName = input.firstName;

    if (input.lastName) {
      user.lastName = input.lastName;
    }

    try {
      await manager.insert(User, user);
    } catch (e) {
      return formatResponse(false, 'Email already registered!');
    }

    return formatResponse(true, 'User successfully logged-in!', user);
  },

  async login(_root: {}, args: Args<LoginInput>, ctx: Ctx): Promise<MutationResponse<GqlToken>> {
    const {
      input: { email, password },
    } = args;
    const { manager, formatResponse } = ctx;

    let user: User;
    const failMessage = 'Could not login, check your email and password!';

    try {
      user = await manager.findOneOrFail(User, { email });
    } catch (e) {
      return formatResponse(false, failMessage);
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return formatResponse(false, failMessage);
    }

    const token = jwt.sign({ email: user.email, id: user.id }, '@TripsPassword!!');

    return formatResponse(true, 'User successfully logged-in!', { token });
  },
};

import { MutationResponse } from './types';

export const formatResponse = <T>(
  success: boolean,
  message: string,
  data?: T
): MutationResponse<T> => {
  return { success, message, data };
};

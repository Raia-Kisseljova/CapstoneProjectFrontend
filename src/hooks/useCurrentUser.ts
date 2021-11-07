import decode from 'jwt-decode';

import { useQuery } from 'react-query';

import { axios } from 'api';
import { TTokenPayload, TUser } from 'types';

export default function useCurrentUser() {
  const { data: user, ...rest } = useQuery('CURRENT_USER', () => isAuthenticated(), {
    staleTime: 1000 * 60 * 2.5,
    retry: false,
  });
  return { user, ...rest };
}

async function isAuthenticated(): Promise<TUser | null> {
  const accessToken = window.localStorage.getItem('accessToken');

  if (accessToken === null) {
    return null;
  }

  const { nickname } = decode(accessToken) as TTokenPayload;
  const res = await axios.get(`user/by_name/${nickname}`);

  return res.data;
}

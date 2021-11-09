import decode from 'jwt-decode';

import { useQuery } from 'react-query';

import { axios } from 'api';
import { Role, TOrganisation, TTokenPayload, TUser } from 'types';

export default function useCurrentUser() {
  const { data: user, ...rest } = useQuery('CURRENT_USER', () => isAuthenticated(), {
    staleTime: 1000 * 60 * 2.5,
    retry: false,
  });
  return { user, ...rest };
}

async function isAuthenticated(): Promise<TUser | TOrganisation | null> {
  const accessToken = window.localStorage.getItem('accessToken');

  if (accessToken === null) {
    return null;
  }

  const { nickname, role } = decode(accessToken) as TTokenPayload;

  let res;

  if (role === Role.USER) {
    res = await axios.get(`user/by_name/${nickname}`);
  } else {
    res = await axios.get(`organisation/${nickname}`);
  }

  return res.data;
}

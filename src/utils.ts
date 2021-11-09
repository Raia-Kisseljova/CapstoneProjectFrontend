import { Role, TOrganisation, TUser } from 'types';

export function getProfilePath(user: TUser | TOrganisation): string {
  return user.role === Role.USER
    ? `/users/${user.nickname}`
    : `/organisation/${user.name}`;
}

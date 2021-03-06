import {User} from './user';

export class JwtResponse {
  accessToken: string;
  type: string;
  username: string;
  authorities: string[];
  user: User;
}

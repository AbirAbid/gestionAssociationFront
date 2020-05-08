import {User} from '../../membre_auth/models/user';
import {Bien} from './Bien';

export class UserBien {
  user: User;
  bien: Bien;
  qteDonnee: number;
  dateParticipation: Date;

}

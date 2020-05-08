import {User} from '../../membre_auth/models/user';
import {Mission} from './Mission';

export class UserMission {
  user: User;
  mission: Mission;

  demandeDate: Date;
  affected: number;
  enAttente: number;


}

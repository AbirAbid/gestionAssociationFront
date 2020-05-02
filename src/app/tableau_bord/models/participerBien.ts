import {Bien} from '../../interaction_event/models/Bien';
import {User} from '../../membre_auth/models/user';

export class ParticiperBien {
  idP: number;
  qteDonnee: number;
  bien: Bien;
  user: User;
  dateParticipation: Date;
}

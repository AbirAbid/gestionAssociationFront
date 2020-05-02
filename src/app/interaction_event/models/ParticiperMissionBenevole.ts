import {User} from '../../membre_auth/models/user';

export class ParticiperMissionBenevole {
  idPm: number;
  missionBenevole
  user: User;
  dateDemande: Date;
  enAttente: number;

}

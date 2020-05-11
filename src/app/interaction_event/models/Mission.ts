import {Evenement} from './Evenement';
import {UserMission} from './UserMission';

export class Mission {
  id: number;

  titre: string;

  description: string;

  evenement: Evenement;

  userMissions: Array<UserMission> = [];
  enAtte: number;

}

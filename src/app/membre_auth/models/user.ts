import {UserBien} from "../../interaction_event/models/UserBien";
import {UserMission} from "../../interaction_event/models/UserMission";

export class User {
  id: number;
  nom: string;
  username: string;
  role: Array<string> = [];
  password: string;
  prenom: string;
  telephone: string;
  genre: string;
  dateNaissance: Date;
  gouvernoratRes: string;
  occupation: string;
  isAdmin: number;
  userBiens: Array<UserBien>[];
  userMissions: Array<UserMission>[];

  tauxEchange: number;
}

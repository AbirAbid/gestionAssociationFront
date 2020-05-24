import {UserMission} from "../../interaction_event/models/UserMission";

export class User {
  nom: string;
  username: string;
  email: string;
  role: Array<string> = [];
  password: string;
  prenom: string;
  telephone: string;
  genre: string;
  dateNaissance: Date;
  gouvernoratRes: string;
  occupation: string;
  isAdmin: number;

}

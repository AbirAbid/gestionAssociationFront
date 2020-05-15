import {Component, OnInit} from '@angular/core';
import {TabBordService} from "../services/tab-bord.service";
import {UserService} from "../../membre_auth/services/user.service";
import {UserMission} from "../../interaction_event/models/UserMission";

@Component({
  selector: 'app-activ-benevole',
  templateUrl: './activ-benevole.component.html',
  styleUrls: ['./activ-benevole.component.scss']
})
export class ActivBenevoleComponent implements OnInit {
  listMissionUser: UserMission[] = [];
  username: string;
  long: number;
  totalbien: number;
  page = 1;

  constructor(private tabBordService: TabBordService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.getMesParticipations();

    console.log('  this.listMissionUser ', this.listMissionUser);
  }

  getMesParticipations() {

    this.username = this.userService.getProfileCurrentUser().username;
    this.tabBordService.getAllParticiperMissionByUser(this.username).subscribe(listMission => {
      this.listMissionUser = listMission;
      this.totalbien =  this.listMissionUser.length;

      this.long = listMission.length;
      console.log(' this.listMissionUser ', this.listMissionUser);
    }, error => console.log(error));
  }

}

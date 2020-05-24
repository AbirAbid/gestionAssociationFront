import {Component, OnInit} from '@angular/core';
import {TabBordService} from "../services/tab-bord.service";
import {UserService} from "../../membre_auth/services/user.service";
import {UserMission} from "../../interaction_event/models/UserMission";
import {Mission} from "../../interaction_event/models/Mission";
import {MissionBenevoleService} from "../../interaction_event/services/mission-benevole-service/mission-benevole.service";
import {Router} from "@angular/router";

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

  constructor(private router: Router, private tabBordService: TabBordService, private userService: UserService, private  missionBenevoleService: MissionBenevoleService) {
  }

  ngOnInit(): void {
    this.getMesParticipations();

    console.log('  this.listMissionUser ', this.listMissionUser);
  }

  getMesParticipations() {

    this.username = this.userService.getProfileCurrentUser().username;
    this.getAllparticipation();

  }

  libererMission(m: Mission) {
    const username = this.userService.getProfileCurrentUser().username;
    console.log(m);
    this.missionBenevoleService.annulerDemande(m.id, username).subscribe(data => {
      console.log('liberer');
      this.getAllparticipation();
    })
    ;
  }

  eventDetail(id: number) {
    this.router.navigate(['eventDetail', id]);

  }

  getAllparticipation() {
    this.tabBordService.getAllParticiperMissionByUser(this.username).subscribe(listMission => {
      this.listMissionUser = listMission;
      this.totalbien = this.listMissionUser.length;

      this.long = listMission.length;
      console.log(' this.listMissionUser ', this.listMissionUser);
    }, error => console.log(error));
  }
}

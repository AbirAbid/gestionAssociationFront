import {Component, OnInit} from '@angular/core';
import {TabBordService} from '../services/tab-bord.service';
import {UserService} from '../../membre_auth/services/user.service';
import {UserBien} from '../../interaction_event/models/UserBien';

@Component({
  selector: 'app-dons-biens',
  templateUrl: './dons-biens.component.html',
  styleUrls: ['./dons-biens.component.scss']
})
export class DonsBiensComponent implements OnInit {
  listBienUser: UserBien[] = [];
  username: string;
  long: number;
  totalbien: number;
  page = 1;

  constructor(private tabBordService: TabBordService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.getMesParticipations();

    console.log(' this.listParticiperBien ', this.listBienUser);
  }

  getMesParticipations() {

    this.username = this.userService.getProfileCurrentUser().username;
    this.tabBordService.getAllParticiperBienByUser(this.username).subscribe(listBien => {
      this.listBienUser = listBien;
      this.totalbien = this.listBienUser.length;

      this.long = listBien.length;
      console.log(' this.listParticiperBien ', this.listBienUser);
    }, error => console.log(error));
  }
}

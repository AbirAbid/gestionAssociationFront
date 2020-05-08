import {Component, OnInit} from '@angular/core';
import {TabBordService} from '../services/tab-bord.service';
import {UserService} from '../../membre_auth/services/user.service';
import {ParticiperBien} from '../models/participerBien';
import {Bien} from "../../interaction_event/models/Bien";

@Component({
  selector: 'app-dons-biens',
  templateUrl: './dons-biens.component.html',
  styleUrls: ['./dons-biens.component.scss']
})
export class DonsBiensComponent implements OnInit {
  listBien: Bien[] = [];
  username: string;
  long: number;
  totalbien: number;
  page = 1;
  constructor(private tabBordService: TabBordService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.getMesParticipations();

    console.log(' this.listParticiperBien ', this.listBien);
  }

  getMesParticipations() {

    this.username = this.userService.getProfileCurrentUser().username;
    this.tabBordService.getAllParticiperBienByUser(this.username).subscribe(listBien => {
      this.listBien = listBien;
      this.totalbien = this.listBien.length;

      this.long = listBien.length;
      console.log(' this.listParticiperBien ', this.listBien);
    }, error => console.log(error));
  }
}

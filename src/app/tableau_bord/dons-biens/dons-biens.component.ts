import {Component, OnInit} from '@angular/core';
import {TabBordService} from '../services/tab-bord.service';
import {UserService} from '../../membre_auth/services/user.service';
import {ParticiperBien} from '../models/participerBien';

@Component({
  selector: 'app-dons-biens',
  templateUrl: './dons-biens.component.html',
  styleUrls: ['./dons-biens.component.scss']
})
export class DonsBiensComponent implements OnInit {
  listParticiperBien: ParticiperBien[] = [];
  username: string;
  long: number;

  constructor(private tabBordService: TabBordService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.getMesParticipations();

    console.log(' this.listParticiperBien ', this.listParticiperBien);
  }

  getMesParticipations() {

    this.username = this.userService.getProfileCurrentUser().username;
    this.tabBordService.getAllParticiperBienByUser(this.username).subscribe(listParticiperBien => {
      this.listParticiperBien = listParticiperBien;
      this.long = listParticiperBien.length;
      console.log(' this.listParticiperBien ', this.listParticiperBien);
    }, error => console.log(error));
  }
}

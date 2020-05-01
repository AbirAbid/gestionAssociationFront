import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../services/event-service/event.service';
import {Evenement} from '../models/Evenement';
import {Bien} from '../models/Bien';
import {MissionBenevole} from '../models/MissionBenevole';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../membre_auth/services/user.service';
import {BiensService} from '../services/bien-service/biens.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  id: number;
  event: Evenement = new Evenement();
  biens: Bien[] = [];
  missions: MissionBenevole[] = [];
  participerBienForm: any;
  participerBien: any;
  myForm: FormGroup;
  greater = false;

  constructor(private route: ActivatedRoute, private router: Router, private eventService: EventService, private fb: FormBuilder, private userService: UserService, private biensService: BiensService, private toastr: ToastrService) {
    const formContrls = {
      // all validators to input firstname
      qtedonnee: new FormControl()
    };
    // relie formGrp + formControl
    this.myForm = this.fb.group(formContrls);
  }

  get qtedonnee() {
    return this.myForm.get('qtedonnee');
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params.id;

    this.eventService.getEventById(this.id)
      .subscribe(data => {
        console.log(data);
        this.event = data;
      }, error => console.log(error));


    this.getAllBien();

    this.getAllMission();
  }

  getAllMission() {
    this.eventService.getAllMissionByEvent(this.id).subscribe(data => {
      this.missions = data;
    }, error => console.log(error));
  }

  getAllBien() {
    this.eventService.getAllBienByEvent(this.id).subscribe(data => {
      this.biens = data;
    }, error => console.log(error));
  }

  addParticipation(b: Bien) {
    if (b.qte < this.qtedonnee.value + b.totaleqteDonnee) {
      this.greater = true;
    } else {
      this.greater = false;

      this.participerBienForm = {};
      const username = this.userService.getProfileCurrentUser().username;
      this.participerBienForm.qteDon = this.qtedonnee.value;
      this.participerBienForm.bien = b;

      console.log(' this.participerBienForm', this.participerBienForm);

      this.biensService.donnerBien(this.participerBienForm, username).subscribe(data => {
        console.log('data', data);
      }, error => console.log(error));
      this.toastr.success('Merci de votre aide');
    }
  }
}




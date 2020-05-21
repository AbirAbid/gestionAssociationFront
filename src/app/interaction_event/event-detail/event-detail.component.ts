import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../services/event-service/event.service';
import {Evenement} from '../models/Evenement';
import {Bien} from '../models/Bien';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../membre_auth/services/user.service';
import {BiensService} from '../services/bien-service/biens.service';
import {ToastrService} from 'ngx-toastr';
import {MissionBenevoleService} from '../services/mission-benevole-service/mission-benevole.service';
import {Mission} from '../models/Mission';
import {User} from '../../membre_auth/models/user';
import {MissionUserDisplay} from '../models/MissionUserDisplay';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  totalbien: number;
  page = 1;
  totalmission: number;
  pagem = 1;
  id: number;
  event: Evenement = new Evenement();
  biens: Bien[] = [];
  missions: MissionUserDisplay[] = [];
  participerBienForm: any;
  myForm: FormGroup;
  greater = false;
  today = new Date();
  participerMissionForm: any;
  username: string;
  user: User;


  constructor(private route: ActivatedRoute, private router: Router, private eventService: EventService, private fb: FormBuilder,
              private  missionBenevoleService: MissionBenevoleService, public userService: UserService, private biensService: BiensService,
              private toastr: ToastrService) {

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
    this.username = this.userService.getProfileCurrentUser().username;
    this.userService.getUserByUsername(this.username).subscribe((data) => {
      this.user = data;

    });

    console.log('this.user in eventDetail', this.user);
    this.eventService.getEventById(this.id)
      .subscribe(data => {
        this.event = data;
      }, error => console.log(error));

    this.getAllBien();

    this.getAllMission();


  }


  getAllMission() {

    this.missionBenevoleService.getMissionPart(this.username, this.id).subscribe(data => {
      console.log('data', data);
      this.missions = data;
    }, error => console.log(error));
  }

  getAllBien() {
    this.eventService.getAllBienByEvent(this.id).subscribe(data => {
      this.biens = data;
      console.log('this.biens ' + this.biens);
      this.totalbien = this.biens.length;
    }, error => console.log(error));
  }

  addParticipationBien(b: Bien) {
    console.log(' b', b);

    if (b.qte < this.qtedonnee.value + b.totaleqteDonnee) {
      this.greater = true;
    } else {
      console.log(' b else', b);

      this.greater = false;
      this.participerBienForm = {};
      const username = this.userService.getProfileCurrentUser().username;
      this.participerBienForm.qteDonnee = this.qtedonnee.value;
      this.participerBienForm.bien = b;
      this.participerBienForm.dateParticipation = this.today;
      console.log(' this.participerBienForm', this.participerBienForm);

      this.biensService.donnerBien(this.participerBienForm, username).subscribe(data => {
        console.log('data', data);
        // this.getAllBien();

      }, error => console.log(error));
      this.toastr.success('Merci de votre aide');


    }
  }

  addParticipationMission(m: Mission) {
    this.participerMissionForm = {};
    const username = this.userService.getProfileCurrentUser().username;
    this.participerMissionForm.mission = m;
    console.log('addParticipationMission m', m);
    this.participerMissionForm.demandeDate = this.today;
    this.missionBenevoleService.demandeMission(this.participerMissionForm, username).subscribe(data => {
      console.log(data);
      // this.missions = this.displayListMission();
      this.getAllMission();
      this.toastr.success('Merci de votre participation');

    }, error => {
      console.log(error);
    });

  }

  libererMission(m: Mission) {
    const username = this.userService.getProfileCurrentUser().username;
    this.missionBenevoleService.annulerDemande(m.id, username).subscribe(data => {
      console.log('liberer');
      this.getAllMission();
    })

    ;
  }
}




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
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {AuthLoginInfo} from '../../membre_auth/models/login-info';


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
  dateJour = new Date();
  id: number;
  event: Evenement = new Evenement();
  biens: Bien[] = [];
  missionsAuth: MissionUserDisplay[] = [];
  missionsNotAuth: Mission[] = [];
  participerBienForm: any;
  myForm: FormGroup;
  greater = false;
  today = new Date();
  participerMissionForm: any;
  username: string;
  user: User;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string;
  loginInfo: AuthLoginInfo;

  constructor(private route: ActivatedRoute, private router: Router, private eventService: EventService, private fb: FormBuilder,
              private  missionBenevoleService: MissionBenevoleService, public userService: UserService, private biensService: BiensService,
              private toastr: ToastrService, private modalService: NgbModal) {

    const formContrls = {
      // all validators to input firstname
      qtedonnee: new FormControl()
    };
    // relie formGrp + formControl
    this.myForm = this.fb.group(formContrls);
    this.loginInfo = new AuthLoginInfo();
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

    this.getAllMissionAuthentificated();
    this.getMissionsNotAuth();
    if (this.userService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.userService.getAuthorities();
    }
  }


  getAllMissionAuthentificated() {

    this.missionBenevoleService.getMissionPart(this.username, this.id).subscribe(data => {
      console.log('data', data);
      this.missionsAuth = data;
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
    } else if (this.qtedonnee.value) {
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
        this.getAllBien();
        this.myForm.controls['qtedonnee'].setValue(0);


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
      this.getAllMissionAuthentificated();
      this.toastr.success('Merci de votre participation');

    }, error => {
      console.log(error);
    });

  }

  libererMission(m: Mission) {
    const username = this.userService.getProfileCurrentUser().username;
    console.log(m);
    this.missionBenevoleService.annulerDemande(m.id, username).subscribe(data => {
      console.log('liberer');
      this.getAllMissionAuthentificated();
    })
    ;
  }


  getMissionsNotAuth() {
    this.missionBenevoleService.getMissionByEvent(this.id).subscribe(data => {
      console.log('data', data);
      this.missionsNotAuth = data;
    }, error => console.log(error));
  }

  onSubmit() {
    this.isLoginFailed = false;
    this.loginInfo.username = this.form.username;
    this.loginInfo.password = this.form.password;
    this.roles = this.userService.getAuthorities();

    this.userService.attemptAuth(this.loginInfo).subscribe(
      (data: any) => {
        console.log('data', data);
        try {
          if (data && data.error) {
            this.isLoginFailed = true;
          } else {
            let currentUser: any;
            currentUser = {};
            currentUser.profile = {};
            currentUser.profile.firstname = '';
            console.log('data.name', data.name);
            currentUser.profile.lastname = 'lastname';
            currentUser.profile.email = 'email@tunis.com';

            /*this.user.username = data.username;
            currentUser.profile = this.user;
            console.log('currentUser.profile', currentUser.profile );*/
            currentUser.profile.name = data.name;
            console.log('data.name', data.name);
            currentUser.profile.username = data.username;
            currentUser.isAuthenticated = true;
            currentUser.tokenAuth = data.accessToken;
            console.log('current User', currentUser);
            currentUser.profile.role = data.authorities;
            console.log('currentUser.profile.role', currentUser.profile.role);
            currentUser.profile.roleName = data.authorities[0].authority;
            console.log('currentUser.profile.roleName', currentUser.profile.roleName);
            this.userService.setCurrentUser(currentUser);
            localStorage.setItem('CUREENT_USER', JSON.stringify(this.userService.getCurrentUser()));
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.username = this.userService.getProfileCurrentUser().username;

            console.log('userService', this.userService);
            this.missionsAuth = [];
            this.router.navigate(['eventDetail', this.id]);

            this.getAllMissionAuthentificated();
            this.toastr.success('Content de vous revoir  !', currentUser.profile.username);
          }
        } catch (ex) {
          console.log(ex);
        }

      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

}




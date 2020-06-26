import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, AbstractControl} from '@angular/forms';
import {EventService} from '../services/event-service/event.service';
import {Evenement} from '../models/Evenement';
import {Bien} from '../models/Bien';
import {UserService} from '../../membre_auth/services/user.service';
import {BiensService} from '../services/bien-service/biens.service';
import {ToastrService} from 'ngx-toastr';
import {MissionBenevoleService} from '../services/mission-benevole-service/mission-benevole.service';
import {Mission} from '../models/Mission';
import {User} from '../../membre_auth/models/user';
import {MissionUserDisplay} from '../models/MissionUserDisplay';
import {AuthLoginInfo} from '../../membre_auth/models/login-info';
import {NgxSpinnerService} from 'ngx-spinner';
import {of} from 'rxjs';

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
  formBien: FormGroup;
  formSelectDateMult: FormGroup;
  formLibererMission: FormGroup;
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
  MyArrayDate = [];
  ordersData = [];

  constructor(private route: ActivatedRoute, private router: Router, private eventService: EventService, private fb: FormBuilder,
              private  missionBenevoleService: MissionBenevoleService, public userService: UserService, private biensService: BiensService,
              private toastr: ToastrService, private SpinnerService: NgxSpinnerService) {

    /***pour formulaire mission date disponibilité***/
    this.formSelectDateMult = this.fb.group({
      // The FormArray is used to represent a collection of FormControls that are interrelated
      orders: new FormArray([], minSelectedCheckboxes(1))
    });
    /***pour formulaire donner  bien***/

    this.formBien = this.fb.group({
      qtedonnee: new FormControl()
    });
    this.formLibererMission = this.fb.group({
      titre: [''],
      id: ['']
    });

    this.loginInfo = new AuthLoginInfo();
  }


  openModalFreeMission(mission) {
    console.log('missionmission:::', mission)
    this.formLibererMission.patchValue({
      titre: mission.mission.titre,
      id: mission.mission.id

    });
  }

  get titre() {
    return this.formLibererMission.get('titre');
  }

  get idMisiion() {
    return this.formLibererMission.get('id');
  }

  get qtedonnee() {
    return this.formBien.get('qtedonnee');
  }

  getOrders() {
    return this.MyArrayDate;
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    if (this.userService.isAuthenticated()) {
      this.username = this.userService.getProfileCurrentUser().username;
      this.userService.getUserByUsername(this.username).subscribe((data) => {
        this.user = data;
      });

      this.SpinnerService.show();

      this.eventService.getEventById(this.id)
        .subscribe(data => {
          this.event = data;
          this.MyArrayDate = this.listDays(this.event.dateDebut, this.event.dateFin);
          console.log(' this.MyArrayDate inside ', this.MyArrayDate);

          of(this.MyArrayDate).subscribe(orders => {
            console.log('orders', orders);
            this.addCheckboxes();
          });


          this.SpinnerService.hide();

        }, error => console.log(error));
      this.getAllMissionAuthentificated();

    }
    if (!this.userService.isAuthenticated()) {

      this.SpinnerService.show();
      this.getMissionsNotAuth();
      this.eventService.getEventById(this.id)
        .subscribe(data => {
          this.event = data;
          this.SpinnerService.hide();
        }, error => console.log(error));
    }

    this.getAllBien();
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

  getMissionsNotAuth() {
    this.missionBenevoleService.getMissionByEvent(this.id).subscribe(data => {
      console.log('data', data);
      this.missionsNotAuth = data;
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
        this.formBien.controls['qtedonnee'].setValue(0);


      }, error => console.log(error));
      this.toastr.success('Merci de votre aide');
    }


  }

  addParticipationMission(m: Mission) {
    this.participerMissionForm = {};
    const username = this.userService.getProfileCurrentUser().username;
    this.participerMissionForm.mission = m;

    const selectedOrderIds = this.formSelectDateMult.value.orders
      .map((v, i) => v ? this.ordersData[i].name : null)
      .filter(v => v !== null);
    console.log(selectedOrderIds);
    this.participerMissionForm.dateDisponibiliteList = selectedOrderIds.join('/');

    this.participerMissionForm.demandeDate = this.today;
    this.missionBenevoleService.demandeMission(this.participerMissionForm, username).subscribe(data => {
      console.log(data);

      this.getAllMissionAuthentificated();
      this.toastr.success('Merci de votre participation');

    }, error => {
      console.log(error);
    });

  }

  libererMission() {
    const username = this.userService.getProfileCurrentUser().username;
    console.log("res:id", this.formLibererMission.getRawValue().id);
    this.missionBenevoleService.annulerDemande(this.formLibererMission.getRawValue().id, username).subscribe(data => {
      console.log('liberer');
      this.getAllMissionAuthentificated();
    })
    ;
  }


  onSubmitLoginModal() {
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

  parseDate(input) {
    var parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
  }

  listDays(d: Date, d2: Date): any {
    let date1 = this.parseDate(d);
    let date2 = this.parseDate(d2);
    // To calculate the time difference of two dates
    let Difference_In_Time = date2.getTime() - date1.getTime();
    console.log('Difference_In_Time ', Difference_In_Time);
// To calculate the no. of days between two dates
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    // console.log('Difference_In_Days ', Difference_In_Days);

    let dateIncrement = new Date(date1.getTime() + 1000 * 60 * 60 * 24);
    //console.log('dateIncrement outside ', dateIncrement);

    for (let i = 0; i < Difference_In_Days ; i++) {
      // tslint:disable-next-line:radixs

      let object: any = {};
      object.name = dateIncrement.toDateString();
      console.log('object.name ', object.name);

      this.MyArrayDate.push(object);
      dateIncrement = new Date(dateIncrement.getTime() + 1000 * 60 * 60 * 24);

    }
    console.log('MyArrayType listDays', this.MyArrayDate);
    this.ordersData = this.MyArrayDate;

    console.log('this.getOrders()', this.getOrders());
    return this.MyArrayDate;
  }

  private addCheckboxes() {
    this.ordersData.forEach((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.formSelectDateMult.controls.orders as FormArray).push(control);
    });
  }


  submit() {
    const selectedOrderIds = this.formSelectDateMult.value.orders
      .map((v, i) => v ? this.ordersData[i].name : null)
      .filter(v => v !== null);
    console.log(selectedOrderIds);
  }
}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

    return totalSelected >= min ? null : {required: true};
  };

  return validator;
}





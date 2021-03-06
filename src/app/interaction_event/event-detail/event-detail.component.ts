import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, AbstractControl, Validators} from '@angular/forms';
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
import {DatePipe} from "@angular/common";

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
  formMission: FormGroup;
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
  formulaireLogin: FormGroup;


  constructor(private route: ActivatedRoute, private router: Router, private eventService: EventService, private fb: FormBuilder,
              private  missionBenevoleService: MissionBenevoleService, public userService: UserService, private biensService: BiensService,
              private toastr: ToastrService, private SpinnerService: NgxSpinnerService, public datepipe: DatePipe) {

    /***pour formulaire mission date disponibilité***/
    this.formSelectDateMult = this.fb.group({
      // The FormArray is used to represent a collection of FormControls that are interrelated
      orders: new FormArray([], minSelectedCheckboxes(1))
    });

    /***pour formulaire donner  bien****************/
    this.formBien = this.fb.group({
      qtedonnee: new FormControl()
    });

    /***pour formulaire Liberer mission***************/

    this.formMission = this.fb.group({
      titre: [''],
      description: [''],
      evenement: [''],
      id: ['']
    });

    let formContrls = {
      // all validators to input firstname
      password: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required,
        Validators.email])
    };
    // relie formGrp + formControl
    this.formulaireLogin = this.fb.group(formContrls);

    this.loginInfo = new AuthLoginInfo();
  }

  ngOnInit(): void {
    this.missionsAuth = [];

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

  /************************************** Pour Participer +liberer Mission *******************************************/
  addParticipationMission() {
    this.participerMissionForm = {};
    console.log("res:id", this.formMission.getRawValue());

    const username = this.userService.getProfileCurrentUser().username;
    this.participerMissionForm.mission = this.formMission.getRawValue();

    const selectedOrderIds = this.formSelectDateMult.value.orders
      .map((v, i) => v ? this.ordersData[i].name : null)
      .filter(v => v !== null);
    console.log(selectedOrderIds);
    this.participerMissionForm.dateDisponibiliteList = selectedOrderIds.join('*');

    this.participerMissionForm.demandeDate = this.today;

    this.missionBenevoleService.demandeMission(this.participerMissionForm, username).subscribe(data => {
      console.log(data);

      this.getAllMissionAuthentificated();
      this.toastr.success('Merci de votre participation');

    }, error => {
      console.log(error);
    });

  }

  openModalParticiperMission(mission) {

    this.formMission.patchValue({
      titre: mission.mission.titre,
      id: mission.mission.id,
      evenement: mission.mission.evenement,
      description: mission.mission.description

    });
    console.log('this.formLibererMission:::', this.formMission.getRawValue());

  }

  openModalFreeMission(mission) {
    console.log('missionmission:::', mission)
    this.formMission.patchValue({
      titre: mission.mission.titre,
      id: mission.mission.id

    });
  }

  libererMission() {
    const username = this.userService.getProfileCurrentUser().username;
    console.log("res:id", this.formMission.getRawValue().id);
    this.missionBenevoleService.annulerDemande(this.formMission.getRawValue().id, username).subscribe(data => {
      console.log('liberer');
      this.getAllMissionAuthentificated();
    })
    ;
  }

  get titre() {
    return this.formMission.get('titre');
  }

  getOrders() {
    return this.MyArrayDate;
  }

  /************************************** Donner bien *******************************************/

  get qtedonnee() {
    return this.formBien.get('qtedonnee');
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


  /************************************** List missions + biens *******************************************/


  getAllMissionAuthentificated() {

    this.missionBenevoleService.getMissionPart(this.username, this.id).subscribe(data => {
      console.log('getAllMissionAuthentificated', data);
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

  /************************************** Authentification  *******************************************/

  get password() {
    return this.formulaireLogin.get('password');
  }

  get usernameAuth() {
    return this.formulaireLogin.get('username');
  }

  authentification() {
    this.loginInfo = this.formulaireLogin.value;
    console.log(' this.loginInfo  ', this.loginInfo);
    console.log('this.form ', this.form);
    this.isLoginFailed = false;
    this.roles = this.userService.getAuthorities();
    /*subscribe like youtube chaine ==> les notifs intercept  */
    /*observer  observable Result  */
    this.userService.attemptAuth(this.loginInfo).subscribe(
      (data: any) => {
        console.log('data', data);
        try {
          if (data == null) {
            this.isLoginFailed = true;
            this.errorMessage = 'no';
          } else {
            let currentUser: any;
            currentUser = {};
            currentUser.profile = {};
            currentUser.profile.user = data.user.nom;
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
        console.log('error', error);

        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }


  /************************************** Pour avoir la liste des dates  *******************************************/

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

    if (Difference_In_Time === 0) {
      let dateIncrement = new Date(date1.getTime());

      let object: any = {};
        object.name = this.datepipe.transform(dateIncrement, 'yyyy-MM-dd')


      this.MyArrayDate.push(object);
      this.ordersData = this.MyArrayDate;
    } else {
// To calculate the no. of days between two dates
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      // console.log('Difference_In_Days ', Difference_In_Days);


      //let dateIncrement = new Date(date1.getTime() + 1000 * 60 * 60 * 24);
      let dateIncrement = new Date(date1.getTime());

      for (let i = 0; i <= Difference_In_Days; i++) {
        // tslint:disable-next-line:radixs

        let object: any = {};
        this.datepipe.transform(dateIncrement, 'yyyy-MM-dd');
        // console.log('object ',  this.datepipe.transform(dateIncrement, 'yyyy-MM-dd'));

        // object.name = dateIncrement.toDateString();
        object.name = this.datepipe.transform(dateIncrement, 'yyyy-MM-dd')
        //this.datePipe.transform(myDate, 'yyyy-MM-dd');
        this.MyArrayDate.push(object);
        dateIncrement = new Date(dateIncrement.getTime() + 1000 * 60 * 60 * 24);
        //let dateIncrement = new Date(date1.getTime() + 1000 * 60 * 60 * 24);

      }
      //console.log('MyArrayType listDays', this.MyArrayDate);
      this.ordersData = this.MyArrayDate;
      console.log('Difference_In_Days ', this.ordersData);

      // console.log('this.getOrders()', this.getOrders());
    }
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





import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import Stepper from 'bs-stepper';
import {TestServiceService} from '../../test/services/test-service.service';
import {UserService} from '../services/user.service';
import {User} from '../models/user';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  private stepper: Stepper;
  myForm: FormGroup;
  membre: User;
  isSignedUp = false;
  isSignUpFailed = false;

  constructor(private userService: UserService, private fb: FormBuilder) {
    let formContrls = {
      // all validators to input firstname
      nom: new FormControl('', [Validators.required,
        Validators.minLength(2), Validators.maxLength(10)]),
      prenom: new FormControl('', [Validators.required,
        Validators.minLength(2), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required,
        Validators.minLength(2), Validators.maxLength(10), Validators.email]),
      password: new FormControl('', [Validators.required,
        Validators.minLength(5), Validators.maxLength(10)]),
      password2: new FormControl('', [Validators.required,
        Validators.minLength(5), Validators.maxLength(10)]),
      occupation: new FormControl('', [Validators.required]),
      telephone: new FormControl([Validators.required, Validators.minLength(8)]),
      gouvernoratRes: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required,
        Validators.minLength(5), Validators.maxLength(10)]),
      dateNaissance: new FormControl([Validators.required]),
      genre: new FormControl([Validators.required])
    };
    // relie formGrp + formControl
    this.myForm = this.fb.group(formContrls);
  }

  get dateNaissance() {
    return this.myForm.get('dateNaissance');
  }

  get nom() {
    return this.myForm.get('nom');
  }

  get prenom() {
    return this.myForm.get('prenom');
  }

  get email() {
    return this.myForm.get('email');
  }

  get password() {
    return this.myForm.get('password');
  }

  get password2() {
    return this.myForm.get('password2');
  }

  get occupation() {
    return this.myForm.get('occupation');
  }

  get telephone() {
    return this.myForm.get('telephone');
  }

  get gouvernoratRes() {
    return this.myForm.get('gouvernoratRes');
  }

  get username() {
    return this.myForm.get('username');
  }

  get genre() {
    return this.myForm.get('genre');
  }

  next() {
    this.stepper.next();
  }

  previous() {
    this.stepper.previous();
  }

  onSubmit() {
    this.membre = this.myForm.value;
    this.membre.role = ['user']
    this.membre.isAdmin = 0;
    console.log('this.membre', this.membre);
    try {

      this.userService.signUp(this.membre).subscribe(data => {
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      }, error => {
        this.isSignUpFailed = true;
      });
    } catch (Exception) {
      this.isSignUpFailed = true;
    }
  }


  ngOnInit() {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: true,
      animation: true
    });
  }
}

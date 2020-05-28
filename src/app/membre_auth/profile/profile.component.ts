import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../models/user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  updateUserForm: FormGroup
  user: User;
  isSignedUp = false;
  isSignUpFailed = false;
  username: string;

  constructor(private userService: UserService, private fb: FormBuilder) {
    let formContrls = {
      // all validators to input firstname
      nom: new FormControl('', [Validators.required,
        Validators.minLength(2), Validators.maxLength(10)]),
      prenom: new FormControl('', [Validators.required,
        Validators.minLength(2), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required,
        Validators.minLength(5), Validators.maxLength(10)]),
      password2: new FormControl('', [Validators.required,
        Validators.minLength(5), Validators.maxLength(10)]),
      occupation: new FormControl('', [Validators.required]),
      telephone: new FormControl([Validators.required, Validators.minLength(8)]),
      gouvernoratRes: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required,
        Validators.minLength(5), Validators.maxLength(10), Validators.email]),
      dateNaissance: new FormControl([Validators.required]),
      genre: new FormControl([Validators.required])
    };
    // relie formGrp + formControl
    this.updateUserForm = this.fb.group(formContrls);
  }

  get dateNaissance() {
    return this.updateUserForm.get('dateNaissance');
  }

  get nom() {
    return this.updateUserForm.get('nom');
  }

  get prenom() {
    return this.updateUserForm.get('prenom');
  }


  get password() {
    return this.updateUserForm.get('password');
  }

  get password2() {
    return this.updateUserForm.get('password2');
  }

  get occupation() {
    return this.updateUserForm.get('occupation');
  }

  get telephone() {
    return this.updateUserForm.get('telephone');
  }

  get gouvernoratRes() {
    return this.updateUserForm.get('gouvernoratRes');
  }

  get genre() {
    return this.updateUserForm.get('genre');
  }

  ngOnInit(): void {
    this.username = this.userService.getProfileCurrentUser().username;

    this.userService.getUserByUsername(this.username).subscribe((data) => {
        this.user = data;

        this.updateUserForm.patchValue({
          nom: this.user.nom,
          prenom: this.user.prenom,
          telephone: this.user.telephone,
          password: this.user.password,
          genre: this.user.genre,
          username: this.user.username,
          gouvernoratRes: this.user.gouvernoratRes,
          occupation: this.user.occupation,
          dateNaissance: this.user.dateNaissance
        });
      }
    );
  }

  updateProfileSubmit() {

    this.user = this.updateUserForm.value;
    console.log('this.user', this.user);
    try {

      this.userService.updateUser(this.user).subscribe(data => {
        this.user = data;
        console.log('data', data);

      }, error => {
      });
    } catch (Exception) {

    }
  }


}

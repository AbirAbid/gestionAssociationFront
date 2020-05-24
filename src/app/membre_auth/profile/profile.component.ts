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

  myForm: FormGroup;
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

  get genre() {
    return this.myForm.get('genre');
  }

  ngOnInit(): void {
    this.username = this.userService.getProfileCurrentUser().username;

    this.userService.getUserByUsername(this.username).subscribe((data) => {
        this.user = data;
        console.log('this.membre', this.user);

      }
    );
  }

  onSubmit() {

    this.user = this.myForm.value;

    try {

      this.userService.updateUser(this.user).subscribe(data => {
        this.user = data;
      }, error => {
      });
    } catch (Exception) {

    }
  }


}

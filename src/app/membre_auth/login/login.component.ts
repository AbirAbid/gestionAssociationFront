import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {AuthLoginInfo} from '../models/login-info';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string;
  loginInfo: AuthLoginInfo;
  user: User;
  myForm: FormGroup;

  constructor(private userService: UserService,
              private router: Router, private toastr: ToastrService, private fb: FormBuilder
  ) {

    let formContrls = {
      // all validators to input firstname
      password: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required,
        Validators.email])
    };
    // relie formGrp + formControl
    this.myForm = this.fb.group(formContrls);

    this.loginInfo = new AuthLoginInfo();
  }

  get password() {
    return this.myForm.get('password');
  }

  get username() {
    return this.myForm.get('username');
  }


  ngOnInit() {

    /* if (this.userService.getToken()) {
       this.isLoggedIn = true;
       this.roles = this.userService.getAuthorities();
     }*/
  }

  onSubmit() {
    this.loginInfo = this.myForm.value;
    console.log(' this.loginInfo  ', this.loginInfo);
    console.log('this.form ', this.form);
    this.isLoginFailed = false;
    /*this.loginInfo.username = this.form.username;
    this.loginInfo.password = this.form.password;*/
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
            console.log('userService', this.userService);
            this.userService.setCurrentUser(currentUser);
            this.router.navigate(['/']);
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
}

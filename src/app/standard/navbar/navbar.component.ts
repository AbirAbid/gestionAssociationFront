import {Component, OnInit} from '@angular/core';
import {UserService} from '../../membre_auth/services/user.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})


export class NavbarComponent implements OnInit {
  role: string;
  authority: string;
  data: any;
  image = 'assets/images/logo.ico';

  // LOGO = require ('../images/logoProx-ConvertImage.jpg');

  constructor(public userService: UserService, private router: Router, private toastr: ToastrService) {
    const currentUser = JSON.parse(localStorage.getItem('CUREENT_USER'));
    console.log('currentUser ', currentUser);

    if (currentUser) {
      this.userService.setCurrentUser(currentUser);
    }
  }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
    this.toastr.info('Déconnexion!');

  }
}

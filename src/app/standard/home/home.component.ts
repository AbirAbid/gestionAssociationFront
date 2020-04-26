import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  carousel1 = '../assets/images/carousel1.jpg';
  carousel2 = 'assets/images/carousel2.jpg';
  carousel3 = 'assets/images/carousel3.jpg';
  adherent = 'assets/images/adherent.gif';
  benevole = 'assets/images/benevole.png';
  faireDon = 'assets/images/faire_don.png';

  constructor() {
  }

  ngOnInit(): void {
  }

}

import {Component, OnInit} from '@angular/core';
import {EventCountElmtsDto} from '../models/EventCountElmtsDto';
import {HomeServicesService} from '../services/home-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  eventCountElmtsDto: EventCountElmtsDto;

  /*  carousel1 = '../assets/images/carousel1.jpg';
    carousel2 = 'assets/images/carousel2.jpg';
    carousel3 = 'assets/images/carousel3.jpg';
    adherent = 'assets/images/adherent.gif';
    benevole = 'assets/images/benevole.png';
    faireDon = 'assets/images/faire_don.png';*/

  constructor(private homeServicesService: HomeServicesService) {
  }

  ngOnInit(): void {
    this.homeServicesService.getEventCountElmtsDto().subscribe((data) => {
        this.eventCountElmtsDto = data;
      }
    );
  }

}

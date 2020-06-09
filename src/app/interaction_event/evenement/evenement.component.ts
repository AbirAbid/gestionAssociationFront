import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EventService} from '../services/event-service/event.service';
import {Evenement} from '../models/Evenement';
import dayGridPlugin from '@fullcalendar/daygrid';
import {DatePipe} from '@angular/common';
import {EventCountCategories} from '../models/EventCountCategories';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.scss']
})

export class EvenementComponent implements OnInit {
  calendarPlugins = [dayGridPlugin];

  totalRecords: number;
  page = 1;
  evenements: Evenement [] = [];
  dateJour = new Date();
  dateJour2 = new Date();
  eventCountCategories: EventCountCategories [] = [];

  constructor(private eventService: EventService, private router: Router) {


  }

  ngOnInit(): void {

    this.eventService.getCountCategoriesEvent().subscribe((data) => {
      this.eventCountCategories = data;
      console.log(' this.eventCountCategories ', this.eventCountCategories);

    });

    this.eventService.getAllEvent().subscribe((data) => {
      this.evenements = data;
      this.totalRecords = this.evenements.length;
      console.log('this.events', this.evenements);


    });
  }

  eventDetail(id: number) {
    this.router.navigate(['eventDetail', id]);

  }
}

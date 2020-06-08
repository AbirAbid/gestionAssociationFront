import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EventService} from '../services/event-service/event.service';
import {Evenement} from '../models/Evenement';
import dayGridPlugin from '@fullcalendar/daygrid';
import {DatePipe} from '@angular/common';

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

  constructor(private eventService: EventService, private router: Router) {
    let date1 = new Date('2020-06-26 00:00:00');

    console.log('date1', date1);

    this.dateJour2 = new Date('8/6/20');
    console.log('this.dateJour2', this.dateJour2);

  }

  ngOnInit(): void {
    this.eventService.getAllEvent().subscribe((data) => {

      this.evenements = data;
      this.totalRecords = this.evenements.length;
      console.log('this.events', this.evenements);


    });
  }

  eventDetail(id: number) {
    this.router.navigate(['eventDetail', id]);
    // this.router.navigate(['ok', id]);

  }
}

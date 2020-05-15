import {Component, OnInit} from '@angular/core';
import {EventService} from "../services/event-service/event.service";
import {Router} from "@angular/router";
import dayGridPlugin from "@fullcalendar/daygrid";
import {Evenement} from "../models/Evenement";

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss']
})
export class EventCalendarComponent implements OnInit {
  calendarPlugins = [dayGridPlugin];

  // calendarEvents: any = [];
  evenements: Evenement [] = [];
  calendarEvents = [];

  constructor(private eventService: EventService, private router: Router) {


  }

  ngOnInit(): void {
    this.eventService.getAllEvent().subscribe((data) => {
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < data.length; index++) {
        this.calendarEvents.push({title: data[index].titre, start: data[index].dateDebut});
      }
      this.evenements = data;
      console.log('this.calendarEvents,', this.calendarEvents);

      console.log('this.events', this.evenements);


    });
  }
}



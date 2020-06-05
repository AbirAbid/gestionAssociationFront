import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EventService} from '../services/event-service/event.service';
import {Evenement} from '../models/Evenement';
import dayGridPlugin from '@fullcalendar/daygrid';
import {toTitleCase} from 'codelyzer/util/utils';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.scss']
})

export class EvenementComponent implements OnInit {
  calendarPlugins = [dayGridPlugin];

  // calendarEvents: any = [];
  evenements: Evenement [] = [];
  calendarEvents = [];

  dateJour = new Date();

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

  eventDetail(id: number) {
   this.router.navigate(['eventDetail', id]);
   // this.router.navigate(['ok', id]);

  }
}

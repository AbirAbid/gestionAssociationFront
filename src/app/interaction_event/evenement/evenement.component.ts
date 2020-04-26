import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EventService} from '../services/event.service';
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


    /*
        this.eventService.getAllEvent().subscribe((data) => {
          this.events = data;
          console.log('this.events', this.events);

          /!*  for (let index = 0 ; index < this.taskAffect.users.length ; index++)
            { if (this.taskAffect.users[index].roles[0].name == 'ROLE_TECHNICIEN') {
              listRoleTech.push(this.taskAffect.users[index]);} }
            return listRoleTech;
          }*!/
          // tslint:disable-next-line:prefer-for-of
          for (let index = 0; index < this.events.length; index++) {
            this.calendarEvents.push({title: this.events[index].titre, date: this.events[index].dateDebut});
          }
          console.log('this.calendarEvents,', this.calendarEvents);

        });*/


  }
}

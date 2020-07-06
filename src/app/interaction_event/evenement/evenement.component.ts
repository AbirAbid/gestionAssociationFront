import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EventService} from '../services/event-service/event.service';
import {Evenement} from '../models/Evenement';
import dayGridPlugin from '@fullcalendar/daygrid';
import {EventCountCategories} from '../models/EventCountCategories';
import {NgxSpinnerService} from "ngx-spinner";
import {DatePipe} from "@angular/common";

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

  eventCountCategories: EventCountCategories [] = [];
  nb = 0;

  constructor(private eventService: EventService, private router: Router, private SpinnerService: NgxSpinnerService, public datepipe: DatePipe) {


  }

  ngOnInit(): void {
    this.SpinnerService.show();

    this.eventService.getCountCategoriesEvent().subscribe((data) => {
      this.eventCountCategories = data;
      console.log(' this.eventCountCategories ', this.eventCountCategories);
      this.SpinnerService.hide();


    });

    this.getAllEvents();

  }

  eventDetail(id: number) {
    this.router.navigate(['eventDetail', id]);

  }

  getAllEvents() {
    this.eventService.getAllEvent().subscribe((data) => {
      this.evenements = data;
      this.nb = this.evenements.length;
      this.totalRecords = this.evenements.length;
      console.log('this.events', this.evenements);


    });
  }

  eventCat(categorie: string) {
    this.eventService.getListEventByCategorie(categorie).subscribe((data) => {
      this.evenements = data;
      this.totalRecords = this.evenements.length;
      console.log('this.events', this.evenements);


    });
  }
}

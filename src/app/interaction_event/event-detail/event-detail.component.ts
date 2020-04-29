import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../services/event-service/event.service';
import {Evenement} from '../models/Evenement';
import {Bien} from '../models/Bien';
import {MissionBenevole} from "../models/MissionBenevole";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  id: number;
  event: Evenement = new Evenement();
  biens: Bien[] = [];
  missions: MissionBenevole[] = [];


  constructor(private route: ActivatedRoute, private router: Router, private eventService: EventService) {
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params.id;

    this.eventService.getEventById(this.id)
      .subscribe(data => {
        console.log(data);
        this.event = data;
      }, error => console.log(error));

    this.eventService.getAllBienByEvent(this.id).subscribe(data => {
      this.biens = data;
    }, error => console.log(error));

    this.eventService.getAllMissionByEvent(this.id).subscribe(data => {
      this.missions = data;
    }, error => console.log(error));

  }

}



import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SponsorService} from '../services/sponsor.service';
import {Sponsor} from '../models/sponsor';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.scss']
})
export class SponsorComponent implements OnInit {
  // path : 'sponsorsList'
  sponsors: Sponsor [] = [];

  constructor(private sponsorService: SponsorService, private router: Router) {
  }

  ngOnInit(): void {
    this.sponsorService.getAllSponsor().subscribe((data) => {
      this.sponsors = data;

    });

  }
}

import {Component, OnInit} from '@angular/core';
import {BiensService} from '../services/biens.service';
import {Bien} from '../models/Bien';

@Component({
  selector: 'app-donner-biens',
  templateUrl: './donner-biens.component.html',
  styleUrls: ['./donner-biens.component.scss']
})
export class DonnerBiensComponent implements OnInit {
  listBien: Bien[] = [];


  constructor(private biensService: BiensService) {
  }

  ngOnInit(): void {
    this.biensService.getAllBien().subscribe((data) => {
      this.listBien = data;

    });
  }

}

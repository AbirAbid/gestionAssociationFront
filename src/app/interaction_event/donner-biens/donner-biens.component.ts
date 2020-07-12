import {Component, OnInit} from '@angular/core';
import {BiensService} from '../services/bien-service/biens.service';
import {Bien} from '../models/Bien';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-donner-biens',
  templateUrl: './donner-biens.component.html',
  styleUrls: ['./donner-biens.component.scss']
})
export class DonnerBiensComponent implements OnInit {
  listBien: Bien[] = [];
  myForm: FormGroup;
  showMsg = false;
  totalRecords: number;
  page = 1;
  dateJour = new Date();

  constructor(private biensService: BiensService, private fb: FormBuilder, private router: Router, private SpinnerService: NgxSpinnerService, public datepipe: DatePipe) {
    const formContrls = {
      region: new FormControl()
    };
    // relie formGrp + formControl
    this.myForm = this.fb.group(formContrls);
  }

  get region() {
    return this.myForm.get('region');
  }

  ngOnInit(): void {
    this.SpinnerService.show();

    this.biensService.getAllBien().subscribe((data) => {
      this.listBien = data;
      console.log('this.listBien', this.listBien);

      this.totalRecords = this.listBien.length;
      console.log(' this.totalRecords ', this.totalRecords);
      this.SpinnerService.hide();


    });
  }

  load() {
    this.showMsg = false;

    this.biensService.getAllBien().subscribe((data) => {
      this.listBien = data;

    });
  }

  getAllBienByRegion() {
    if (this.region.value) {
      this.showMsg = true;
      this.biensService.getAllBienRegion(this.region.value).subscribe((data) => {
        this.listBien = data;
        console.log('this.listBien', this.listBien);
      });
    }
  }

  eventDetail(id: number) {
    this.router.navigate(['eventDetail', id]);

  }
}

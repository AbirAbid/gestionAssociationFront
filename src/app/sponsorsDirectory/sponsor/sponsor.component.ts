import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SponsorService} from '../services/sponsor.service';
import {Sponsor} from '../models/sponsor';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.scss']
})
export class SponsorComponent implements OnInit {
  // path : 'sponsorsList'
  formSelectDateMult: FormGroup;
  ordersData = [];

  sponsors: Sponsor [] = [];

  constructor(private sponsorService: SponsorService,   private formBuilder: FormBuilder) {


      this.formSelectDateMult = this.formBuilder.group({

        // The FormArray is used to represent a collection of FormControls that are interrelated

        orders: new FormArray([], minSelectedCheckboxes(1))
      });

      // async orders
      of(this.getOrders()).subscribe(orders => {
        this.ordersData = orders;
        this.addCheckboxes();
      });
  }

  ngOnInit(): void {
    this.sponsorService.getAllSponsor().subscribe((data) => {
      this.sponsors = data;

    });

  }
  private addCheckboxes() {
    this.ordersData.forEach((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.formSelectDateMult.controls.orders as FormArray).push(control);
    });
  }

  getOrders() {
    return [
      { name: 'order 1' },
      {  name: 'order 2' },
      { name: 'order 3' },
      { name: 'order 4' }
    ];
  }

  submit() {
    const selectedOrderIds = this.formSelectDateMult.value.orders
      .map((v, i) => v ? this.ordersData[i].name : null)
      .filter(v => v !== null);
    console.log(selectedOrderIds);
  }
}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}

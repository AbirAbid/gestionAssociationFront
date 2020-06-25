import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.scss']
})
export class SponsorComponent implements OnInit {
  title = 'modal2';
  editProfileForm: FormGroup;
  userList = [
    {
      id: "1",
      firstname: "Aiman",
      lastname: "Rahmat",
      username: "aimanrahmat",
      email: "aimanrahmat@gmail.com"
    },
    {
      id: "2",
      firstname: "Christiano",
      lastname: "Ronaldo",
      username: "ronaldo7",
      email: "ronaldo7@gmail.com"
    },
    {
      id: "3",
      firstname: "Wayne",
      lastname: "Rooney",
      username: "rooney8",
      email: "rooney8@gmail.com"
    }];

  constructor(private fb: FormBuilder, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.editProfileForm = this.fb.group({
      firstname: [''],
    });
  }
  openModal( user) {
    this.editProfileForm.patchValue({
      firstname: user.firstname
    });
  }


  get firstname() {
    return this.editProfileForm.get('firstname');
  }
}


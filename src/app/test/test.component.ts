import {Component, OnInit} from '@angular/core';
import {TestServiceService} from './services/test-service.service';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  userlist = [];
  image = 'assets/images/photo.png';
  booksList = [{
    id: 1,
    nom: 'aziz',
    phone: '55555555555'
  }, {
    id: 2,
    nom: 'aziz2',
    phone: '55555555555'
  }, {
    id: 3,
    nom: 'aziz3',
    phone: '55555555555'
  }];
  myCondition = true;
  myForm: FormGroup;

  constructor(private  testServiceService: TestServiceService, private fb: FormBuilder) {
    let formContrls = {
      // all validators to input firstname
      firstname: new FormControl('', [Validators.required,
        Validators.minLength(2), Validators.pattern('[a-z . , -]+')])
    };
    // relie formGrp + formControl
    this.myForm = this.fb.group(formContrls);
  }

  // pour acceder input html firstname formControl
  get firstname() {
    return this.myForm.get('firstname');
  }

  add() {
    console.log('this.myForm.value', this.myForm.value);
    /* console.log(this.myForm.get('v').value);
     console.log(' ', this.myForm.get('v'));
     return this.myForm.get('v');*/
  }


  ngOnInit(): void {

    this.testServiceService.getAllUser().subscribe((users) => {
      this.userlist = users;
      console.log(' this.userlist ', this.userlist);
    }, error => {
      console.log('error', error);
    });

  }


  /*hello(variable);
  {
    this.myCondition = false;
    console.log('hello hello hello', variable);
    alert('hello hello hello' + variable);
  }*/


}

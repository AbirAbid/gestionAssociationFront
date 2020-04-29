import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MissionBenevoleService} from '../services/mission-benevole-service/mission-benevole.service';
import {MissionBenevole} from '../models/MissionBenevole';

@Component({
  selector: 'app-devenir-benevole',
  templateUrl: './devenir-benevole.component.html',
  styleUrls: ['./devenir-benevole.component.scss']
})
export class DevenirBenevoleComponent implements OnInit {
  listMission: MissionBenevole[] = [];
  myForm: FormGroup;
  show = false;
  totalRecords: number;
  page = 1;

  constructor(private missionBenevoleService: MissionBenevoleService, private fb: FormBuilder) {
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
    this.missionBenevoleService.getAllMission().subscribe((data) => {
      this.listMission = data;
      console.log('this.listBien', this.listMission);

      this.totalRecords = this.listMission.length;
      console.log(' this.totalRecords ', this.totalRecords);


    });
  }

  load() {
    this.show = false;

    this.missionBenevoleService.getAllMission().subscribe((data) => {
      this.listMission = data;

    });
  }

  getAllMissionByRegion() {
    if (this.region.value) {
      this.show = true;
      this.missionBenevoleService.getAllMissionRegion(this.region.value).subscribe((data) => {
        this.listMission = data;
        console.log('this.listBien', this.listMission);
      });
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';

declare var device;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'gestionAssociationFront';

  constructor(private SpinnerService: NgxSpinnerService) {
  }

  ngOnInit() {
    document.addEventListener('deviceready', function () {
      alert(device.platform);
    }, false);
  }
}

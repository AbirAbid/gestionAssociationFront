import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonsBiensComponent } from './dons-biens.component';

describe('DonsBiensComponent', () => {
  let component: DonsBiensComponent;
  let fixture: ComponentFixture<DonsBiensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonsBiensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonsBiensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

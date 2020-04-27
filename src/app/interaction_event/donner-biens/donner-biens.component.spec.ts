import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonnerBiensComponent } from './donner-biens.component';

describe('DonnerBiensComponent', () => {
  let component: DonnerBiensComponent;
  let fixture: ComponentFixture<DonnerBiensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonnerBiensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonnerBiensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevenirAdherentComponent } from './devenir-adherent.component';

describe('DevenirAdherentComponent', () => {
  let component: DevenirAdherentComponent;
  let fixture: ComponentFixture<DevenirAdherentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevenirAdherentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevenirAdherentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceAdherentComponent } from './espace-adherent.component';

describe('EspaceAdherentComponent', () => {
  let component: EspaceAdherentComponent;
  let fixture: ComponentFixture<EspaceAdherentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspaceAdherentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaceAdherentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

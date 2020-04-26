import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivBenevoleComponent } from './activ-benevole.component';

describe('ActivBenevoleComponent', () => {
  let component: ActivBenevoleComponent;
  let fixture: ComponentFixture<ActivBenevoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivBenevoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivBenevoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

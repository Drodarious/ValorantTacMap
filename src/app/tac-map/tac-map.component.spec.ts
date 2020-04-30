import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TacMapComponent } from './tac-map.component';

describe('TacMapComponent', () => {
  let component: TacMapComponent;
  let fixture: ComponentFixture<TacMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TacMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TacMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

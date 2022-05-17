import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeditationsComponent } from './meditations.component';

describe('MeditationsComponent', () => {
  let component: MeditationsComponent;
  let fixture: ComponentFixture<MeditationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeditationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeditationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetExercisesComponent } from './get-exercises.component';

describe('GetExercisesComponent', () => {
  let component: GetExercisesComponent;
  let fixture: ComponentFixture<GetExercisesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetExercisesComponent]
    });
    fixture = TestBed.createComponent(GetExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdviceComponent } from './add-advice.component';

describe('AddAdviceComponent', () => {
  let component: AddAdviceComponent;
  let fixture: ComponentFixture<AddAdviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAdviceComponent]
    });
    fixture = TestBed.createComponent(AddAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

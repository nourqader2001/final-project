import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdviceComponent } from './update-advice.component';

describe('UpdateAdviceComponent', () => {
  let component: UpdateAdviceComponent;
  let fixture: ComponentFixture<UpdateAdviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAdviceComponent]
    });
    fixture = TestBed.createComponent(UpdateAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

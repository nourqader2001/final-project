import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAdvicesComponent } from './get-advices.component';

describe('GetAdvicesComponent', () => {
  let component: GetAdvicesComponent;
  let fixture: ComponentFixture<GetAdvicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetAdvicesComponent]
    });
    fixture = TestBed.createComponent(GetAdvicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

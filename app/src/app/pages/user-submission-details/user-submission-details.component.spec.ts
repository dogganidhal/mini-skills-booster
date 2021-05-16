import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSubmissionDetailsComponent } from './user-submission-details.component';

describe('UserSubmissionsComponent', () => {
  let component: UserSubmissionDetailsComponent;
  let fixture: ComponentFixture<UserSubmissionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSubmissionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSubmissionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

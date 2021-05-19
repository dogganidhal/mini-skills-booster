import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSubmissionListComponent } from './quiz-submission-list.component';

describe('QuizSubmissionListComponent', () => {
  let component: QuizSubmissionListComponent;
  let fixture: ComponentFixture<QuizSubmissionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizSubmissionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizSubmissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitQuizFormComponent } from './submit-quiz-form.component';

describe('QuizFormComponent', () => {
  let component: SubmitQuizFormComponent;
  let fixture: ComponentFixture<SubmitQuizFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitQuizFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitQuizFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

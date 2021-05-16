import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQuizListComponent } from './user-quiz-list.component';

describe('UserQuizzesComponent', () => {
  let component: UserQuizListComponent;
  let fixture: ComponentFixture<UserQuizListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserQuizListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQuizListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

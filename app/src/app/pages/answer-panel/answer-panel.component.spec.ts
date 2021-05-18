import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerPanelComponent } from './answer-panel.component';

describe('QuestionPanelComponent', () => {
  let component: AnswerPanelComponent;
  let fixture: ComponentFixture<AnswerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

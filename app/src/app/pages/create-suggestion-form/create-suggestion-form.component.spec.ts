import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSuggestionFormComponent } from './create-suggestion-form.component';

describe('CreateSuggestionFormComponent', () => {
  let component: CreateSuggestionFormComponent;
  let fixture: ComponentFixture<CreateSuggestionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSuggestionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSuggestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

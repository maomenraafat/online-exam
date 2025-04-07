import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizContainerComponent } from './quiz-container.component';

describe('QuizContainerComponent', () => {
  let component: QuizContainerComponent;
  let fixture: ComponentFixture<QuizContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

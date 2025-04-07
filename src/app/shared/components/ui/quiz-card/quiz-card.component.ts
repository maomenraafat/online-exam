import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quiz } from '../../../interfaces/quiz';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quiz-card',
  imports: [RouterLink],
  templateUrl: './quiz-card.component.html',
  styleUrl: './quiz-card.component.scss',
})
export class QuizCardComponent {
  @Input() quiz!: Quiz;
  @Output() fireGetExams: EventEmitter<string> = new EventEmitter();

  handleClick(id: string) {
    this.fireGetExams.emit(id);
  }
}

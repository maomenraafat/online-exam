import {
  Component,
  effect,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { QuestionService } from '../../../services/question/question.service';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit {
  selectedOption: string | null = null;
  currentQuestion = signal(1);
  examstart: boolean = false;
  _questionService = inject(QuestionService);
  questionsList = this._questionService.questionsList;
  @Output() close = new EventEmitter<void>();
  @Output() onStart = new EventEmitter<void>();
  constructor() {
    effect(() => {
      console.log('Questions updated:', this.questionsList());
    });
  }
  ngOnInit(): void {}

  nextQuestion() {
    if (this.currentQuestion() < this.questionsList().length) {
      this.currentQuestion.update((val) => val + 1);
      this.selectedOption = null;
    } else {
      // Handle quiz completion
      console.log('Quiz completed!');
    }
  }
  prevQuestion() {
    if (this.currentQuestion() > 1) {
      this.currentQuestion.update((val) => val - 1);
    }
  }
  selectOption(optionId: string) {
    this.selectedOption = optionId;
  }

  isOptionSelected(optionId: string): boolean {
    return this.selectedOption === optionId;
  }
  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close.emit();
      this._questionService.clearQuestions();
    }
  }
}

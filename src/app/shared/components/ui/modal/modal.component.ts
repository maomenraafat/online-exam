import {
  Component,
  effect,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { QuestionService } from '../../../services/question/question.service';
import { ResultChartComponent } from '../result-chart/result-chart.component';
import { Question, UserAnswer } from '../../../interfaces/question';

@Component({
  selector: 'app-modal',
  imports: [ResultChartComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit {
  selectedOption: string | null = null;
  currentQuestion: WritableSignal<number> = signal(1);
  examstart: boolean = true;
  _questionService = inject(QuestionService);
  questionsList = this._questionService.questionsList;
  userAnswers!: UserAnswer[];
  isLoadingQuestions = this._questionService.isLoadingQuestions();
  // ... existing properties ...
  showResults: WritableSignal<boolean> = signal(false);
  score: WritableSignal<number> = signal(0);
  correctCount: WritableSignal<number> = signal(0);
  incorrectCount: WritableSignal<number> = signal(0);

  @Output() close = new EventEmitter<void>();
  @Output() onStart = new EventEmitter<void>();
  constructor() {
    effect(() => {
      this.isLoadingQuestions = this._questionService.isLoadingQuestions();
      // console.log('Questions updated:', this.questionsList());
      this.loadSelectedAnswer();
    });
  }

  ngOnInit(): void {}
  startExam() {
    this.examstart = false;
  }

  get totalQuestions() {
    return this.questionsList().length;
  }
  loadSelectedAnswer() {
    const currentQ = this.questionsList()[this.currentQuestion() - 1];
    this.selectedOption = currentQ?.userAnswer || null;
  }
  saveCurrentAnswer() {
    if (this.selectedOption) {
      const updatedQuestions = [...this.questionsList()];
      updatedQuestions[this.currentQuestion() - 1] = {
        ...updatedQuestions[this.currentQuestion() - 1],
        userAnswer: this.selectedOption,
      };
      this._questionService.updateQuestions(updatedQuestions);
    }
  }
  calculateResults() {
    if (!this.isQuizComplete()) {
      console.log('Trying to show results before all questions are answered');
      return;
    }
    const questions = this.questionsList();
    const correct = questions.filter((q) => q.userAnswer === q.correct).length;
    const total = questions.length;

    this.correctCount.set(correct);
    this.incorrectCount.set(total - correct);
    this.score.set(Math.round((correct / total) * 100));
    this.showResults.set(true);
  }

  isQuizComplete() {
    const answeredQuestions = this.questionsList().filter(
      (q) => q.userAnswer
    ).length;
    return answeredQuestions === this.totalQuestions;
  }

  nextQuestion() {
    this.saveCurrentAnswer();

    if (this.currentQuestion() < this.totalQuestions) {
      this.currentQuestion.update((val) => val + 1);
    } else if (this.isQuizComplete()) {
      this.calculateResults();
      this.getUserAnswers();
      this.submitAnswers();
    }
  }

  prevQuestion() {
    if (this.currentQuestion() > 1) {
      this.currentQuestion.update((val) => val - 1);
    }
  }
  selectOption(optionId: string) {
    this.selectedOption = optionId;
    this.saveCurrentAnswer();

    if (this.currentQuestion() < this.totalQuestions && this.isQuizComplete()) {
      this.nextQuestion();
    }
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

  transformToUserAnswers(questions: Question[]): UserAnswer[] {
    return questions.map((question) => ({
      questionId: question._id,
      correct: question.userAnswer || undefined,
    }));
  }
  getUserAnswers(): UserAnswer[] {
    const transformedAnswers = this.transformToUserAnswers(
      this.questionsList()
    );
    console.log(transformedAnswers);
    this.userAnswers = transformedAnswers;
    return transformedAnswers;
  }

  submitAnswers() {
    this._questionService.checkQuestions(this.userAnswers, 10).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}

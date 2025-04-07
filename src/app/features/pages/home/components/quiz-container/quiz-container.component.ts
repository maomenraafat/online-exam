import { Component, inject, OnInit } from '@angular/core';
import { QuizService } from '../../../../../shared/services/quiz/quiz.service';
import { Quiz } from '../../../../../shared/interfaces/quiz';
import { QuizApiRes } from '../../../../../shared/interfaces/quiz-api-data';
import { QuizCardComponent } from '../../../../../shared/components/ui/quiz-card/quiz-card.component';
import { ExamApiRes } from '../../../../../shared/interfaces/exam-api-data';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-quiz-container',
  imports: [QuizCardComponent],
  templateUrl: './quiz-container.component.html',
  styleUrl: './quiz-container.component.scss',
})
export class QuizContainerComponent implements OnInit {
  quizzesLimit: number = 6;
  quizzesList!: Quiz[];
  isLoading: boolean = false;
  isError: boolean = false;
  private readonly destroy$ = new Subject<void>();

  private readonly _quizService = inject(QuizService);
  ngOnInit(): void {
    this.getAllQuizzes(this.quizzesLimit);
  }

  getAllQuizzes(limit: number): void {
    this.isLoading = true;
    this.isError = false;
    this._quizService
      .getAllQuizzes(limit)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: QuizApiRes) => {
          this.quizzesList = res.quizzes;
          this.isLoading = false;
          console.log(this.quizzesList);
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.isError = true;
        },
        complete: () => {
          console.log('complete');
          this.isLoading = false;
        },
      });
  }

  getAllQuizzesData() {
    this.quizzesLimit = 0;
    this.getAllQuizzes(this.quizzesLimit);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

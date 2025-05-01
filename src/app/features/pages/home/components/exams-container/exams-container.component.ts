import { Component, inject, OnInit } from '@angular/core';
import { QuizService } from '../../../../../shared/services/quiz/quiz.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExamApiRes } from '../../../../../shared/interfaces/exam-api-data';
import { Exam } from '../../../../../shared/interfaces/exam';
import { ExamCardComponent } from '../../../../../shared/components/ui/exam-card/exam-card.component';
import { QuestionService } from '../../../../../shared/services/question/question.service';
import { QuestionApiData } from '../../../../../shared/interfaces/question-api-data';
import { Question } from '../../../../../shared/interfaces/question';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-exams-container',
  imports: [ExamCardComponent, RouterLink],
  templateUrl: './exams-container.component.html',
  styleUrl: './exams-container.component.scss',
})
export class ExamsContainerComponent implements OnInit {
  quizId!: string;
  examId!: string;
  examsList!: Exam[];
  questionsList!: Question[];
  isLoading: boolean = false;
  isError: boolean = false;
  private readonly destroy$ = new Subject<void>();
  private readonly _quizService = inject(QuizService);
  private readonly _questionService = inject(QuestionService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  ngOnInit(): void {
    this.getID();
    this.getExamsByQuiz(this.quizId);
  }

  getID() {
    this._activatedRoute.paramMap.subscribe({
      next: (res: any) => {
        console.log(res?.params?.id);
        this.quizId = res?.params?.id;
      },
    });
  }
  getExamsByQuiz(quizId: string) {
    this.isLoading = true;
    this.isError = false;
    console.log(quizId);
    this._quizService
      .getExamsOnQuize(quizId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: ExamApiRes) => {
          console.log(res);
          this.examsList = res.exams;
          this.isLoading = false;
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
  getQuestionsByExam(examId: string) {
    this._questionService.isLoadingQuestions.set(true);
    this.isError = false;
    this._questionService
      .getquestionsOnExams(examId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: QuestionApiData) => {
          console.log(res);
          this.questionsList = res.questions;
          this._questionService.isLoadingQuestions.set(false);
        },
        error: (err) => {
          console.log(err);
          this._questionService.isLoadingQuestions.set(false);

          this.isError = true;
        },
        complete: () => {
          console.log('complete');
          this._questionService.isLoadingQuestions.set(false);
        },
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

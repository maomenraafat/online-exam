import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { QuestionApiData } from '../../interfaces/question-api-data';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environments';
import { QuizAdaptorService } from '../../../adaptors/quiz/quiz-adaptor.adaptor';
import { Question } from '../../interfaces/question';
import { QuestionEndPoint } from '../../../enums/question.endPoints';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private _questionsList: WritableSignal<Question[]> = signal<Question[]>([]);
  questionsList = this._questionsList.asReadonly();
  _httpClient = inject(HttpClient);
  _quizAdaptorService = inject(QuizAdaptorService);
  constructor() {}

  getquestionsOnExams(id: string): Observable<QuestionApiData> {
    return this._httpClient
      .get(
        `${environment.baseUrl}${QuestionEndPoint.AllQuestionsOnExam}?exam=${id}`
      )
      .pipe(
        map((res: any) => {
          const adapted = this._quizAdaptorService.adaptQuestion(res);
          this._questionsList.set(adapted.questions);
          return adapted;
        }),
        catchError((err) => {
          return throwError(() => this._quizAdaptorService.adaptError(err));
        })
      );
  }
  clearQuestions() {
    this._questionsList.set([]);
  }
}

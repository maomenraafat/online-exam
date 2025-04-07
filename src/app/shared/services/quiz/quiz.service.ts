import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environments';
import { QuizAdaptorService } from '../../../adaptors/quiz/quiz-adaptor.adaptor';
import { QuizApiRes } from '../../interfaces/quiz-api-data';
import { QuizEndPoint } from '../../../enums/quiz.endPoints';
import { ExamApiRes } from '../../interfaces/exam-api-data';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  _httpClient = inject(HttpClient);
  _quizAdaptorService = inject(QuizAdaptorService);

  constructor() {}

  getAllQuizzes(limit: number): Observable<QuizApiRes> {
    return this._httpClient
      .get(`${environment.baseUrl}${QuizEndPoint.AllQuizzes}?limit=${limit}`)
      .pipe(
        map((res: any) => this._quizAdaptorService.adapt(res)),
        catchError((err) => {
          return throwError(() => this._quizAdaptorService.adaptError(err));
        })
      );
  }
  getExamsOnQuize(id: string): Observable<ExamApiRes> {
    return this._httpClient
      .get(
        `${environment.baseUrl}${QuizEndPoint.AllExamsOnQuize}?subject=${id}`
      )
      .pipe(
        map((res: any) => this._quizAdaptorService.adaptExam(res)),
        catchError((err) => {
          return throwError(() => this._quizAdaptorService.adaptError(err));
        })
      );
  }
}

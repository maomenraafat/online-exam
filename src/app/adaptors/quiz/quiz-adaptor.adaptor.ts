import { Injectable } from '@angular/core';
import { QuizApiData, QuizApiRes } from '../../shared/interfaces/quiz-api-data';

@Injectable({
  providedIn: 'root',
})
export class QuizAdaptorService {
  constructor() {}

  adapt(data: QuizApiData): QuizApiRes {
    return {
      message: data.message,
      metadata: data.metadata,
      quizzes: data.subjects,
    };
  }
  adaptExam(data: any): any {
    return {
      message: data.message,
      metadata: data.metadata,
      exams: data.exams,
    };
  }
  adaptQuestion(data: any): any {
    return {
      message: data.message,
      questions: data.questions,
    };
  }
  adaptError(data: any): any {
    return {
      message: data.error.message,
      code: data.error.code,
    };
  }
}

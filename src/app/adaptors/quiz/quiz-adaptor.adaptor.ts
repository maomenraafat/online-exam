import { Injectable } from '@angular/core';
import { QuizApiData, QuizApiRes } from '../../shared/interfaces/quiz-api-data';
import { ExamApiData, ExamApiRes } from '../../shared/interfaces/exam-api-data';
import { QuestionApiData } from '../../shared/interfaces/question-api-data';

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
  adaptExam(data: ExamApiData): ExamApiRes {
    return {
      message: data.message,
      metadata: data.metadata,
      exams: data.exams,
    };
  }
  adaptQuestion(data: QuestionApiData): QuestionApiData {
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

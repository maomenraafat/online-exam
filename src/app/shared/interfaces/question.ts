import { Exam } from './exam';
import { Quiz } from './quiz';

export interface Question {
  answers: Answer[];
  type: string;
  _id: string;
  question: string;
  correct: string;
  subject: Quiz;
  exam: Exam;
  createdAt: string;
  userAnswer?: string;
}

export interface Answer {
  answer: string;
  key: string;
}

export interface UserAnswer {
  questionId: string;
  correct?: string;
}

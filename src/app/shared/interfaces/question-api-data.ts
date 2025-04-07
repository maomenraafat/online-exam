import { Question } from './question';

export interface QuestionApiData {
  message: string;
  questions: Question[];
}

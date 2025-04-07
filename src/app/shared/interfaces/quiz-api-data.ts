import { Quiz } from './quiz';

export interface QuizApiData {
  message: string;
  metadata: Metadata;
  subjects: Quiz[];
}
export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}
export interface QuizApiRes {
  message: string;
  metadata: Metadata;
  quizzes: Quiz[];
}

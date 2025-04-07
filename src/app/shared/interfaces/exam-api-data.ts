import { Exam } from './exam';

export interface ExamApiData {
  message: string;
  metadata: Metadata;
  exams: Exam[];
}
export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}
export interface ExamApiRes {
  message: string;
  metadata: Metadata;
  exams: Exam[];
}

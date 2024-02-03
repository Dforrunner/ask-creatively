import { QuestionType } from './QuestionType';

export interface Question {
  questionType: QuestionType;
  email?: string;
  recipient?: string;
  sender?: string;
}

import { Question } from '../models/Question';

export const encodeQuestion = (obj: Question) => {
  const values = Object.values(obj)
    .filter((value) => !!value?.trim())
    .map((value) => encodeURIComponent(value))
    .join('?');

  return btoa(values);
};

export const decodeQuestion = (str: string): Question | undefined => {
  if (!str.trim()) return undefined;
  try {
    const decodeStr = atob(str);
    const [questionType, email, recipient, sender] = decodeStr
      .split('?')
      .map((value) => decodeURIComponent(value));
    const obj: Question = {
      questionType: questionType as Question['questionType'],
      email,
      recipient,
      sender,
    };
    return obj;
  } catch (error) {
    return undefined;
  }
};

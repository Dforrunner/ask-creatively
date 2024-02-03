'use client';

import { encodeQuestion } from './encode';
import { Question } from '@/models/Question';

export const generateLink = (question: Question): string => {
  if (typeof window === 'undefined') return '';

  const hash = encodeQuestion(question);
  const searchParams = new URLSearchParams({ id: hash });
  const url =
    window.location.protocol + '//' + window.location.host + `/q?${searchParams.toString()}`;
  return url;
};

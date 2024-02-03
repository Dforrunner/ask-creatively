'use client';

import ValentineQuestion from '@/components/ValentineQuestion';
import { decodeQuestion } from '@/lib/encode';
import { QuestionType } from '@/models/QuestionType';
import { useSearchParams } from 'next/navigation';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

function LoadAppWithUrlParams() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  console.log('id', id);
  const question = id && decodeQuestion(id);
  if (!question || !question.questionType) return redirect('/404');
  return (
    <>
      {question.questionType === QuestionType.Valentine ? (
        <ValentineQuestion question={question} />
      ) : null}
    </>
  );
}
export default function Page() {
  return (
    <div>
      <Suspense>
        <LoadAppWithUrlParams />
      </Suspense>
    </div>
  );
}

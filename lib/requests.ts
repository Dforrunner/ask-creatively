import { Question } from '@/models/Question';
import { QuestionResponse } from '@/models/QuestionResponse';

export async function sendQuestionResponse(question: Question, response: QuestionResponse) {
  if (!question.email) return;

  try {
    const res = await fetch(`/api/send-response`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        accepted: response.accepted,
        email: question.email,
        sender: question.sender,
        recipient: question.recipient,
      }),
    });

    return await res.json();
  } catch (error) {
    throw new Error('Failed to send response');
  }
}

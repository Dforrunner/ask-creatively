import { validateEmail } from '@/lib/validators';
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email-client';
import { Email } from '@/models/Email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, accepted, sender, recipient } = body;

    if (!email) {
      return NextResponse.json({ msg: 'Email is required' }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ msg: 'Please enter a valid email address' }, { status: 400 });
    }

    let html = '';

    if (accepted) {
      html = `
      <p>Hey ${sender ? sender : 'there'},</p>
      <p>I am so happy to accept your request to be your valentine. I can't wait to spend the day with you. 🥰🥰</p>
      <p>Love,</p>
      <p>${recipient ? recipient : 'Your Valentine'}</p>
      `;
    } else {
      html = `
      <p>Hey ${sender ? sender : 'there'},</p>
      <p>Thank you for your request to be your valentine. I am sorry but I am unable to accept your request at this time. 😔😔</p>
      <p>Love,</p>
      <p>${recipient ? recipient : 'Your Valentine'}</p>
      
      <p>Hey there friend. This is the developer of the app. You'll be alright. Rejection is just a part of life. Here are some tips to help you deal with them: </p>
      <strong><a href="https://www.betterup.com/blog/how-to-deal-with-rejection" target="_blank">7 Tips on How to deal with rejection</a></strong>
      `;
    }

    const mail: Email = {
      from: process.env.EMAIL_USER!,
      to: `${email}`,
      subject:
        `${accepted ? '💘' : '💔'} Response From Your Valentine` +
        (recipient ? ` - ${recipient}` : ''),
      html: html,
    };

    const res = await sendEmail(mail);

    if (process.env.EMAIL_USER!) {
      mail.to = process.env.EMAIL_USER;
      mail.html = mail.html + `<p>Recipient: ${email}</p>`;
      await sendEmail(mail);
    }

    if (res.error) {
      return NextResponse.json({ msg: 'Message not sent' }, { status: 500 });
    }

    return NextResponse.json({ msg: 'Message sent' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: 'Error' }, { status: 500 });
  }
}

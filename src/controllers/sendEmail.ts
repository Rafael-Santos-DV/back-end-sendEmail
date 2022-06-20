import { Request, Response } from 'express';
import Queue from '../lib/Queute';

class SendEmail {
  async execute(Request: Request, Response: Response) {
    const { username, email } = Request.body;

    if (!username && !email) {
      return Response.status(400).json({
        message: 'username and email is empty',
      });
    }

    Queue.add({ username, email });

    return Response.status(200).json({ username, email });
  }
}

export default new SendEmail();

import 'dotenv/config';
import sendEmail from './jobs/sendEmail';
import Queue from './lib/Queute';

Queue.process(sendEmail.handle);

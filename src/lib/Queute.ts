import Queue from 'bull';
import sendEmail from '../jobs/sendEmail';
import redis from '../configs/redis';

const mailQueue = new Queue(sendEmail.key, { redis });

export default mailQueue;

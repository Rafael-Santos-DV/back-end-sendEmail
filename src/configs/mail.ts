import nodemailer from 'nodemailer';
import 'dotenv/config';

export const transport = nodemailer.createTransport({
  port: Number(process.env.PORT_MAIL),
  auth: {
    user: process.env.USER || '',
    pass: process.env.PASS || '',
  },
  host: process.env.HOST,
});

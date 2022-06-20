import { Router } from 'express';
import sendEmail from '../controllers/sendEmail';

const Routes = Router();

Routes.post('/sendEmail', sendEmail.execute);

export default Routes;

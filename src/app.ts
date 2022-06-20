import Express from 'express';
import Routes from './routes/routes';
import Cors from 'cors';
import 'dotenv/config';

const app = Express();

app.use(Express.json());
app.use(Cors({ origin: '*' }));

app.use(Routes);

app.listen(3000, () => console.log('rodando na porta 3000'));

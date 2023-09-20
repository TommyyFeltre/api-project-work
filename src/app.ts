import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRouter from './api/routes';
import bodyParser from 'body-parser';
import { errorHandlers } from './errors';

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());

app.use('/api', apiRouter);
// app.use((req, res, next) => {
//   const clientIP = req.ip; // Questo restituirà l'indirizzo IP del client che ha effettuato la richiesta
//   console.log(`Indirizzo IP del client: ${clientIP}`);
//   next();
// });

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// app.use(errorHandlers);

export default app;
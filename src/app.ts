import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/users/student.route';
const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoutes.router);

app.get('/', (req: Request, res: Response) => {
  res.send('App is listening on port 5000');
});

export default app;

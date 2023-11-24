import express, { Application } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/users/student.route';
const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoutes.router);

export default app;

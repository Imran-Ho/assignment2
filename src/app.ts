import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { userRoutes } from './app/modules/user/user.route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/users', userRoutes);

const getController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getController);

export default app;

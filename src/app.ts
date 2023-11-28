import cors from 'cors';
import express, { Application } from 'express';
import { userRoutes } from './app/modules/user/user.route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('project number 2');
});

export default app;

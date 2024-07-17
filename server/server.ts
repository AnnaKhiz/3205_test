import path from 'path';
import express, { Express } from 'express';
import usersRouter from './routes/usersRouter';

const app: Express = express();
const PORT: number = 3000;

app.listen(PORT, (): void => {
  console.log(`Server is running on localhost:${PORT}`);
});

const jsonBodyParser = express.json();
app.use(jsonBodyParser);

app.use('/users', usersRouter);

const staticFileMiddleware = express.static(path.join(__dirname, '../'));

app.use(staticFileMiddleware);

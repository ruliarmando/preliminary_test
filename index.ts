import * as dotenv from 'dotenv';
dotenv.config();
import express, { ErrorRequestHandler } from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { Sequelize } from 'sequelize-typescript';
import { AggregateError } from 'sequelize';

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cors());

new Sequelize({
  database: process.env.DATABASE,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  dialect: 'mysql',
  models: [__dirname + '/models'],
});

import { User } from './models/User';
import { Job } from './models/Job';
import { UserJob } from './models/UserJob';

app.get('/api', (req, res) => res.send('Health Check'));

app.post('/api/jobs', async (req, res, next) => {
  try {
    await Job.bulkCreate(req.body, { validate: true, fields: ['name', 'dayOfWeek', 'start', 'end'] });
    return res.status(204).json();
  } catch (error) {
    next(error);
  }
});

app.post('/api/jobs/assign', async (req, res, next) => {
  const { userId, jobId } = req.body;
  try {
    await UserJob.create({ userId, jobId });
    return res.status(204).json();
  } catch (error) {
    next(error);
  }
});

app.post('/api/jobs/unassign', async (req, res, next) => {
  const { userId, jobId } = req.body;
  try {
    await UserJob.destroy({ where: { userId, jobId } });
    return res.status(204).json();
  } catch (error) {
    next(error);
  }
});

app.get('/api/jobs/common', async (req, res, next) => {
  try {
    const jobs = await Job.findAll({
      order: ['dayOfWeek'],
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] }
        }
      ],
    });
    return res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
});

const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (error instanceof AggregateError) {
    return res.status(422).json({ error: error.errors[0].message });
  }
  return res.status(500).json({ error: error.message });
};

app.use(errorHandler);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at: https://localhost:${PORT}`);
});

import express from 'express';
import { scrapeRouter } from './controllers/scrapeController';

const app = express();


app.use(express.json());

app.use('/api/v1', scrapeRouter);

app.use((err: any, req: any, res: any, next: any) => {
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

export default app;

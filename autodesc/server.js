// Minimal Express server for local testing (production: use serverless functions)
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import generateRouter from './api/generate.js';
import stripeRouter from './api/stripe_routes.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/generate', generateRouter);
app.use('/api/stripe', stripeRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));

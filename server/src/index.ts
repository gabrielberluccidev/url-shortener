import express from 'express';
import cors from 'cors';

import { urlRouter } from './routes/url.routes.js';
import { errorMiddleware } from './middleware/error/url.error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(urlRouter);
app.use(errorMiddleware);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

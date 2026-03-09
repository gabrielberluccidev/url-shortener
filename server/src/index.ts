import express, { type Request, type Response } from 'express';
import 'dotenv/config';
import { prisma } from '@lib/prisma.js';
import cors from 'cors';
import { nanoid } from 'nanoid';
import z, { ZodError } from 'zod';

import { urlSchema } from '@shared/index.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/url', async (req: Request, res: Response) => {
  try {
    const originalUrl = req.body['longUrl'] as string;

    urlSchema.parse(originalUrl);
    const shortUrl = `${process.env.BASE_URL}/${nanoid(8)}`;

    const newUrl = await prisma.url.create({
      data: {
        longUrl: originalUrl,
        shortUrl: shortUrl,
      },
    });

    res.status(201).send({
      message: 'URL shortened with success',
      data: {
        ...newUrl,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const flattened = z.flattenError(error);
      res.status(400).send({
        error: flattened.formErrors[0],
      });
    }
    res.status(500).send({
      message: error,
    });
  }
});

app.get('/:shortUrl', async (req: Request, res: Response) => {
  try {
    const { shortUrl } = req.params;

    const finalUrl = `${process.env.BASE_URL}/${shortUrl}`;

    const urlData = await prisma.url.findUnique({
      where: {
        shortUrl: finalUrl,
      },
    });

    if (!urlData) {
      res.status(404).send({
        message: `Short URL ${shortUrl} not founded`,
      });
      return;
    }

    res.redirect(urlData?.longUrl!);
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

import { prisma } from '@lib/prisma.js';
import { urlSchema } from '@shared/index.js';
import { type NextFunction, type Request, type Response } from 'express';
import { nanoid } from 'nanoid';
import { AppError } from 'src/error/Apperror.js';

export const createShortUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
    next(error);
  }
};

export const getShortUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { shortUrl } = req.params;

    const finalUrl = `${process.env.BASE_URL}/${shortUrl}`;

    const urlData = await prisma.url.findUnique({
      where: {
        shortUrl: finalUrl,
      },
    });

    if (!urlData) {
      throw new AppError(`Short URL ${shortUrl} not found`, 404);
    }

    res.redirect(urlData.longUrl);
  } catch (error) {
    next(error);
  }
};

import { Router } from 'express';
import { createShortUrl, getShortUrl } from '@controllers/url.controller.js';

export const urlRouter: Router = Router();

urlRouter.get('/:shortUrl', getShortUrl);
urlRouter.post('/api/url', createShortUrl);

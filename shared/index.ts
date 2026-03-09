// shared/index.ts
import { z } from 'zod';

export const urlSchema = z
  .string()
  .check((ctx) => {
    if (ctx.value.length < 5) {
      ctx.issues.push({
        code: 'too_small',
        minimum: 5,
        origin: 'string',
        inclusive: true,
        message: 'Please, insert a URL to shorten.',
        input: ctx.value,
      });
    }
  })
  .pipe(z.url('Please, insert a valid URL to shorten.').normalize());

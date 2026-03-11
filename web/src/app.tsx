import { ThemeProvider } from '@/components/theme-provider';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import {
  ArrowRight,
  CircleCheck,
  Copy,
  ExternalLink,
  Link,
  Loader2,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import axios from 'axios';
import z from 'zod';

import { urlSchema } from '@shared/zod-schemas';

export const App = () => {
  const [shortUrl, setShortUrl] = useState<string>('');
  const [longUrl, setLongUrl] = useState<string>('');
  const [invalid, setInvalid] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isWakingUp, setIsWakingUp] = useState<boolean>(false);

  const generateUrl = async () => {
    const timeoutId = setTimeout(() => {
      setIsWakingUp(true);
    }, 3000);

    try {
      setDisabled(true);
      urlSchema.parse(longUrl);

      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/url`, {
        longUrl: longUrl,
      });

      setShortUrl(res.data.data.shortUrl.trim().replace(/['"]/g, ''));
    } catch (error) {
      if (error instanceof z.ZodError) {
        const flattened = z.flattenError(error);
        const currentErrorMessage = flattened.formErrors[0];

        setInvalid(true);
        toast.error(currentErrorMessage);
      }
    } finally {
      clearTimeout(timeoutId);
      setDisabled(false);
      setIsWakingUp(false);
    }
  };

  const copyToClipBoard = () => {
    try {
      navigator.clipboard.writeText(shortUrl);

      toast.success('URL copied to clipboard.');
    } catch (error) {
      toast.error(
        'An error occurred while trying to copy the URL to the clipboard.',
      );
      console.log(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongUrl(e.target.value);
  };

  const openExternalLink = () => {
    window.open(shortUrl, '_blank');
  };

  return (
    <ThemeProvider>
      <main className="flex justify-center items-center h-dvh">
        <div className="w-200 p-8">
          <Card className="p-8">
            <CardHeader>
              <CardTitle className="text-4xl">URL Shortener</CardTitle>
              <CardDescription>
                Paste your long URL to create a Shortener URL
              </CardDescription>
              <Field className="mt-8" orientation="horizontal">
                <InputGroup>
                  <InputGroupInput
                    aria-invalid={invalid}
                    id="input-group-url"
                    placeholder="https://exemple.com/long-url"
                    onChange={handleInputChange}
                  />
                  <InputGroupAddon>
                    <Link />
                  </InputGroupAddon>
                </InputGroup>

                <Button disabled={disabled} onClick={generateUrl}>
                  {disabled ? (
                    <>
                      Shortening
                      <Loader2 />
                    </>
                  ) : (
                    <>
                      Short
                      <ArrowRight />
                    </>
                  )}
                </Button>
              </Field>
            </CardHeader>
            {isWakingUp && (
              <p className="pl-4">Server is waking up, please be patient.</p>
            )}
            <Separator />

            {shortUrl && (
              <>
                <CardContent>
                  <h3>Your shortened link</h3>
                </CardContent>

                <CardFooter className="bg-accent p-4 flex justify-between">
                  <div className="flex gap-2 items-center">
                    <CircleCheck className="text-emerald-500" />
                    <a className="text-blue-600" href={shortUrl}>
                      {shortUrl}
                    </a>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => copyToClipBoard()}
                      variant="outline"
                      size="icon"
                    >
                      <Copy />
                    </Button>
                    <Button
                      onClick={openExternalLink}
                      variant="outline"
                      size="icon"
                    >
                      <ExternalLink />
                    </Button>
                  </div>
                </CardFooter>
              </>
            )}
          </Card>
        </div>
      </main>

      <Toaster />
    </ThemeProvider>
  );
};

import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/ui/navbar';
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
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import axios from 'axios';

export const App = () => {
  const [shortUrl, setShortUrl] = useState('');
  const [sooner, setSooner] = useState<boolean>(false);
  const [longUrl, setLongUrl] = useState('');

  console.log(shortUrl);

  const generateUrl = async () => {
    try {
      const res = await axios.post(
        'https://url-shortener-j6h3.onrender.com/api/url',
        {
          longUrl: longUrl,
        },
      );
      setShortUrl(res.data.data.shortUrl.trim().replace(/['"]/g, ''));
    } catch (error) {
      console.error(error);
    }
  };

  const copyToClipBoard = () => {
    try {
      navigator.clipboard.writeText(shortUrl);
      setSooner(true);
      toast.success('URL copied to clipboard');
    } catch (error) {
      setSooner(true);
      toast.error(
        'An error occurred while trying to copy the URL to the clipboard.',
      );
      console.log(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongUrl(e.target.value);
  };

  const navigationData = [
    {
      title: 'URL',
      href: '#',
    },
    {
      title: 'Login',
      href: '#',
    },
    {
      title: 'About Us',
      href: '#',
    },
    {
      title: 'Contacts',
      href: '#',
    },
  ];

  console.log(longUrl);

  return (
    <ThemeProvider>
      <Navbar navigationData={navigationData} />

      <main className="flex justify-center mt-20">
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
                    id="input-group-url"
                    placeholder="https://exemple.com/long-url"
                    onChange={handleInputChange}
                  />
                  <InputGroupAddon>
                    <Link />
                  </InputGroupAddon>
                </InputGroup>

                <Button onClick={generateUrl}>
                  Short
                  <ArrowRight />
                </Button>
              </Field>
            </CardHeader>

            <Separator />

            {/*
              TODO: make a better validation than just a url.length > 1

              the goal is to make this part only render after the API req was
              successful
            
            */}
            {shortUrl.length > 1 && (
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
                    <Button variant="outline" size="icon">
                      <ExternalLink />
                    </Button>
                  </div>
                </CardFooter>
              </>
            )}
          </Card>
        </div>
      </main>

      {sooner && <Toaster />}
    </ThemeProvider>
  );
};

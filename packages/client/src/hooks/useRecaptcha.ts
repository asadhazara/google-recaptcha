import { useCallback } from 'react';

let isRecaptchaLoaded = false;

export const useRecaptcha = (action: string) => {
  const loadRecaptchaScript = useCallback(() => {
    const url = 'https://www.google.com/recaptcha/api.js';
    const script = document.createElement('script');

    script.src = `${url}?render=${process.env.RECAPTCHA_SITE_KEY}`;
    script.type = 'text/javascript';

    document.body.appendChild(script);
    isRecaptchaLoaded = true;
  }, []);

  const getToken = useCallback(async () => {
    if (typeof window.grecaptcha === 'undefined' && !isRecaptchaLoaded) loadRecaptchaScript();

    return new Promise<string>(resolve => {
      const interval = setInterval(() => {
        if (typeof window.grecaptcha === 'undefined') return;

        clearInterval(interval);

        window.grecaptcha.ready(() => {
          resolve(window.grecaptcha.execute(process.env.RECAPTCHA_SITE_KEY!, { action }));
        });
      }, 100);
    });
  }, [loadRecaptchaScript, action]);

  return { get: getToken };
};

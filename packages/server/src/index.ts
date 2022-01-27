import http from 'node:http';
import verifyRecaptchaToken from '#app/utils/verifyRecaptchaToken';

http
  .createServer(req => {
    const token = req.headers['x-recaptcha-token'] as string;
    const response = verifyRecaptchaToken(token);

    // handle request
  })
  .listen(3000);

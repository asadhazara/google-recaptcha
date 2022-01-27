const verifyRecaptchaToken = async (token: string, action?: string) => {
  const URL = `https://www.google.com/recaptcha/api/siteverify`;
  const fullURL = `${URL}?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;

  try {
    const response = await fetch(fullURL).then(res => res.json());
    if (action && response.success) return response.action === action;

    return response.success;
  } catch (err) {
    return false;
  }
};

export default verifyRecaptchaToken;

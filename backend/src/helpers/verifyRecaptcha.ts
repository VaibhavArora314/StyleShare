import axios from 'axios';

export const verifyRecaptcha = async (token: string, secretKey: string): Promise<boolean> => {
  const url = 'https://www.google.com/recaptcha/api/siteverify';
  try {
    const response = await axios.post(url, null, {
      params: {
        secret: process.env.RECAPTCHA_SECRET_KEY || "6LeG1PMpAAAAAB0zfbeqWMbAjtRYs1FgnPBojCFK",
        response: token,
      },
    });
    const data = response.data;
    if (data.success && data.score >= 0.5) {
      return true;
    }
    console.error('reCAPTCHA verification failed', data);
    return false;
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return false;
  }
};

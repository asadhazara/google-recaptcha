import { useRecaptcha } from 'hooks/useRecaptcha';
import { FormEvent } from 'react';

const Page = () => {
  const recaptcha = useRecaptcha('newsletter');

  const handleOnSumit = async (event: FormEvent) => {
    event.preventDefault();

    const token = await recaptcha.get();

    console.log(token);

    fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'x-recaptcha-token': token,
      },
    });
  };

  return (
    <form onSubmit={handleOnSumit}>
      <button>Submit</button>
    </form>
  );
};

export default Page;

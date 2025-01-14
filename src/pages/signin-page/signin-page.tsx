import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SigninForm from './signin-form.tsx';
import Header from './header.tsx';
import SignFooter from '../../components/sign-footer/sign-footer.tsx';

import { useSignInMutation } from '../../store/index.ts';
import useUser from '../../hooks/use-user.tsx';

import style from './signin-page.module.css';

export type FormPayload = Omit<User, 'id'>;

function SigninPage() {
  const navigate = useNavigate();
  const userData = useUser();
  const [signIn] = useSignInMutation();

  useEffect(() => {
    if (userData) {
      // eslint-disable-next-line no-console
      console.log('1');
      navigate('/');
    }
  });

  const onSubmit = async (data: FormPayload) => {
    await signIn(data);
  };

  return (
    <div className={style.layer}>
      <Header />
      <SigninForm onSubmit={onSubmit} />
      <SignFooter />
    </div>
  );
}

export default SigninPage;

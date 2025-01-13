import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SignupForm from './signup-form.tsx';
import Header from './header.tsx';
import SignFooter from '../../components/sign-footer/sign-footer.tsx';

import { useSignUpMutation } from '../../store/index.ts';
import useUser from '../../hooks/use-user.tsx';

import style from './signup-page.module.css';

export type FormPayload = Omit<User, 'id'>;

function SignupPage() {
  const navigate = useNavigate();
  const userData = useUser();
  const [signUp] = useSignUpMutation();

  useEffect(() => {
    if (userData) {
      navigate('/');
    }
  });

  const onSubmit = async (data: FormPayload) => {
    await signUp(data);
    navigate('/');
  };

  return (
    <div className={style.layer}>
      <Header />
      <SignupForm onSubmit={onSubmit} />
      <SignFooter />
    </div>
  );
}

export default SignupPage;

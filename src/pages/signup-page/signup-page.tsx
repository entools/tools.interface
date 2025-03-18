/* eslint-disable react-refresh/only-export-components */
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import SignupForm from './signup-form';
import Header from './header';
import SignFooter from '../../components/sign-footer/sign-footer';

import { useSignUpMutation } from '../../store/index';
import useUser from '../../hooks/use-user';
import withUser from '../../hocs/with-user';

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
    // navigate('/');
  };

  return (
    <div className="box">
      <div className={style.layer}>
        <Header />
        <SignupForm onSubmit={onSubmit} />
        <SignFooter />
      </div>
    </div>
  );
}

export default withUser(SignupPage, false);

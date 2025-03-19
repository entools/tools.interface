/* eslint-disable react-refresh/only-export-components */
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import SigninForm from './signin-form';
import Header from './header';
import SignFooter from '../../components/sign-footer/sign-footer';

import useUser from '../../hooks/use-user';
import withUser from '../../hocs/with-user';

import style from './signin-page.module.css';

export type FormPayload = Omit<User, 'id'>;

function SigninPage() {
  const navigate = useNavigate();
  const userData = useUser();

  useEffect(() => {
    if (userData) {
      console.log(userData);
      navigate('/');
    }
  });

  return (
    <div className="box">
      <div className={style.layer}>
        <Header />
        <SigninForm />
        <SignFooter />
      </div>
    </div>
  );
}

export default withUser(SigninPage, false);

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-refresh/only-export-components */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SigninForm from './signin-form.tsx';
import Header from './header.tsx';
import SignFooter from '../../components/sign-footer/sign-footer.tsx';

import useUser from '../../hooks/use-user.tsx';
import withUser from '../../hocs/with-user.tsx';

import style from './signin-page.module.css';

export type FormPayload = Omit<User, 'id'>;

function SigninPage() {
  const navigate = useNavigate();
  const userData = useUser();

  useEffect(() => {
    if (userData) {
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

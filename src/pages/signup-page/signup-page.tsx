/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from 'react-router-dom';

import SignupForm from './signup-form.tsx';

import style from './signup-page.module.css';

export type FormPayload = Omit<User, 'id'>;

function SignupPage() {
  return (
    <div className={style.layer}>
      <Link
        to="/signin"
        className={style.signin}
      >
        Signin
      </Link>
      <SignupForm />
      <ul className={style.links}>
        <li className={style.link}>link 1</li>
        <li className={style.link}>link 2</li>
      </ul>
    </div>
  );
}

export default SignupPage;

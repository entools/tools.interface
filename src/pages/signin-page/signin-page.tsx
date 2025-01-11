import { Link } from 'react-router-dom';

import SigninForm from './signin-form.tsx';

import style from './signin-page.module.css';

function SigninPage() {
  return (
    <div className={style.layer}>
      <Link
        to="/signup"
        className={style.signin}
      >
        Signup
      </Link>
      <SigninForm />
      <ul className={style.links}>
        <li className={style.link}>link 1</li>
        <li className={style.link}>link 2</li>
      </ul>
    </div>
  );
}

export default SigninPage;

import { Link } from 'react-router-dom';

import style from './signin-page.module.css';

function SigninPage() {
  return (
    <div className={style.layer}>
      <Link
        to="/signup"
        className={style.signup}
      >
        Signup
      </Link>
      <div className={style.container}>
        <h1>Signin</h1>
        <input
          className="input"
          placeholder="login"
        />
        <input
          className="input"
          placeholder="password"
        />
        <button
          type="button"
          className="button"
        >
          signin
        </button>
      </div>
      <ul className={style.links}>
        <li className={style.link}>link 1</li>
        <li className={style.link}>link 2</li>
      </ul>
    </div>
  );
}

export default SigninPage;

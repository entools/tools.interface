import { Link } from 'react-router-dom';

import style from './signup-page.module.css';

function SignupPage() {
  return (
    <div className={style.layer}>
      <Link
        to="/signin"
        className={style.signin}
      >
        Signin
      </Link>
      <div className={style.container}>
        <h1>Signup</h1>
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
          signup
        </button>
      </div>
      <ul className={style.links}>
        <li className={style.link}>link 1</li>
        <li className={style.link}>link 2</li>
      </ul>
    </div>
  );
}

export default SignupPage;

import style from './signup-page.module.css';

function SignupPage() {
  return (
    <div>
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
    </div>
  );
}

export default SignupPage;

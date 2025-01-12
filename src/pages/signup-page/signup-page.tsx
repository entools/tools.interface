import SignupForm from './signup-form.tsx';
import Header from './header.tsx';
import SignFooter from '../../components/sign-footer/sign-footer.tsx';

import style from './signup-page.module.css';

export type FormPayload = Omit<User, 'id'>;

function SignupPage() {
  return (
    <div className={style.layer}>
      <Header />
      <SignupForm />
      <SignFooter />
    </div>
  );
}

export default SignupPage;

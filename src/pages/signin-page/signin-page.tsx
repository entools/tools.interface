import SigninForm from './signin-form.tsx';
import Header from './header.tsx';
import SignFooter from '../../components/sign-footer/sign-footer.tsx';

import style from './signin-page.module.css';

function SigninPage() {
  return (
    <div className={style.layer}>
      <Header />
      <SigninForm />
      <SignFooter />
    </div>
  );
}

export default SigninPage;

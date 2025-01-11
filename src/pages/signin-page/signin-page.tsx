import SigninForm from './signin-form.tsx';
import Header from './header.tsx';
import Footer from '../signup-page/footer.tsx';

import style from './signin-page.module.css';

function SigninPage() {
  return (
    <div className={style.layer}>
      <Header />
      <SigninForm />
      <Footer />
    </div>
  );
}

export default SigninPage;

import SignupForm from './signup-form.tsx';
import Header from './header.tsx';
import Footer from './footer.tsx';

import style from './signup-page.module.css';

export type FormPayload = Omit<User, 'id'>;

function SignupPage() {
  return (
    <div className={style.layer}>
      <Header />
      <SignupForm />
      <Footer />
    </div>
  );
}

export default SignupPage;

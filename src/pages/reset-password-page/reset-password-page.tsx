import ResetPasswordForm from './reset-password-form.tsx';
import SignFooter from '../../components/sign-footer/sign-footer.tsx';

import style from './reset-password-page.module.css';

export type FormPayload = Omit<User, 'id'>;

function ResetPasswordPage() {
  const onSubmit = () => {};

  return (
    <div className={style.layer}>
      <ResetPasswordForm onSubmit={onSubmit} />
      <SignFooter />
    </div>
  );
}

export default ResetPasswordPage;

import ResetPasswordForm from './reset-password-form';
import SignFooter from '../../components/sign-footer/sign-footer';

import style from './reset-password-page.module.css';

export type FormPayload = Omit<User, 'id'>;

function ResetPasswordPage() {
  const onSubmit = () => {};

  return (
    <div className="box">
      <div className={style.layer}>
        <ResetPasswordForm onSubmit={onSubmit} />
        <SignFooter />
      </div>
    </div>
  );
}

export default ResetPasswordPage;

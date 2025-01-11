/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames';

import Header from './header.tsx';
import InputField from '../../components/input-field/input-field.tsx';

import style from './reset-password-page.module.css';

export type FormPayload = Omit<User, 'id'>;

const inputs = [
  {
    name: 'email',
    label: 'Email',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Email is invalid',
    },
    required: true,
    autoComplete: 'email',
  },
];

function ResetPasswordPage() {
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Header />
      <h1>Reset password</h1>
      {inputs.map((input) => (
        <Controller
          key={input.name}
          name={input.name as keyof FormPayload}
          rules={{
            pattern: input.pattern,
            required: input.required,
          }}
          control={control}
          render={({ field, fieldState }) => (
            <InputField
              {...field}
              {...input}
              errorText={fieldState.error?.message}
            />
          )}
        />
      ))}
      <button
        type="button"
        className={classNames('button', style.button)}
      >
        Сбросить
      </button>
    </form>
  );
}

export default ResetPasswordPage;

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames';

import InputField from '../../components/input-field/input-field.tsx';

import style from './signup-page.module.css';

export type FormPayload = Omit<User, 'id'>;

const inputs = [
  {
    name: 'username',
    label: 'Username',
    pattern: {
      value: /^[a-z0-9_-]{3,15}$/,
      message: 'Username',
    },
    required: true,
    autoComplete: 'username',
  },
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
  {
    name: 'password',
    label: 'Password',
    pattern: {
      value: /^[a-zA-Z0-9_-]{3,15}$/,
      message: 'Password is invalid',
    },
    required: true,
    type: 'password',
    autoComplete: 'new-password',
  },
  {
    name: 'firstName',
    label: 'First name',
    pattern: {
      value: /^[a-zA-Zа-яА-ЯёЁ-]{3,15}$/,
      message: 'First name is invalid',
    },
    required: true,
    autoComplete: 'first-name',
  },
  {
    name: 'lastName',
    label: 'Last name',
    pattern: {
      value: /^[a-zA-Zа-яА-ЯёЁ-]{3,15}$/,
      message: 'Last name is invalid',
    },
    required: true,
    autoComplete: 'last-name',
  },
];

export default function SignupForm({ onSubmit }: { onSubmit: (data: FormPayload) => void }) {
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
    },
  });

  return (
    <form
      className={style.container}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className={style.name}>Регистрация</h1>
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
        type="submit"
        className={classNames('button', style.button)}
      >
        Зарегистрироваться
      </button>
    </form>
  );
}

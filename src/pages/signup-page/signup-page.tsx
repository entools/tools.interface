/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

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
    name: 'first_name',
    label: 'First name',
    pattern: {
      value: /^[a-zA-Zа-яА-ЯёЁ-]{3,15}$/,
      message: 'First name is invalid',
    },
    required: true,
    autoComplete: 'first-name',
  },
  {
    name: 'last_name',
    label: 'Last name',
    pattern: {
      value: /^[a-zA-Zа-яА-ЯёЁ-]{3,15}$/,
      message: 'Last name is invalid',
    },
    required: true,
    autoComplete: 'last-name',
  },
];

function SignupPage() {
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
    },
  });
  const onSubmit = () => {};

  return (
    <div className={style.layer}>
      <Link
        to="/signin"
        className={style.signin}
      >
        Signin
      </Link>
      <form
        className={style.container}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>Signup</h1>
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
          className="button"
        >
          signup
        </button>
      </form>
      <ul className={style.links}>
        <li className={style.link}>link 1</li>
        <li className={style.link}>link 2</li>
      </ul>
    </div>
  );
}

export default SignupPage;

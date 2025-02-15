/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
// import classNames from 'classnames';

import { Button, TextInput, Text } from '@gravity-ui/uikit';

import Alert from '../../components/alert/alert.tsx';

import { useSignInMutation } from '../../store/index.ts';

import style from './signin-page.module.css';

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
  {
    name: 'password',
    label: 'Password',
    pattern: {
      value: /^[a-zA-Z0-9_-]{3,15}$/,
      message: 'Password is invalid',
    },
    required: true,
    // type: 'password',
    autoComplete: 'new-password',
  },
];

export default function SigninForm() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit(async (formData: FormPayload) => {
    setErr(false);
    const res = await signIn(formData);

    if ('error' in res) {
      setErr(true);
    } else {
      navigate('/');
    }
  });

  return (
    <form
      className={style.container}
      onSubmit={onSubmit}
    >
      <Text variant="header-2">Вход</Text>
      {err && <Alert message="Неизвестное сочетание email и пароля" />}
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
            <TextInput
              {...field}
              {...input}
              type={input.name === 'password' ? 'password' : 'text'}
              size="xl"
              className={style.xl}
              error={fieldState.error?.message}
            />
          )}
        />
      ))}
      <Button
        type="submit"
        view="normal"
        pin="round-round"
        size="xl"
        className={style.xl}
      >
        Войти
      </Button>
    </form>
  );
}

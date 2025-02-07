/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import { Controller, useForm } from 'react-hook-form';
import { TextInput, Button } from '@gravity-ui/uikit';
// import classNames from 'classnames';

import Header from './header.tsx';
// import InputField from '../../components/input-field/input-field.tsx';

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

export default function ResetPasswordForm({ onSubmit }: { onSubmit: (data: FormPayload) => void }) {
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: {
      email: '',
    },
  });

  return (
    <form
      className={style.container}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Header />
      <h1 className={style.name}>Сбросить пароль</h1>
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
              size="xl"
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
      >
        Сбросить
      </Button>
    </form>
  );
}

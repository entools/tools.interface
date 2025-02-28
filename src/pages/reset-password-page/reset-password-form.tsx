/* eslint-disable react/jsx-props-no-spreading */
import { Controller, useForm } from 'react-hook-form';
import { TextInput, Button, Text } from '@gravity-ui/uikit';

import Header from './header';

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
      <Text variant="display-1">Сбросить пароль</Text>
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

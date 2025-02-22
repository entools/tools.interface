/* eslint-disable react/jsx-props-no-spreading */
import { Controller, useForm } from 'react-hook-form';
import { Avatar, Button, TextInput } from '@gravity-ui/uikit';

import useUser from '../../hooks/use-user';

import style from './profile-page.module.css';

export type FormPayload = Omit<User, 'id'>;

const inputs = [
  // {
  //   name: 'username',
  //   label: 'Username',
  //   pattern: {
  //     value: /^[a-z0-9_-]{3,15}$/,
  //     message: 'Username',
  //   },
  //   required: true,
  //   autoComplete: 'username',
  // },
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

export default function ProfileForm({ onSubmit }: { onSubmit: (data: FormPayload) => void }) {
  const { email, firstName, lastName } = useUser()!;
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: {
      email: email || '',
      firstName: firstName || '',
      lastName: lastName || '',
      password: '',
    },
  });

  return (
    <form
      className={style.account}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={style.avatar}>

        <Avatar imgUrl="https://loremflickr.com/640/480/cats?lock=8610182282084352" size="xl" />
        <TextInput
          name="status"
          label="status"
          size="l"
        />
      </div>

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
              size="l"
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
        size="l"
        className={style.xl}
      >
        Сохранить
      </Button>
    </form>
  );
}

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames';

import InputField from '../../components/input-field/input-field.tsx';

import style from './profile-page.module.css';

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
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <form
      className={style.account}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={style.avatar}>
        <div className={style.picture}>U</div>
        <input
          className={classNames('input', style.status)}
          placeholder="status"
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
        Сохранить
      </button>
    </form>
  );
}

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button, TextInput, Select,
} from '@gravity-ui/uikit';

import { useTheme } from '../../hooks/use-dark-theme';
import { useSignOutMutation, useUpdateUserSettingsMutation } from '../../store/index';
import useUser from '../../hooks/use-user';

import style from './profile-page.module.css';

export type FormPayload = { profileSettings: string; };

const inputs = [
  {
    name: 'profileSettings',
    label: 'ProfileSettings',
    pattern: {
      value: /^[a-zA-Zа-яА-ЯёЁ-]{3,15}$/,
      message: 'ProfileSettings',
    },
    required: true,
    autoComplete: 'profileSettings',
  },
];

const options = [
  { value: 'system', content: 'system' },
  { value: 'dark', content: 'dark' },
  { value: 'light', content: 'light' },
];

export default function ProfileSettings() {
  const { theme, setTheme } = useTheme();
  const [notification, setNotification] = useState(true);
  const [signOut] = useSignOutMutation();
  const { profileSettings } = useUser()!;
  const [updateUserSettings] = useUpdateUserSettingsMutation();

  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: {
      profileSettings: profileSettings || '',
    },
  });

  const onSubmit = async (data: FormPayload) => {
    await updateUserSettings(data);
  };

  const onLogout = async () => {
    await signOut();
  };

  const onSet = (v: string[]) => {
    const [value] = v as 'dark'[] | 'light'[] | 'system'[];
    setTheme(value);
  };

  useEffect(() => {
    if (theme) {
      setTheme(theme);
    }
  }, [theme]);

  return (
    <div className={style.settings}>
      <div className={style.theme}>
        theme
        <div className={style.select}>
          <Select
            name="theme"
            size="l"
            width="max"
            options={options}
            onUpdate={onSet}
            defaultValue={[theme]}
          />
        </div>
      </div>

      <div className={style.notification}>
        <div className={style.block}>
          notification
          <Button
            view="normal"
            pin="round-round"
            size="l"
            onClick={() => setNotification(!notification)}
          >
            {`${notification ? 'on' : 'off'}`}
          </Button>
        </div>
        <form
          className={style.account}
          onSubmit={handleSubmit(onSubmit)}
        >
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
      </div>

      <div className={style.base}>
        base
        <Button
          view="normal"
          pin="round-round"
          size="l"
          onClick={onLogout}
        >
          Выйти
        </Button>
      </div>
    </div>
  );
}

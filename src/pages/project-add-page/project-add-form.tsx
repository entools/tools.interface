/* eslint-disable react/jsx-props-no-spreading */
import { Button, TextInput } from '@gravity-ui/uikit';
import { Controller, useForm } from 'react-hook-form';

import style from './project-add-page.module.css';

export type FormPayload = Omit<ProjectType, 'id'>;

const inputs = [
  {
    name: 'name',
    label: 'Name',
    pattern: {
      value: /^[a-z0-9_-]{3,15}$/,
      message: 'Name is invalid',
    },
    required: true,
    autoComplete: 'name',
  },
  {
    name: 'description',
    label: 'Details',
    pattern: {
      value: /^[a-z0-9_-]{3,15}$/,
      message: 'Details is invalid',
    },
    required: true,
    autoComplete: 'description',
  },
  // {
  //   name: 'tag',
  //   label: 'Tag',
  //   pattern: {
  //     value: /^[a-z0-9_-]{3,15}$/,
  //     message: 'Tag is invalid',
  //   },
  //   required: true,
  //   autoComplete: 'tag',
  // },
];

export default function ProjectAddForm({ onSubmit }
  : { onSubmit: (data: FormPayload) => void }) {
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: { name: '', description: '' },
  });

  return (
    <form
      className={style.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={style.main}>
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
                type="text"
                error={fieldState.error?.message}
              />
            )}
          />
        ))}
        <Button
          type="submit"
          size="l"
          view="normal"
          pin="round-round"
          className={style.xl}
        >
          Сохранить
        </Button>
      </div>
    </form>
  );
}

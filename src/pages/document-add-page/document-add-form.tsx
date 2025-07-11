/* eslint-disable react/jsx-props-no-spreading */
import { Button, TextInput } from '@gravity-ui/uikit';
import { Controller, useForm } from 'react-hook-form';

import style from './document-add-page.module.css';

type FormPayload = { name: string; documentType: string };

const inputs = [
  {
    name: 'name',
    label: 'Name',
    pattern: {
      value: /^[A-Za-zА-Яа-я0-9., -]{3,50}$/,
      message: 'Name is invalid',
    },
    required: true,
    autoComplete: 'name',
  },
  {
    name: 'documentType',
    label: 'Type',
    pattern: {
      value: /^[A-Za-zА-Яа-я0-9., -]{1,50}$/,
      message: 'Type is invalid',
    },
    required: true,
    autoComplete: 'documentType',
  },
];

export default function ProjectForm(
  { onSubmit, isLoading }
  : {
    onSubmit: (data: FormPayload) => void;
    isLoading: boolean;
    project: ProjectType | null;
  },
) {
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: { name: '', documentType: '' },
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
          loading={isLoading}
        >
          Сохранить
        </Button>
      </div>
    </form>
  );
}

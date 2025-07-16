/* eslint-disable react/jsx-props-no-spreading */
import { Button, Select, TextInput } from '@gravity-ui/uikit';
import { Controller, useForm } from 'react-hook-form';

import { documentTypesSelector, useGetDocumentTypesMutation } from '~/store';
import style from './document-add-page.module.css';
import { useAppSelector } from '~/hooks';

type FormPayload = { name: string; documentType: string[] };

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
];

export default function ProjectForm(
  { onSubmit, isLoading }
  : {
    onSubmit: (data: FormPayload) => void;
    isLoading: boolean;
    project: ProjectType | null;
  },
) {
  const documentTypes = useAppSelector(documentTypesSelector);
  const [getDocumentTypes, { isLoading: documentTypeLoading }] = useGetDocumentTypesMutation();
  const {
    control, handleSubmit, register,
  } = useForm<FormPayload>({
    defaultValues: { name: '', documentType: [] },
  });

  const handleDocumentTypeChange = async (open: boolean) => {
    if (open) {
      await getDocumentTypes();
    }
  };

  return (
    <form
      className={style.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={style.main}>
        {inputs.map((input) => (
          <Controller
            key={input.name}
            name={input.name as keyof Omit<FormPayload, 'documentType'>}
            rules={{
              pattern: input.pattern,
              required: input.required,
            }}
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                {...input}
                className={style.xl}
                size="l"
                type="text"
                error={fieldState.error?.message}
              />
            )}
          />
        ))}
        <Controller
          key="documentType"
          name="documentType"
          rules={{
            pattern: {
              value: /^[0-9., -]{1,50}$/,
              message: 'Name is invalid',
            },
            required: true,
          }}
          control={control}
          render={({ field }) => (
            <Select
              label="Type"
              size="l"
              width="max"
              multiple={false}
              // eslint-disable-next-line max-len
              options={documentTypes.map(({ id, name }) => ({ id, value: id.toString(), content: name }))}
              loading={documentTypeLoading}
              onOpenChange={handleDocumentTypeChange}
              {...register}
              {...field}
              onUpdate={field.onChange}
              value={field.value}
              // errorMessage={errors.documentType?.message}
            />
          )}
        />
        <Button
          type="submit"
          size="l"
          view="normal"
          pin="round-round"
          className={style.xl}
          loading={isLoading}
          // disabled={}
        >
          Сохранить
        </Button>
      </div>
    </form>
  );
}

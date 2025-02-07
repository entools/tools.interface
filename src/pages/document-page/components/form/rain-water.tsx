/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import { useForm, Controller } from 'react-hook-form';
// import classNames from 'classnames';

import { Button, TextInput } from '@gravity-ui/uikit';
// import InputField from '../../../../components/input-field/input-field.tsx';

import style from './rain-water.module.css';

type FormPayload = {
  roof: string;
  pavements: string;
  tracks: string;
  ground: string;
  cobblestone: string;
  stone: string;
  lawns: string;
  place: string;
  intensity: string;
  condition: string;
  // koef: number;
  timeInit: string;
  lengthPipe: string;
  lengthTray: string;
  velocityPipe: string;
  velocityTray: string;
  flow: string;
};

const inputs = [
  {
    name: 'roof',
    label: 'Кровля зданий и сооружений, асфальтобетонные покрытия дорог',
    pattern: {
      value: /^[0-9.,]{1,15}$/,
      message: 'Roof is invalid',
    },
    required: true,
    autoComplete: 'roof',
  },
  {
    name: 'pavements',
    label: 'Брусчатые мостовые и черные щебеночные покрытия дорог',
    pattern: {
      value: /^[a-z0-9_-]{1,15}$/,
      message: 'Pavements is invalid',
    },
    required: true,
    autoComplete: 'pavements',
  },
  {
    name: 'tracks',
    label: 'Гравийные садово-парковые дорожки',
    pattern: {
      value: /^[a-z0-9_-]{1,15}$/,
      message: 'Tracks is invalid',
    },
    required: true,
    autoComplete: 'tracks',
  },
  {
    name: 'ground',
    label: 'Грунтовые поверхности(спланированные)',
    pattern: {
      value: /^[a-z0-9_-]{1,15}$/,
      message: 'Ground is invalid',
    },
    required: true,
    autoComplete: 'ground',
  },
  {
    name: 'cobblestone',
    label: 'Булыжные мостовые',
    pattern: {
      value: /^[a-z0-9_-]{1,15}$/,
      message: 'Cobblestone is invalid',
    },
    required: true,
    autoComplete: 'cobblestone',
  },
  {
    name: 'stone',
    label: 'Щебеночные покрытия, не обработанные вяжущими',
    pattern: {
      value: /^[a-z0-9_-]{1,15}$/,
      message: 'Stone is invalid',
    },
    required: true,
    autoComplete: 'stone',
  },
  {
    name: 'lawns',
    label: 'Газоны',
    pattern: {
      value: /^[a-z0-9_-]{1,15}$/,
      message: 'Lawns is invalid',
    },
    required: true,
    autoComplete: 'lawns',
  },
  {
    name: 'intensity',
    label: 'Интенсивность дождя, л/с',
    pattern: {
      value: /^[a-z0-9_-]{1,15}$/,
      message: 'Intensity is invalid',
    },
    required: true,
    autoComplete: 'intensity',
  },
  {
    name: 'timeInit',
    label: 'Время поверхностной концентрации стока, мин',
    pattern: {
      value: /^[a-z0-9_-]{1,15}$/,
      message: 'T is invalid',
    },
    required: true,
    autoComplete: 'timeInit',
  },
  {
    name: 'lengthPipe',
    label: 'Длина трубы',
    pattern: {
      value: /^[a-z0-9_-]{1,15}$/,
      message: 'Length pipe is invalid',
    },
    required: true,
    autoComplete: 'lengthPipe',
  },
  {
    name: 'lengthTray',
    label: 'Длина лотка',
    pattern: {
      value: /^[a-z0-9_-]{1,15}$/,
      message: 'Length tray is invalid',
    },
    required: true,
    autoComplete: 'lengthTray',
  },
  {
    name: 'velocityPipe',
    label: 'Скорость',
    pattern: {
      value: /^[a-z0-9_-]{1,15}$/,
      message: 'Velocity pipe is invalid',
    },
    required: true,
    autoComplete: 'velocityPipe',
  },
  {
    name: 'velocityTray',
    label: 'Скорость',
    pattern: {
      value: /^[a-z0-9_-]{1,15}$/,
      message: 'Velocity tray is invalid',
    },
    required: true,
    autoComplete: 'velocityTray',
  },
];

export default function RainWaterForm({ data, setData, onClose }: {
  data: Record<string, string>; setData: (d: Record<string, string>) => void; onClose: () => void;
}) {
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: { ...data },
  });

  const onSubmit = handleSubmit(async (d: Record<string, string>) => {
    setData(d);
    onClose();
  });

  return (
    <form
      className={style.form}
      onSubmit={onSubmit}
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
      >
        Сохранить
      </Button>
    </form>
  );
}

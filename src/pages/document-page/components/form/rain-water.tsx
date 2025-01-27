/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import { useForm, Controller } from 'react-hook-form';
import classNames from 'classnames';

import InputField from '../../../../components/input-field/input-field.tsx';

import style from './rain-water.module.css';

type FormPayload = {
  roof: number;
  pavements: number;
  tracks: number;
  ground: number;
  cobblestone: number;
  stone: number;
  lawns: number;
  place: number;
  intensity: number;
  condition: number;
  // koef: number;
  timeInit: number;
  lengthPipe: number;
  lengthTray: number;
  velocityPipe: number;
  velocityTray: number;
  flow: number;
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
  // {
  //   name: 'koef',
  //   label: 'Поправочный коэффициент',
  //   pattern: {
  //     value: /^[a-z0-9_-]{1,15}$/,
  //     message: 'Koef is invalid',
  //   },
  //   required: true,
  //   autoComplete: 'koef',
  // },
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
  data: Record<string, number>; setData: (d: Record<string, number>) => void; onClose: () => void;
}) {
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: { ...data },
  });

  const onSubmit = handleSubmit(async (d: Record<string, number | string>) => {
    const res: Record<string, number> = {};
    Object.keys(d).forEach((key) => {
      res[key] = (typeof d[key] === 'string') ? Number(d[key].replace(',', '.')) : d[key];
    });
    setData(res);
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
            <InputField
              {...field}
              {...input}
              className="input"
              errorText={fieldState.error?.message}
            />
          )}
        />
      ))}
      <button
        className={classNames('button', style.button)}
        type="submit"
        title="Сохранить изменения"
      >
        Сохранить
      </button>
    </form>
  );
}

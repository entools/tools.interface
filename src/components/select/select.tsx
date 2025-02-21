/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
import Select, {
  type DropdownIndicatorProps, components,
} from 'react-select';
import classNames from 'classnames';
import { IoIosArrowDown } from 'react-icons/io';

import style from './select.module.css';

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

function Placeholder(props: any) {
  return <components.Placeholder {...props} />;
}

const DropdownIndicator: React.FC<DropdownIndicatorProps> = (props) => (
  <components.DropdownIndicator {...props}>
    <IoIosArrowDown size={14} />
  </components.DropdownIndicator>
);

export function CustomSelect({
  options, name, extraClass, action, value,
}:
  {
    options: { value: string; label: string; }[];
    name: string;
    extraClass?: { marginLeft: string; };
    action: (o: { value: string; label: string; }) => void;
    value: { value: string; label: string; } | null;
  }) {
  const onChange = (
    newValue: unknown,
    // actionMeta: ActionMeta<ColourOption>,
  ) => {
    action(newValue as { value: string; label: string; });
  };
  return (
    <Select
      className={classNames('basic-single', style.full)}
      classNamePrefix="select"
      components={{ Placeholder, DropdownIndicator }}
      defaultValue={options[0]}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          minHeight: 20,
          border: 0,
          ...extraClass,
        }),
        option: (styles) => ({
          ...styles,
          color: '#ccc',
          borderRadius: 8,
        }),
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 8,
        padding: 0,
        colors: {
          ...theme.colors,
          primary25: '#757575',
          primary: '#616161',
        },
      })}
      name={name}
      options={options}
      value={value}
      onChange={onChange}
    />
  );
}

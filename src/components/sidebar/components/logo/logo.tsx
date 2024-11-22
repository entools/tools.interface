/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
import { NavLink } from 'react-router-dom';
import Select, { type DropdownIndicatorProps, components } from 'react-select';
import classNames from 'classnames';
import { IoIosAdd, IoIosArrowDown, IoMdHome } from 'react-icons/io';

import style from './logo.module.css';

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const Placeholder = (props: any) => <components.Placeholder {...props} />;

const DropdownIndicator: React.FC<DropdownIndicatorProps> = (props) => (
  <components.DropdownIndicator {...props}>
    <IoIosArrowDown size={14} />
  </components.DropdownIndicator>
);

export default function Logo({ sidebarWidth }: { sidebarWidth: number; }) {
  return (
    <div className={classNames(style.header, { [style.small]: sidebarWidth < 100 })}>
      <div className={style.logo}>
        <NavLink to="/" className={style.home}>
          <IoMdHome />
        </NavLink>

        {sidebarWidth >= 178 && (
          <>
            <Select
              className={classNames('basic-single', style.full)}
              classNamePrefix="select"
              components={{ Placeholder, DropdownIndicator }}
              defaultValue={options[0]}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  minHeight: 20,
                  marginLeft: '8px',
                  border: 0,
                }),
                option: (styles) => ({ ...styles, color: '#ccc' }),
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
              name="name"
              options={options}
            />
            <NavLink to="/projects/add" className={style.icon}>
              <IoIosAdd />
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

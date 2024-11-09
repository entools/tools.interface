/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { NavLink } from 'react-router-dom';
import Select, { type DropdownIndicatorProps, components } from 'react-select';
import classNames from 'classnames';
import { IoIosAdd, IoIosArrowDown, IoMdHome } from 'react-icons/io';

import style from './logo.module.css';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const Placeholder = (props: any) => <components.Placeholder {...props} />;

// added type if using typescript
const DropdownIndicator: React.FC<DropdownIndicatorProps> = (props) => (
  <components.DropdownIndicator {...props}>
    <IoIosArrowDown />
  </components.DropdownIndicator>
);

export default function Logo({ sidebarWidth }: { sidebarWidth: number; }) {
  return (
    <div className={classNames(style.header, { [style.small]: sidebarWidth < 100 })}>
      <div className={style.logo}>
        <NavLink to="/" className={style.home}>
          <IoMdHome />
          {/* {sidebarWidth} */}
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
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 8,
                padding: 0,
                colors: {
                  ...theme.colors,
                  primary25: 'hotpink',
                  primary: 'black',
                },
              })}
              name="name"
              options={options}
            />
            <button type="button" className={style.icon}>
              <IoIosAdd />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

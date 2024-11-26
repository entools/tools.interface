/* eslint-disable no-console */
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { IoIosAdd, IoMdHome } from 'react-icons/io';

import { CustomSelect as Select } from '../../../select/select.tsx';

import style from './logo.module.css';

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

type SelectType = { value: string; label: string; };

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default function Logo({ sidebarWidth }: { sidebarWidth: number; }) {
  const [project, setProject] = useState<SelectType | null>(null);
  console.log(project);
  return (
    <div className={classNames(style.header, { [style.small]: sidebarWidth < 100 })}>
      <div className={style.logo}>
        <NavLink to="/" className={style.home}>
          <IoMdHome />
        </NavLink>

        {sidebarWidth >= 178 && (
          <>
            <Select
              name="project"
              options={options}
              extraClass={{ marginLeft: '8px' }}
              action={setProject}
              value={project}
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

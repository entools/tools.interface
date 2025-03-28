/* eslint-disable no-console */
import { useState } from 'react';
import { NavLink } from 'react-router';

import { Select, Icon } from '@gravity-ui/uikit';
import { House, Plus } from '@gravity-ui/icons';

import classNames from 'classnames';

import style from './logo.module.css';

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

type SelectType = { value: string; content: string; };

const options = [
  { value: 'chocolate', content: 'Chocolate' },
  { value: 'strawberry', content: 'Strawberry' },
  { value: 'vanilla', content: 'Vanilla' },
];

export default function Logo({ sidebarWidth }: { sidebarWidth: number; }) {
  const [project, setProject] = useState<SelectType>(options[0]);
  const onChange = (v: string[]) => {
    const current = options.find((x) => x.value === v[0]);
    setProject(current || options[0]);
  };

  return (
    <div className={classNames(style.header, { [style.small]: sidebarWidth < 100 })}>
      <div className={style.logo}>
        <NavLink to="/" className={style.home}>
          <Icon data={House} size={20} />
        </NavLink>
        {sidebarWidth >= 178 && (
          <>
            <Select
              name="project"
              size="l"
              width="max"
              options={options}
              onUpdate={onChange}
              defaultValue={[project?.value]}
            />
            <NavLink to="/projects/add" className={style.icon}>
              <Icon data={Plus} size={20} />
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

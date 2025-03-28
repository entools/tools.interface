import { NavLink } from 'react-router';

import {
  Popover, Avatar, Icon, Text,
} from '@gravity-ui/uikit';
import { BellDot } from '@gravity-ui/icons';

import classNames from 'classnames';

import style from './profile.module.css';

export default function Profile({ sidebarWidth }: { sidebarWidth: number; }) {
  return (
    <div className={classNames(style.profile, { [style.column]: sidebarWidth < 148 })}>
      <NavLink to="/profile" className={style.block}>
        <Avatar imgUrl="https://loremflickr.com/640/480/cats?lock=8610182282084352" size="m" />
        {sidebarWidth >= 148 && (
          <Text variant="subheader-2" className={style.name}>
            Profile
          </Text>
        )}
      </NavLink>
      <div className={style.notification}>
        <Popover offset={{ mainAxis: 10, crossAxis: 10 }} content={<div>123</div>}>
          <Icon data={BellDot} size={20} />
        </Popover>
      </div>
    </div>
  );
}

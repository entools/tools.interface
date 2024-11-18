/* eslint-disable import/no-extraneous-dependencies */
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Popup from 'reactjs-popup';
import { IoMdNotifications, IoMdPerson } from 'react-icons/io';

import style from './profile.module.css';

export default function Profile({ sidebarWidth }: { sidebarWidth: number; }) {
  return (
    <div className={classNames(style.profile, { [style.column]: sidebarWidth < 148 })}>
      <NavLink to="/profile" className={style.block}>
        <div className={style.pic}>
          <IoMdPerson />
        </div>
        {sidebarWidth >= 148 && (
          <div className={style.name}>
            Profile
          </div>
        )}
      </NavLink>
      <div className={style.notification}>
        <Popup
          trigger={(
            <div className={style.btncontainer}>
              <IoMdNotifications />
            </div>
          )}
          position={['right top', 'top right']}
          contentStyle={{
            backgroundColor: '#ffffff',
            textAlign: 'center',
            border: '0',
            borderRadius: '8px',
          }}
          closeOnDocumentClick
          arrow={false}
        >
          <div className={style.popovercontent}>popup</div>
        </Popup>
      </div>
    </div>
  );
}

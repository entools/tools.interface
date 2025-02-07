/* eslint-disable import/no-extraneous-dependencies */
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Popup from 'reactjs-popup';
import { Avatar } from '@gravity-ui/uikit';
import { IoMdNotifications } from 'react-icons/io';

import style from './profile.module.css';

export default function Profile({ sidebarWidth }: { sidebarWidth: number; }) {
  return (
    <div className={classNames(style.profile, { [style.column]: sidebarWidth < 148 })}>
      <NavLink to="/profile" className={style.block}>
        {/* <div className={style.pic}> */}
        {/* <IoMdPerson /> */}
        <Avatar imgUrl="https://loremflickr.com/640/480/cats?lock=8610182282084352" size="m" />
        {/* </div> */}
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
              <div className={style.new} />
            </div>
          )}
          position={['right top']}
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

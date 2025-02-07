/* eslint-disable import/no-extraneous-dependencies */
import { Text } from '@gravity-ui/uikit';
import style from './about-page.module.css';

function AboutPage() {
  return (
    <div className="layout">
      <Text variant="header-2">About</Text>
      {/* <h2 className="title">About</h2> */}
      <div className={style.form}>
        ...
      </div>
    </div>
  );
}

export default AboutPage;

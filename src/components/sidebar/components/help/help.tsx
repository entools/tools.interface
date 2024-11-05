import { NavLink } from 'react-router-dom';

import style from './help.module.css';

export default function Help() {
  return (
    <NavLink to="/about" className={style.help}>?</NavLink>
  );
}

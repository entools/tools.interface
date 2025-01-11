import style from './signup-page.module.css';

export default function Footer() {
  return (
    <div className={style.footer}>
      <h2 className={style.title}>Войти с помощью</h2>
      <ul className={style.links}>
        <li className={style.link}>link 1</li>
        <li className={style.link}>link 2</li>
      </ul>
    </div>
  );
}

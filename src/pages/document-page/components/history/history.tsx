import style from './history.module.css';

export default function History() {
  return (
    <div className={style.history}>
      <h3 className={style.title}>History</h3>
      <ul className={style.list}>
        <li className={style.item}>item 1</li>
        <li className={style.item}>item 2</li>
      </ul>
    </div>
  );
}

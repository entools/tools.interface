import style from './alert.module.css';

export default function Alert({ message }: { message: string; }) {
  return (<div className={style.alert}>{message}</div>);
}

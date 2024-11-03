import style from './profile.module.css';

export default function Profile({ sidebarWidth }: { sidebarWidth: number; }) {
  return (
    <div className={style.profile}>
      <div className={style.pic}>a</div>
      <div className={style.name}>
        {sidebarWidth >= 100 && 'footer'}
      </div>
    </div>
  );
}

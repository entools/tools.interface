import style from './project-add-page.module.css';

function ProjectPage() {
  return (
    <div className={style.layout}>
      <h2 className={style.title}>
        Add project
      </h2>
      <div className={style.tools}>Name</div>
      <div className={style.form}>
        <div className={style.main}>
          <div>Tag</div>
          <div>Details</div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;

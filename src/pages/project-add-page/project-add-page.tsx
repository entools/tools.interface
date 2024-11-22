import style from './project-add-page.module.css';

function ProjectPage() {
  return (
    <div className="layout">
      <h2 className={style.title}>
        Add project
      </h2>
      <div className={style.form}>
        <div className={style.main}>
          <input
            className={style.input}
            placeholder="Name"
          />
          <input
            className={style.input}
            placeholder="Tag"
          />
          <input
            className={style.input}
            placeholder="Details"
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;

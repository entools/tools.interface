import style from './project-add-page.module.css';

function ProjectPage() {
  return (
    <div className="layout">
      <h2 className="title">
        Add project
      </h2>
      <div className={style.form}>
        <div className={style.main}>
          <input
            className="input"
            placeholder="Name"
          />
          <input
            className="input"
            placeholder="Tag"
          />
          <input
            className="input"
            placeholder="Details"
          />
          <button
            type="button"
            className="button"
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;

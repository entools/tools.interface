import style from './document-page.module.css';

function DocumentPage() {
  return (
    <div className={style.layout}>
      <h2 className={style.title}>
        Document
      </h2>
      <div className={style.tools}>Tools</div>
      <div className={style.form}>
        <div className={style.main}>
          <div>Name</div>
          <div>Name block</div>
          <div>Name item</div>
        </div>
        <div className={style.history}>
          History
        </div>
      </div>
    </div>
  );
}

export default DocumentPage;

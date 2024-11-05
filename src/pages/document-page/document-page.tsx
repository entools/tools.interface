import style from './document-page.module.css';

function DocumentPage() {
  return (
    <div className={style.layout}>
      <h2 className={style.title}>
        Document
      </h2>
      <div className={style.form}>
        <div>
          <div>Name</div>
          <div>Name block</div>
          <div>Name item</div>
        </div>
      </div>
    </div>
  );
}

export default DocumentPage;

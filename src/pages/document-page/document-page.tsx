import {
  useParams,
} from 'react-router-dom';
import style from './document-page.module.css';

function DocumentPage() {
  const { projectId, documentId } = useParams();

  return (
    <div className="layout">
      <h2 className={style.title}>
        {`Document ${documentId} #${projectId}`}
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

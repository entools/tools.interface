/* eslint-disable import/no-extraneous-dependencies */
import { Button, TextInput, Text } from '@gravity-ui/uikit';

import style from './project-add-page.module.css';

function ProjectPage() {
  return (
    <div className="layout">
      <Text variant="header-2">Добавить проект</Text>
      <div className={style.form}>
        <div className={style.main}>
          <TextInput
            size="l"
            placeholder="Name"
          />
          <TextInput
            size="l"
            placeholder="Tag"
          />
          <TextInput
            size="l"
            placeholder="Details"
          />
          <Button
            type="button"
            size="l"
            view="normal"
            pin="round-round"
          >
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;

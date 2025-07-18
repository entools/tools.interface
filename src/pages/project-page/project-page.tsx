/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate, useParams } from 'react-router';
import { Button, Text } from '@gravity-ui/uikit';

import { useAppSelector } from '~/hooks';
import { projectSelector, useUpdateProjectMutation, useDeleteProjectMutation } from '~/store';

import ProjectForm from './project-form';

import style from './project-page.module.css';

export type FormPayload = Omit<ProjectType, 'id'>;

export default function ProjectPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const project = useAppSelector(projectSelector);
  const [updateProject, { isLoading }] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const onSubmit = async (data: FormPayload) => {
    if (data.name !== project?.name
      || data.description !== project?.description
      || data.address !== project?.address) {
      await updateProject({ ...data, id: +project!.id });
    }
  };

  const onDeleteProject = async () => {
    await deleteProject(+projectId!);
    navigate('/projects');
  };

  return (
    <div className="layout">
      <div>
        <div>
          <Text variant="header-2">{`Проект - ${project?.name}`}</Text>
        </div>
        <div className={style.buttons}>
          <Button
            className={style.button}
            view="normal"
            size="l"
            onClick={() => navigate('/document-add')}
          >
            Добавить документ
          </Button>
          <Button
            className={style.button}
            view="normal"
            size="l"
            onClick={onDeleteProject}
          >
            Удалить проект
          </Button>
        </div>
      </div>
      <ProjectForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        project={project}
      />
    </div>
  );
}

/* eslint-disable react/jsx-props-no-spreading */
import { Button, Text } from '@gravity-ui/uikit';

import { useNavigate } from 'react-router';
import { useAppSelector } from '~/hooks';
import { projectSelector, useUpdateProjectMutation } from '~/store';

import ProjectForm from './project-form';

export type FormPayload = Omit<ProjectType, 'id'>;

export default function ProjectPage() {
  const navigate = useNavigate();
  const project = useAppSelector(projectSelector);
  const [updateProject, { isLoading }] = useUpdateProjectMutation();

  const onSubmit = async (data: FormPayload) => {
    if (data.name !== project?.name
      || data.description !== project?.description
      || data.address !== project?.address) {
      await updateProject({ ...data, id: +project!.id });
    }
  };

  return (
    <div className="layout">
      <Text variant="header-2">{`Проект - ${project?.name}`}</Text>
      <ProjectForm onSubmit={onSubmit} isLoading={isLoading} project={project} />
      <Button
        view="outlined-success"
        size="l"
        onClick={() => navigate('/document-add')}
      >
        Добавить проект
      </Button>
      {/* <NavLink to="/document-add" state={{ pathname: location }}>
        <Icon data={Plus} size={20} />
      </NavLink> */}
    </div>
  );
}

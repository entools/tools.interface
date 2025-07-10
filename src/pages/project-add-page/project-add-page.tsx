/* eslint-disable react/jsx-props-no-spreading */
import { Text } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router';

import { useCreateProjectMutation } from '~/store';
import ProjectAddForm from './project-add-form';

export type FormPayload = Omit<ProjectType, 'id'>;

export default function ProjectPage() {
  const navigate = useNavigate();
  const [createProject] = useCreateProjectMutation();

  const onSubmit = async (data: FormPayload) => {
    const result = (await createProject(data)) as unknown as { data: ProjectType };
    navigate(`/projects/${result.data.id}/documents/1`);
  };

  return (
    <div className="layout">
      <Text variant="header-2">Добавить проект</Text>
      <ProjectAddForm onSubmit={onSubmit} />
    </div>
  );
}

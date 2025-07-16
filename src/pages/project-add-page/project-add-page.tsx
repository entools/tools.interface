/* eslint-disable react/jsx-props-no-spreading */
import { Text } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router';

import { useCreateProjectMutation } from '~/store';
import ProjectForm from '../project-page/project-form';

export type FormPayload = Omit<ProjectType, 'id'>;

export default function ProjectPage() {
  const navigate = useNavigate();
  const [createProject, { isLoading }] = useCreateProjectMutation();

  const onSubmit = async (data: FormPayload) => {
    const result = (await createProject(data)) as unknown as { data: ProjectType };
    navigate(`/projects/${result.data.id}`);
  };

  return (
    <div className="layout">
      <Text variant="header-2">Добавить проект</Text>
      <ProjectForm onSubmit={onSubmit} isLoading={isLoading} project={null} />
    </div>
  );
}

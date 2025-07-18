import { Text, List } from '@gravity-ui/uikit';

import { useAppSelector } from '~/hooks';
import { projectsSelector } from '~/store';

export type FormPayload = Omit<ProjectType, 'id'>;

export default function ProjectsPage() {
  const projects = useAppSelector(projectsSelector);

  return (
    <div className="layout">
      <Text variant="header-2">Проекты</Text>
      <List items={projects.map(({ name }) => name)} itemsHeight={160} />
    </div>
  );
}

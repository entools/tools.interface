/* eslint-disable react/jsx-props-no-spreading */
import { Text } from '@gravity-ui/uikit';

export type FormPayload = Omit<ProjectType, 'id'>;

export default function ProjectsPage() {
  return (
    <div className="layout">
      <Text variant="header-2">Проекты</Text>
    </div>
  );
}

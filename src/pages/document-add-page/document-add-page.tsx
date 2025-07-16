/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate } from 'react-router';
import { Text } from '@gravity-ui/uikit';

import { useAppSelector } from '~/hooks';
import { projectSelector, useCreateDocumentMutation } from '~/store';

import DocumentAddForm from './document-add-form';

export default function DocumentAddPage() {
  const navigate = useNavigate();
  const project = useAppSelector(projectSelector);
  const [createDocument, { isLoading }] = useCreateDocumentMutation();

  const onSubmit = async (data: { name: string; documentType: string[] }) => {
    if (project) {
      const result = await createDocument({
        name: data.name,
        documentType: data.documentType[0],
        project: { id: project.id },
      });

      if (result?.data) {
        navigate(`/projects/${project.id}/documents/${result.data.id}`);
      }
    }
  };

  return (
    <div className="layout">
      <Text variant="header-2">Добавить документ</Text>
      <DocumentAddForm onSubmit={onSubmit} isLoading={isLoading} project={project} />
    </div>
  );
}

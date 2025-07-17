import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import { Select, Icon } from '@gravity-ui/uikit';
import { FolderOpen, Plus } from '@gravity-ui/icons';
import classNames from 'classnames';

import { useGetProjectsMutation, useSetActiveProjectMutation } from '~/store';
import { projectsSelector } from '~/store/slices/projects-slice';
import { projectSelector } from '~/store/slices/project-slice';
import { useAppSelector } from '~/hooks';

import style from './logo.module.css';

export default function Logo({ sidebarWidth }: { sidebarWidth: number }) {
  const navigate = useNavigate();
  const [getProjects, { isLoading }] = useGetProjectsMutation();
  const [setActiveProject] = useSetActiveProjectMutation();

  const projects = useAppSelector(projectsSelector);
  const project = useAppSelector(projectSelector);

  const options = React.useMemo(
    () => projects.map(({ id, name }) => ({ id, value: id, content: name })),
    [projects],
  );

  const handleProjectUpdate = (open: boolean) => {
    if (open) {
      getProjects();
    }
  };

  const handleProjectChange = async (arr: string[]) => {
    const result = await setActiveProject(+arr[0]);
    navigate(`/projects/${result.data?.id}`);
  };

  return (
    <div className={classNames(style.header, { [style.small]: sidebarWidth < 100 })}>
      <div className={style.logo}>
        <NavLink to={`projects/${project?.id ?? ''}`} className={style.home}>
          <Icon data={FolderOpen} size={20} />
        </NavLink>
        {sidebarWidth >= 178 && (
          <>
            <Select
              name="project"
              size="l"
              width="max"
              onOpenChange={handleProjectUpdate}
              options={options}
              onUpdate={handleProjectChange}
              value={[project?.name ?? '']}
              loading={isLoading}
            />
            <NavLink to="/projects/add" className={style.icon}>
              <Icon data={Plus} size={20} />
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

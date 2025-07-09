import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';

import { Select, Icon } from '@gravity-ui/uikit';
import { House, Plus } from '@gravity-ui/icons';

import classNames from 'classnames';

import { useAppSelector } from '~/hooks';
import { useGetProjectsMutation } from '~/store';
import { projectSelector } from '~/store/slices/project-slice';

import style from './logo.module.css';

type SelectType = { value: string; content: string };

export default function Logo({ sidebarWidth }: { sidebarWidth: number }) {
  const navigate = useNavigate();
  const [getProjects] = useGetProjectsMutation();
  const projects = useAppSelector(projectSelector);
  const options = React.useMemo(
    () => projects.map(({ id, name }) => ({ value: id, content: name })),
    [projects],
  );
  const [selectedProject, setSelectedProject] = useState<SelectType>();

  const handleProjectChange = ([id]: string[]) => {
    if (id) {
      navigate(`/projects/${id}/documents/1`);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    if (options.length > 0) {
      setSelectedProject(options[0]);
    }
  }, [options]);

  return (
    <div className={classNames(style.header, { [style.small]: sidebarWidth < 100 })}>
      <div className={style.logo}>
        <NavLink to="/" className={style.home}>
          <Icon data={House} size={20} />
        </NavLink>
        {sidebarWidth >= 178 && (
          <>
            <Select
              name="project"
              size="l"
              width="max"
              options={options}
              onUpdate={handleProjectChange}
              value={[selectedProject?.content ?? '']}
              loading
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

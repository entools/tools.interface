/* eslint-disable react/no-children-prop */
import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Text } from '@gravity-ui/uikit';

import Modal from '../../components/modal/modal';

function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClose = useCallback(() => {
    navigate(location.state.pathname || '/');
  }, [location.state, navigate]);
  return (<Modal title="Search" onClose={handleClose} children={(<Text variant="header-1">form</Text>)} overlay />);
}

export default SearchPage;

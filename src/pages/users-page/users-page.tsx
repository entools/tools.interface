/* eslint-disable react/no-children-prop */
import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router';

import Modal from '../../components/modal/modal';

function UsersPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClose = useCallback(() => {
    navigate(location.state.pathname || '/');
  }, [location.state, navigate]);

  return (<Modal title="Users" onClose={handleClose} children={(<h2>form</h2>)} />);
}

export default UsersPage;

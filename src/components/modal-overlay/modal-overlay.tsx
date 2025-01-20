/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ReactNode } from 'react';
import classNames from 'classnames';

import style from './modal-overlay.module.css';

export default function ModalOverlay({ children, closeModal, overlay }
  // eslint-disable-next-line react/require-default-props
  : { children: ReactNode; closeModal: () => void; overlay?: boolean; }) {
  const onCloseModal = () => overlay && closeModal();

  return (
    <div className={classNames(style.overlay)} onClick={onCloseModal} data-test="modal">
      {children}
    </div>
  );
}

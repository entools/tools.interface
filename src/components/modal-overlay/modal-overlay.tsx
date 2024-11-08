/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ReactNode } from 'react';
import classNames from 'classnames';

import style from './modal-overlay.module.css';

export default function ModalOverlay({ children, closeModal }
  : { children: ReactNode, closeModal: () => void }) {
  return (
    <div className={classNames(style.overlay)} onClick={closeModal} data-test="modal">
      {children}
    </div>
  );
}

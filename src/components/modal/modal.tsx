/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';
// import { motion, AnimatePresence } from 'framer-motion';

import { Icon } from '@gravity-ui/uikit';
import { Xmark } from '@gravity-ui/icons';
import ModalOverlay from '../modal-overlay/modal-overlay';

import { ESC_CLOSE_ON, OVERLAY_CLOSE_ON } from '../../utils/constants/constants';

import style from './modal.module.css';

type TypeModal = {
  title?: string;
  children: ReactNode;
  onClose: () => void;
  overlay?: boolean;
};

export default function Modal({
  title, children, onClose, overlay,
}: TypeModal) {
  const reactModals = document.getElementById('modals');

  const handleEscape = (e: KeyboardEvent) => {
    if (e.type === 'keydown' && e.code === 'Escape') {
      if (OVERLAY_CLOSE_ON) {
        onClose();
      }
    }
  };

  const closeModal = () => ESC_CLOSE_ON && onClose();

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  });

  return ReactDOM.createPortal(
    <ModalOverlay closeModal={closeModal} overlay={overlay}>
      <div
        className={style.container}
        onClick={(e) => e.stopPropagation()}
        // initial={MODAL_CONFIG.INITIAL}
        // animate={MODAL_CONFIG.ANIMATE}
        // exit={MODAL_CONFIG.EXIT}
      >
        {title && <h2 className={style.title}>{title}</h2>}
        <button type="button" className={style.close} data-test="close-button" onClick={onClose}>
          <Icon data={Xmark} size={16} />
        </button>
        {children}
      </div>
    </ModalOverlay>,
    reactModals!,
  );
}

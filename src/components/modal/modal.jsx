import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import ModalOverlay from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose]);

  return createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <div className={`${styles.modal} pt-10 pl-10 pr-10 pb-15`}>
        <button
          type="button"
          aria-label="Закрыть"
          className={styles.icon}
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        {title && (
          <h2 className={`${styles.heading} text text_type_main-large`}>{title}</h2>
        )}
        {children}
      </div>
    </>,
    modalRoot
  );
}

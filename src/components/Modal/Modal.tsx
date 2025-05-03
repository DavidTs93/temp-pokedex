import React, { useEffect, useRef } from 'react';
import styles from './Modal.module.css';
import { useModal } from '../../contexts/ModalContext';

interface ModalProps {
  setScroll: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
  onCloseAll?: () => void;
  children: React.ReactNode;
  title?: string;
  isStacked?: boolean;
  isWide?: boolean;
  sprite?: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, onCloseAll, children, title, isStacked, isWide, sprite }) => {
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { isHeaderSpriteVisible, setScroll } = useModal();

  useEffect(() => {
    if (!modalOverlayRef.current) return;
    const el = modalOverlayRef.current;
    const onScroll = () => setScroll(el.scrollTop);
    el.addEventListener('scroll', onScroll);
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, [children, setScroll]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (onCloseAll) {
          onCloseAll();
        } else {
          onClose();
        }
      }
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onCloseAll]);

  return (
    <div
      className={`${styles.modalOverlay} ${isStacked ? styles.modalStacked : ''}`}
      onClick={onClose}
      ref={modalOverlayRef}
    >
      <div
        className={`${styles.modalContent} ${isWide ? styles.wide : styles.thin}`}
        onClick={e => e.stopPropagation()}
        ref={modalRef}
      >
        <div className={styles.modalHeader}>
          {title && <h2 className={styles.modalTitle}>{title}</h2>}
          {sprite && isHeaderSpriteVisible && <img src={sprite} alt={title} className={styles.headerSprite} />}
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.modalBody}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
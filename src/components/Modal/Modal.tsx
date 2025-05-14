import React, { useEffect, useRef, useState } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  index: number;
  isTop: boolean;
  onCloseTop: () => void;
  onCloseAll: () => void;
  fallbackTitle: string;
  detailsComponent: React.ComponentType<any>;
  item: any;
  isWide: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ index, isTop, onCloseTop, onCloseAll, fallbackTitle, detailsComponent, item, isWide, children }) => {
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isHeaderSpriteVisible, setIsHeaderSpriteVisible] = useState(false);
  // key={`${modal.item.id}-${index}`}
  // isWide={modal.isWide}
  // title={modal.item.name || `${title} Details`}
  // isStacked={index > 0}
  // headerSprite={modal.item.sprite}
  const title = item.name || fallbackTitle;

  useEffect(() => {
    if (!modalOverlayRef.current) return;
    const el = modalOverlayRef.current;
    const onScroll = () => setIsHeaderSpriteVisible(el.scrollTop > 0);
    el.addEventListener('scroll', onScroll);
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseAll();
      }
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onCloseAll]);

  return (
    <div
      className={styles.modalOverlay}
      onClick={onCloseTop}
      ref={modalOverlayRef}
    >
      <div
        className={`${styles.modalContent} ${isWide ? styles.wide : styles.thin}`}
        onClick={e => e.stopPropagation()}
        ref={modalRef}
      >
        <div className={styles.modalHeader}>
          {title && <h2 className={styles.modalTitle}>{title}</h2>}
          {headerSprite && isHeaderSpriteVisible && <img src={headerSprite} alt={title} className={styles.headerSprite} />}
          <button className={styles.closeButton} onClick={onCloseTop}>
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
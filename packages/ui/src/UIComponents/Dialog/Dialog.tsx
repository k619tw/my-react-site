import React, { useEffect, useCallback, useRef } from 'react';
import { X } from '@phosphor-icons/react';
import { iconSize } from '../../utils/iconSize';
import styles from './dialog.module.css';

export interface DialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback when dialog should close */
  onClose: () => void;
  /** Dialog title */
  title: string;
  /** Dialog description/body text */
  description?: string;
  /** Action buttons - typically Button components */
  actions?: React.ReactNode;
  /** Custom content to render instead of description */
  children?: React.ReactNode;
  /** Whether clicking the overlay closes the dialog */
  closeOnOverlayClick?: boolean;
  /** Whether pressing Escape closes the dialog */
  closeOnEscape?: boolean;
  /** Additional className for the dialog body */
  className?: string;
  /** Accessible label for the close button */
  closeLabel?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  description,
  actions,
  children,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
  closeLabel = 'Close dialog',
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);

  // Handle Escape key
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  // Handle overlay click
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  // Focus management and keyboard handling
  useEffect(() => {
    if (open) {
      // Store current focus
      previousActiveElement.current = document.activeElement;
      
      // Focus the dialog
      dialogRef.current?.focus();
      
      // Add escape listener
      document.addEventListener('keydown', handleKeyDown);
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      
      // Restore focus when closing
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    };
  }, [open, handleKeyDown]);

  // Don't render if not open
  if (!open) return null;

  return (
    <div 
      className={styles.overlay} 
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby={description ? 'dialog-description' : undefined}
        className={`${styles.dialog} ${className || ''}`}
        tabIndex={-1}
      >
        {/* Close Button */}
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label={closeLabel}
        >
          <span className={styles.closeIcon}>
            <X weight="bold" style={iconSize.md} />
          </span>
        </button>

        {/* Content */}
        <div className={styles.content}>
          <h2 id="dialog-title" className={styles.title}>
            {title}
          </h2>
          {description && (
            <p id="dialog-description" className={styles.description}>
              {description}
            </p>
          )}
          {children}
        </div>

        {/* Actions */}
        {actions && (
          <div className={styles.actions}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

Dialog.displayName = 'Dialog';

export default Dialog;

import React from 'react';
import styles from './badge.module.css';

export type BadgeType = 'neutral' | 'danger' | 'warning' | 'success' | 'promote';
export type BadgeSize = 'small' | 'large';

export interface BadgeProps {
  label: string;
  icon?: React.ReactNode;
  size?: BadgeSize;
  type?: BadgeType;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  icon,
  size = 'small',
  type = 'neutral',
  className = '',
}) => {
  return (
    <span
      className={[
        styles.badge,
        styles[size],
        styles[type],
        className,
      ].join(' ')}
      data-badge-type={type}
      data-badge-size={size}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{label}</span>
    </span>
  );
};

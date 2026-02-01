import React from 'react';
import styles from './button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'alert';
export type ButtonSize = 'small' | 'large';

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icon displayed before the label */
  startIcon?: React.ReactNode;
  /** Icon displayed after the label */
  endIcon?: React.ReactNode;
  /** Icon-only mode - renders a square button with just an icon. Requires aria-label for accessibility. */
  iconOnly?: boolean;
  /** Icon for icon-only buttons */
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function isLink(props: ButtonProps): props is ButtonAsLink {
  return 'href' in props && props.href !== undefined;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const { 
      variant = 'primary', 
      size = 'large', 
      startIcon, 
      endIcon,
      iconOnly = false,
      icon,
      children, 
      className,
      ...rest 
    } = props;

    const variantClass = styles[variant];
    const sizeClass = styles[size];
    const iconOnlyClass = iconOnly ? styles.iconOnly : '';
    const combined = [styles.button, variantClass, sizeClass, iconOnlyClass, className].filter(Boolean).join(' ');

    const content = iconOnly ? (
      <span className={styles.iconOnlyIcon}>{icon}</span>
    ) : (
      <>
        {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
        <span className={styles.label}>{children}</span>
        {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
      </>
    );

    if (isLink(props)) {
      const { href, ...linkRest } = rest as Omit<ButtonAsLink, keyof ButtonBaseProps>;
      return (
        <a 
          ref={ref as React.Ref<HTMLAnchorElement>} 
          href={href} 
          className={combined} 
          {...linkRest}
        >
          {content}
        </a>
      );
    }

    const { type = 'button', ...buttonRest } = rest as Omit<ButtonAsButton, keyof ButtonBaseProps>;
    return (
      <button 
        ref={ref as React.Ref<HTMLButtonElement>} 
        type={type} 
        className={combined} 
        {...buttonRest}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
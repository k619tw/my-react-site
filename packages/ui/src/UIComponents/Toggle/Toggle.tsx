import React, { useId } from 'react';
import styles from './toggle.module.css';

export interface ToggleProps {
  /** Whether the toggle is checked/on */
  checked?: boolean;
  /** Default checked state for uncontrolled usage */
  defaultChecked?: boolean;
  /** Callback when toggle state changes */
  onChange?: (checked: boolean) => void;
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** Accessible label for the toggle */
  label?: string;
  /** Whether to visually hide the label */
  hideLabel?: boolean;
  /** Additional className */
  className?: string;
  /** ID for the input element */
  id?: string;
  /** Name for form submission */
  name?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  label,
  hideLabel = false,
  className,
  id,
  name,
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.checked);
  };

  return (
    <label
      className={[
        styles.toggle,
        disabled ? styles.disabled : '',
        className,
      ].filter(Boolean).join(' ')}
      htmlFor={inputId}
    >
      <input
        type="checkbox"
        id={inputId}
        name={name}
        className={styles.input}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={handleChange}
        disabled={disabled}
        role="switch"
        aria-checked={checked}
      />
      <span className={styles.track} aria-hidden="true">
        <span className={styles.thumb} />
      </span>
      {label && (
        <span className={hideLabel ? styles.srOnly : styles.label}>
          {label}
        </span>
      )}
    </label>
  );
};

Toggle.displayName = 'Toggle';

export default Toggle;

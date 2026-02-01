/**
 * Icon size tokens mapped to CSS custom properties
 * These match the values in tokens-sizing.css
 * 
 * Usage with Phosphor Icons:
 * <Star style={iconSize.md} />
 * <ArrowRight style={iconSize.lg} />
 */

export const iconSize = {
  /** 16px - var(--yuanhhou-size-200) */
  sm: {
    width: 'var(--yuanhhou-size-200)',
    height: 'var(--yuanhhou-size-200)',
  },
  /** 20px - var(--yuanhhou-size-250) */
  md: {
    width: 'var(--yuanhhou-size-250)',
    height: 'var(--yuanhhou-size-250)',
  },
  /** 24px - var(--yuanhhou-size-300) */
  lg: {
    width: 'var(--yuanhhou-size-300)',
    height: 'var(--yuanhhou-size-300)',
  },
  /** 32px - var(--yuanhhou-size-400) */
  xl: {
    width: 'var(--yuanhhou-size-400)',
    height: 'var(--yuanhhou-size-400)',
  },
} as const;

export type IconSize = keyof typeof iconSize;

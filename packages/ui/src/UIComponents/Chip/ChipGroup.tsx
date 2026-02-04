import React, { useState, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './chipGroup.module.css'
import { Chip } from './Chip'

export type ChipItem = {
  id: string | number
  label: React.ReactNode
}

export type ChipGroupProps = {
  /** Array of chip items */
  items: ChipItem[]
  /** Selected chip ids */
  selected?: (string | number)[]
  /** Callback when selection changes */
  onChange?: (selected: (string | number)[]) => void
  /** Allow multiple selections */
  multiple?: boolean
  /** Optional className */
  className?: string
  /** ARIA labelledby for form association */
  'aria-labelledby'?: string
}

export const ChipGroup: React.FC<ChipGroupProps> = ({
  items,
  selected: initialSelected = [],
  onChange,
  multiple = false,
  className,
  'aria-labelledby': ariaLabelledBy,
}) => {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<(string | number)[]>(initialSelected)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([])

  const handleChipClick = (id: string | number) => {
    let newSelected: (string | number)[]

    if (multiple) {
      newSelected = selected.includes(id)
        ? selected.filter(s => s !== id)
        : [...selected, id]
    } else {
      newSelected = selected.includes(id) ? [] : [id]
    }

    setSelected(newSelected)
    onChange?.(newSelected)
  }

  // Keyboard navigation for radiogroup/group (WCAG 2.1.1)
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const itemCount = items.length
    let newIndex = focusedIndex

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault()
        newIndex = (focusedIndex + 1) % itemCount
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault()
        newIndex = (focusedIndex - 1 + itemCount) % itemCount
        break
      case 'Home':
        e.preventDefault()
        newIndex = 0
        break
      case 'End':
        e.preventDefault()
        newIndex = itemCount - 1
        break
      default:
        return
    }

    setFocusedIndex(newIndex)
    chipRefs.current[newIndex]?.focus()
  }, [focusedIndex, items.length])

  const groupRole = multiple ? 'group' : 'radiogroup'
  const chipRole = multiple ? 'checkbox' : 'radio'
  const ariaLabel = multiple ? t('chip.filterOptions') : t('chip.selectOption')

  return (
    <div
      className={[styles.chipGroup, className || ''].filter(Boolean).join(' ')}
      role={groupRole}
      aria-label={!ariaLabelledBy ? ariaLabel : undefined}
      aria-labelledby={ariaLabelledBy}
      onKeyDown={handleKeyDown}
    >
      {items.map((item, index) => (
        <Chip
          key={item.id}
          ref={(el) => { chipRefs.current[index] = el }}
          label={item.label}
          selected={selected.includes(item.id)}
          onClick={() => handleChipClick(item.id)}
          onFocus={() => setFocusedIndex(index)}
          role={chipRole}
          showIcon={false}
          tabIndex={index === focusedIndex ? 0 : -1}
        />
      ))}
    </div>
  )
}

export default ChipGroup

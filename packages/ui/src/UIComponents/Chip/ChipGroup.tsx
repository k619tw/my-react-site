import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './chipGroup.module.css'
import { Chip, type ChipProps } from './Chip'

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
}

export const ChipGroup: React.FC<ChipGroupProps> = ({
  items,
  selected: initialSelected = [],
  onChange,
  multiple = false,
  className,
}) => {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<(string | number)[]>(initialSelected)

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

  const groupRole = multiple ? 'group' : 'radiogroup'
  const chipRole = multiple ? 'checkbox' : 'radio'
  const ariaLabel = multiple ? t('chip.filterOptions') : t('chip.selectOption')

  return (
    <div
      className={[styles.chipGroup, className || ''].filter(Boolean).join(' ')}
      role={groupRole}
      aria-label={ariaLabel}
    >
      {items.map(item => (
        <Chip
          key={item.id}
          label={item.label}
          selected={selected.includes(item.id)}
          onClick={() => handleChipClick(item.id)}
          role={chipRole}
          showIcon={false}
        />
      ))}
    </div>
  )
}

export default ChipGroup

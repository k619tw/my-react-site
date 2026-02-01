import React, { useState } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import { iconSize } from '../../utils/iconSize';
import styles from './accordion.module.css';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className={styles.accordion}>
      {items.map((item, idx) => (
        <div className={styles.item} key={item.id}>
          <button
            className={styles.trigger}
            aria-expanded={openIndex === idx}
            aria-controls={`panel-${item.id}`}
            id={`accordion-trigger-${item.id}`}
            onClick={() => handleToggle(idx)}
            type="button"
          >
            <span className={styles.title}>{item.title}</span>
            <span
              className={styles.icon}
              aria-hidden="true"
              style={{ transform: openIndex === idx ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 220ms ease' }}
            >
              <CaretDown weight="bold" style={iconSize.lg} />
            </span>
          </button>
          <div
            id={`panel-${item.id}`}
            className={styles.panel}
            role="region"
            aria-labelledby={`accordion-trigger-${item.id}`}
            hidden={openIndex !== idx}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};

import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';

const languages = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'ja', label: '日本語', full: '日本語' },
  { code: 'zh-TW', label: '繁中', full: '繁體中文' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <div className={styles.switcher}>
      <span className={styles.icon} aria-hidden="true">🌐</span>
      <select
        id="language-switcher"
        name="language"
        className={styles.select}
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        aria-label="Select language"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.full}
          </option>
        ))}
      </select>
      <span className={styles.currentLabel}>{currentLang.label}</span>
      <span className={styles.chevron} aria-hidden="true">▾</span>
    </div>
  );
}

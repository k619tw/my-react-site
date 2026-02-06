import React from 'react'
import { useTranslation } from 'react-i18next'
import { FilePdf, LinkedinLogo, SpotifyLogo } from '@phosphor-icons/react'
import styles from './footer.module.css'

export interface FooterProps {
  /** Optional class name for custom styling */
  className?: string
}

/**
 * Footer component with copyright year and social links.
 * Links open in new tabs with proper accessibility attributes.
 */
export const Footer: React.FC<FooterProps> = ({ className }) => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`${styles.footer} ${className || ''}`}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          © {currentYear} Yuan Hou. {t('footer.rights')}
        </p>
        <nav className={styles.socialLinks} aria-label={t('footer.socialLinksLabel')}>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={t('footer.resumeLabel')}
          >
            <FilePdf size={24} weight="regular" aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/yuan-hou-951a03162"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={t('footer.linkedinLabel')}
          >
            <LinkedinLogo size={24} weight="regular" aria-hidden="true" />
          </a>
          <a
            href="https://open.spotify.com/user/k619tw?si=5365953b0c1549b8"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={t('footer.spotifyLabel')}
          >
            <SpotifyLogo size={24} weight="regular" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer

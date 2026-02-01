import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { List, X } from '@phosphor-icons/react'
import { ChipGroup } from '../UIComponents/Chip'
import { Dialog } from '../UIComponents/Dialog/Dialog'
import { Button } from '../UIComponents/Button/Button'
import { Badge } from '../UIComponents/Badge/Badge'
import { ThemeSelector } from './ThemeSelector'
import { Toggle } from '../UIComponents/Toggle/Toggle'
import { Card } from '../UIComponents/Card/Card'
import { useTheme } from '../ThemeProvider'
import styles from './portfolio.module.css'

const ONBOARDING_KEY = 'portfolio-onboarding-complete'

export const Portfolio: React.FC = () => {
  const { t, i18n } = useTranslation()
  const { theme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentView, setCurrentView] = useState<'home' | 'work' | 'settings'>('home')
  const [selectedLanguage, setSelectedLanguage] = useState<(string | number)[]>([i18n.language])
  
  // Onboarding dialog state
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [onboardingLanguage, setOnboardingLanguage] = useState<(string | number)[]>([i18n.language])

  // Check if onboarding should be shown on mount
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem(ONBOARDING_KEY)
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true)
    }
  }, [])

  // Sync selected language with i18n when language changes
  useEffect(() => {
    setSelectedLanguage([i18n.language])
  }, [i18n.language])

  const handleOnboardingLanguageChange = (selected: (string | number)[]) => {
    if (selected.length > 0) {
      setOnboardingLanguage(selected)
      i18n.changeLanguage(String(selected[0]))
    }
  }

  const [heroFilterSelected, setHeroFilterSelected] = useState<(string | number)[]>([])
  const [heroToggle, setHeroToggle] = useState(false)

  const handleOnboardingComplete = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true')
    setShowOnboarding(false)
  }

  const getTimeOfDay = () => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return 'morning'
    if (hour >= 12 && hour < 18) return 'afternoon'
    return 'evening'
  }

  const onboardingTitle = t(`portfolio.onboarding.greeting.${getTimeOfDay()}`)

  return (
    <div className={styles.portfolio}>
      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.navInner}>
            {/* Logo */}
            <div className={styles.logo}>
              <span>{t('portfolio.logo')}</span>
            </div>

            {/* Nav Links */}
            <ul className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
              <li>
                <a href="#home" onClick={() => setCurrentView('home')}>{t('portfolio.nav.home')}</a>
              </li>
              <li>
                <a href="#about">{t('portfolio.nav.about')}</a>
              </li>
              <li>
                <a href="#work" onClick={() => setCurrentView('work')} className={currentView === 'work' ? styles.active : ''}>{t('portfolio.nav.work')}</a>
              </li>
              <li>
                <a href="#settings" onClick={() => setCurrentView('settings')} className={currentView === 'settings' ? styles.active : ''}>{t('portfolio.nav.settings')}</a>
              </li>
            </ul>

            {/* Hamburger Menu */}
            <button
              className={styles.hamburger}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className={styles.main}>
        {currentView === 'home' ? (
          <div className={styles.grid}>
            <section className={styles.hero}>
                <div className={styles.heroLeft}>
                  <h1>{t('portfolio.hero.title')}</h1>
                  <p>{t('portfolio.hero.subtitle')}</p>
                </div>

                <div className={styles.heroRight}>
                  <div className={styles.interactionContainer}>
                    <div className={styles.interactionRow}>
                      <label className={styles.interactionLabel}>My skillset</label>
                      <ChipGroup
                        items={[
                          { id: 'design', label: 'Design' },
                          { id: 'dev', label: 'Dev' },
                          { id: 'writing', label: 'Writing' },
                        ]}
                        selected={heroFilterSelected}
                        onChange={(s) => setHeroFilterSelected(s)}
                        multiple={true}
                      />
                    </div>

                    <div className={styles.interactionRow}>
                      <label className={styles.interactionLabel}>Preferences</label>
                      <div className={styles.toggleRow}>
                        <Toggle
                          checked={heroToggle}
                          onChange={(v) => setHeroToggle(v)}
                          label="Enable feature"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

            {/* Content Area */}
            <section className={styles.content}>
              <div className={styles.placeholder}>
                <p>{t('portfolio.placeholder')}</p>
              </div>
            </section>
          </div>
        ) : currentView === 'work' ? (
          <div className={styles.grid}>
            <section className={styles.workSection}>
              <h2>{t('portfolio.work.title')}</h2>
              <div className={styles.workCards} role="list">
                <article role="listitem">
                  <Card
                    variant="filled"
                    direction="vertical"
                    title={t('portfolio.work.card2.title')}
                    body={t('portfolio.work.card2.body')}
                    footer={<span className={styles.cardLinkDisabled} aria-label={`${t('portfolio.work.card2.title')} - ${t('portfolio.work.card2.link')}`}>{t('portfolio.work.card2.link')}</span>}
                  />
                </article>
                <article role="listitem">
                  <Card
                    variant="filled"
                    direction="vertical"
                    title={t('portfolio.work.card3.title')}
                    body={t('portfolio.work.card3.body')}
                    footer={<span className={styles.cardLinkDisabled} aria-label={`${t('portfolio.work.card3.title')} - ${t('portfolio.work.card3.link')}`}>{t('portfolio.work.card3.link')}</span>}
                  />
                </article>
                <article role="listitem">
                  <Card
                    variant="filled"
                    direction="vertical"
                    title={t('portfolio.work.card4.title')}
                    body={t('portfolio.work.card4.body')}
                    footer={<span className={styles.cardLinkDisabled} aria-label={`${t('portfolio.work.card4.title')} - ${t('portfolio.work.card4.link')}`}>{t('portfolio.work.card4.link')}</span>}
                  />
                </article>
                <article role="listitem" className={styles.bonusCard}>
                  <Card
                    variant="filled"
                    direction="vertical"
                    title={
                      <>
                        <div className={styles.cardBadge}>
                          <Badge type="success" label={t('portfolio.work.card1.badge')} />
                        </div>
                        {t('portfolio.work.card1.title')}
                      </>
                    }
                    body={t('portfolio.work.card1.body')}
                    footer={<a href="#components" className={styles.cardLink} aria-label={`${t('portfolio.work.card1.title')} - ${t('portfolio.work.card1.link')}`}>{t('portfolio.work.card1.link')}</a>}
                  />
                </article>
              </div>
            </section>
          </div>
        ) : (
          <div className={styles.grid}>
            {/* Settings View */}
            <section className={styles.settings}>
              <h2>{t('portfolio.settings.title')}</h2>

              {/* Language Selection */}
              <div className={styles.settingGroup}>
                <label className={styles.settingLabel}>{t('portfolio.settings.language')}</label>
                <ChipGroup
                  items={[
                    { id: 'en', label: 'English' },
                    { id: 'ja', label: '日本語' },
                    { id: 'zh-TW', label: '繁體中文' },
                  ]}
                  selected={selectedLanguage}
                  onChange={(selected) => {
                    if (selected.length > 0) {
                      i18n.changeLanguage(String(selected[0]))
                    }
                  }}
                  multiple={false}
                  className={styles.languageChips}
                />
                <p className={styles.settingHint}>{t('portfolio.settings.languageHint')}</p>
              </div>

              {/* Theme Selection */}
              <div className={styles.settingGroup}>
                <label className={styles.settingLabel}>{t('portfolio.settings.theme')}</label>
                <ThemeSelector />
                <p className={styles.settingHint}>{t('portfolio.settings.themeHint')}</p>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Onboarding Dialog */}
      <Dialog
        open={showOnboarding}
        onClose={handleOnboardingComplete}
        closeOnOverlayClick={false}
        closeOnEscape={false}
        title={onboardingTitle}
      >
        <div className={styles.onboarding}>
          {/* Language Selection */}
          <div className={styles.onboardingGroup}>
            <p className={styles.onboardingQuestion}>{t('portfolio.onboarding.languageStep')}</p>
            <ChipGroup
              items={[
                { id: 'en', label: 'English' },
                { id: 'ja', label: '日本語' },
                { id: 'zh-TW', label: '繁體中文' },
              ]}
              selected={onboardingLanguage}
              onChange={handleOnboardingLanguageChange}
              multiple={false}
            />
          </div>

          {/* Theme Selection */}
          <div className={styles.onboardingGroup}>
            <p className={styles.onboardingQuestion}>{t('portfolio.onboarding.themeStep')}</p>
            <ThemeSelector />
          </div>

          <p className={styles.onboardingHint}>{t('portfolio.onboarding.settingsHint')}</p>
          <div className={styles.onboardingActions}>
            <Button variant="primary" onClick={handleOnboardingComplete}>
              {t('portfolio.onboarding.letsGo')}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

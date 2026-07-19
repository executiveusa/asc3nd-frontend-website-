'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'asc3nd-community-cuts-theme';

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem(STORAGE_KEY, theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const activeTheme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    setTheme(activeTheme);
  }, []);

  function chooseTheme(nextTheme) {
    applyTheme(nextTheme);
    setTheme(nextTheme);
  }

  return (
    <div className="themeToggle" role="group" aria-label="Color theme">
      <button
        type="button"
        className="themeToggleButton"
        data-active={theme === 'light'}
        aria-pressed={theme === 'light'}
        onClick={() => chooseTheme('light')}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 2v2.2M12 19.8V22M4.93 4.93l1.56 1.56M17.51 17.51l1.56 1.56M2 12h2.2M19.8 12H22M4.93 19.07l1.56-1.56M17.51 6.49l1.56-1.56" />
        </svg>
        <span>Light</span>
      </button>
      <button
        type="button"
        className="themeToggleButton"
        data-active={theme === 'dark'}
        aria-pressed={theme === 'dark'}
        onClick={() => chooseTheme('dark')}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.2 15.3A8.2 8.2 0 0 1 8.7 3.8 8.2 8.2 0 1 0 20.2 15.3Z" />
        </svg>
        <span>Dark</span>
      </button>
    </div>
  );
}

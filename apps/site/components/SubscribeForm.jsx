'use client';

export function SubscribeForm({ placeholder = 'Enter your email', buttonLabel = 'SUBSCRIBE', ariaLabel = 'Newsletter subscribe', inputId = 'footer-email-input', buttonId = 'footer-subscribe-btn' }) {
  return (
    <form
      className="hp-subscribe-form"
      onSubmit={(e) => e.preventDefault()}
      aria-label={ariaLabel}
    >
      <div className="hp-subscribe-row">
        <input
          type="email"
          placeholder={placeholder}
          aria-label={placeholder}
          id={inputId}
          required
        />
        <button type="submit" id={buttonId}>{buttonLabel}</button>
      </div>
    </form>
  );
}

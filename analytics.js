(() => {
  'use strict';
  const measurementId = 'G-0X0X3NFKF2';
  const storageKey = 'portfolio-analytics-consent-v1';
  const maxAge = 180 * 24 * 60 * 60 * 1000;
  const production = location.protocol === 'https:' && location.hostname === 'allatelegina.github.io';
  let choice = null;
  let started = false;
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved && Date.now() - saved.time < maxAge && ['accepted', 'rejected'].includes(saved.choice)) choice = saved.choice;
  } catch { /* Consent is optional even when browser storage is unavailable. */ }

  window.dataLayer = window.dataLayer || [];
  function tag() { window.dataLayer.push(arguments); }
  tag('consent', 'default', {
    analytics_storage: 'denied', ad_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied'
  });

  function start() {
    if (started || choice !== 'accepted' || !production) return;
    started = true;
    window['ga-disable-' + measurementId] = false;
    tag('consent', 'update', { analytics_storage: 'granted' });
    tag('js', new Date());
    // Exclude calculator parameters, form contents, and URL fragments.
    let referrer = '';
    try { const url = new URL(document.referrer); referrer = url.origin + url.pathname; } catch { /* No referrer. */ }
    tag('config', measurementId, {
      page_location: location.origin + location.pathname,
      page_referrer: referrer,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    document.head.append(script);
  }

  // Only predefined successful form events are allowed; never pass form values.
  window.portfolioTrackLead = type => {
    if (choice === 'accepted' && started && ['contact', 'brief'].includes(type)) {
      tag('event', 'generate_lead', { form_name: type });
    }
  };

  function clearAnalyticsCookies() {
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.trim().split('=')[0];
      if (!/^_ga(?:_|$)|^_gid$|^_gat/.test(name)) continue;
      const expiration = name + '=; Max-Age=0; path=/; SameSite=Lax';
      document.cookie = expiration;
      document.cookie = expiration + '; domain=' + location.hostname;
      document.cookie = expiration + '; domain=.' + location.hostname;
    }
  }

  function render() {
    const panel = document.createElement('section');
    panel.className = 'analytics-consent';
    panel.setAttribute('aria-label', 'Cookie preferences');
    panel.hidden = choice !== null;
    panel.innerHTML = `<div><h2>Cookie preferences</h2><p>This site uses optional Google Analytics cookies to understand visits and improve the portfolio. You can accept or reject them. The contact form and project brief work either way.</p><details><summary>What is collected?</summary><p>With your permission, Google receives page views, device and visit information, and usage events. Names, email addresses and answers from the forms are not sent to Analytics. You can change your choice using Cookie settings below.</p><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></details></div><div class="analytics-actions"><button type="button" class="btn" data-consent="accepted">Accept</button><button type="button" class="btn analytics-reject" data-consent="rejected">Reject</button></div>`;
    const settings = document.createElement('div');
    settings.className = 'analytics-preferences';
    settings.innerHTML = '<button type="button">Cookie settings</button>';
    const settingsButton = settings.querySelector('button');
    let returnFocus;
    settingsButton.addEventListener('click', () => {
      returnFocus = settingsButton;
      panel.hidden = false;
      panel.querySelector('button').focus();
    });
    panel.addEventListener('click', event => {
      const button = event.target.closest('[data-consent]');
      if (!button) return;
      const wasStarted = started;
      choice = button.dataset.consent;
      try { localStorage.setItem(storageKey, JSON.stringify({ choice, time: Date.now() })); } catch { /* Keep the current page choice in memory. */ }
      panel.hidden = true;
      if (choice === 'accepted') start();
      else {
        window['ga-disable-' + measurementId] = true;
        tag('consent', 'update', { analytics_storage: 'denied' });
        clearAnalyticsCookies();
        if (wasStarted) { location.reload(); return; }
      }
      if (returnFocus) returnFocus.focus();
    });
    const footerText = document.querySelector('.footer .footer-text');
    if (footerText) footerText.append(settings);
    else document.body.append(settings);
    if (!footerText && document.querySelector('my-footer')) {
      customElements.whenDefined('my-footer').then(() => {
        document.querySelector('.footer .footer-text')?.append(settings);
      });
    }
    document.body.append(panel);
  }

  if (choice === 'accepted') start();
  else clearAnalyticsCookies();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render, { once: true });
  else render();
})();

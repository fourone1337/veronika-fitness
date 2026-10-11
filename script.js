(() => {
  const config = window.SITE_CONFIG || {};
  const bot = (config.telegramBot || '').replace(/^@/, '').trim();
  const dialog = document.getElementById('telegram-dialog');
  document.querySelectorAll('[data-tg]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      if (bot && /^[a-zA-Z0-9_]{5,32}$/.test(bot)) {
        // Telegram deep link sends the requested section via /start payload to the future bot.
        const section = link.dataset.tg === 'prices' ? 'prices' : 'apply';
        window.open(`https://t.me/${bot}?start=${section}`, '_blank', 'noopener,noreferrer');
      } else if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        alert('Telegram-бот пока не подключён. Добавьте его username в config.js');
      }
    });
  });
  document.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  document.querySelector('.dialog-ok')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  toggle?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.textContent = isOpen ? '×' : '☰';
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); toggle.textContent = '☰';
  }));
  document.getElementById('year').textContent = new Date().getFullYear();
})();

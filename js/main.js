// Navigation stays visible when JavaScript is unavailable.
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('#nav-menu');
const mobile = window.matchMedia('(max-width: 767px)');

const setOpen = (open) => {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  menu.hidden = mobile.matches && !open;
};

const syncNavigation = () => {
  // Preserve focus when a viewport change hides the focused control.
  const focused = document.activeElement;
  toggle.hidden = !mobile.matches;
  menu.classList.toggle('is-collapsible', mobile.matches);
  setOpen(false);
  if (mobile.matches && menu.contains(focused)) toggle.focus();
  if (!mobile.matches && focused === toggle) menu.querySelector('a').focus();
};

toggle.addEventListener('click', () => {
  setOpen(toggle.getAttribute('aria-expanded') !== 'true');
});
menu.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link) return;
  setOpen(false);
  // Keep native anchor navigation, with keyboard focus on the destination.
  document.querySelector(link.getAttribute('href'))?.focus({ preventScroll: true });
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobile.matches && !menu.hidden) {
    setOpen(false);
    toggle.focus();
  }
});
document.addEventListener('click', (event) => {
  if (mobile.matches && !menu.hidden && !event.target.closest('.nav')) {
    const hadMenuFocus = menu.contains(document.activeElement);
    setOpen(false);
    if (hadMenuFocus) toggle.focus();
  }
});
mobile.addEventListener('change', syncNavigation);
syncNavigation();

const backToTop = document.querySelector('.back-to-top');
const updateBackToTop = () => {
  const visible = window.scrollY > 400;
  if (!visible && document.activeElement === backToTop) {
    document.querySelector('#main').focus({ preventScroll: true });
  }
  backToTop.hidden = !visible;
};
window.addEventListener('scroll', updateBackToTop, { passive: true });
window.addEventListener('pageshow', updateBackToTop);
updateBackToTop();

const awardDialog = document.querySelector('#award-dialog');
const awardTitle = document.querySelector('#award-dialog-title');
const awardImage = awardDialog.querySelector('.award-image');
const awardImageArea = awardDialog.querySelector('.award-image-area');
const awardImageError = awardDialog.querySelector('.award-image-error');
const awardZoom = awardDialog.querySelector('.award-zoom');
let awardTrigger;

const resetAwardZoom = () => {
  awardImageArea.classList.remove('is-zoomed');
  awardZoom.setAttribute('aria-pressed', 'false');
  awardZoom.textContent = '확대';
  awardImageArea.scrollTo(0, 0);
};

document.querySelectorAll('.award-preview').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !awardDialog.showModal) return;
    event.preventDefault();
    awardTrigger = link;
    resetAwardZoom();
    awardTitle.textContent = link.dataset.title;
    awardImage.alt = `${link.dataset.title} 상장`;
    awardImage.hidden = false;
    awardImageError.hidden = true;
    awardImage.src = link.href;
    awardDialog.showModal();
    document.documentElement.classList.add('award-viewer-open');
  });
});

awardImage.addEventListener('error', () => {
  awardImage.hidden = true;
  awardImageError.hidden = false;
});

awardZoom.addEventListener('click', () => {
  const zoomed = awardImageArea.classList.toggle('is-zoomed');
  awardZoom.setAttribute('aria-pressed', String(zoomed));
  awardZoom.textContent = zoomed ? '전체 보기' : '확대';
  awardImageArea.scrollTo(0, 0);
});

// Only a click outside the dialog's bounds dismisses the backdrop.
awardDialog.addEventListener('click', (event) => {
  if (event.target !== awardDialog) return;
  const bounds = awardDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
    awardDialog.close();
  }
});

awardDialog.addEventListener('close', () => {
  document.documentElement.classList.remove('award-viewer-open');
  resetAwardZoom();
  awardTrigger?.focus({ preventScroll: true });
});

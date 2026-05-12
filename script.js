/* ============================================================
   script.js
   ============================================================ */

// ── Mobile nav toggle ──────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
});

// Close the menu when any nav link is clicked
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
    });
});


// ── Profile photo fallback ─────────────────────────────────────
// If images/profile.jpg is missing, show the initials circle instead.
const profileImg      = document.getElementById('profileImg');
const profileFallback = document.getElementById('profileFallback');

profileImg.addEventListener('error', () => {
    profileImg.style.display      = 'none';
    profileFallback.style.display = 'flex';
});


// ── Smooth scroll with sticky-nav offset ───────────────────────
// Backs up CSS scroll-margin-top for older browsers.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const navH = document.getElementById('navbar').offsetHeight;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// ── Paper card tap-to-toggle (mobile) ──────────────────────────
// On mobile there's no hover, so tap the card to show/hide the overlay.
// Tapping the ADS link itself still opens the link normally.
document.querySelectorAll('.paper-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') return;   // let link clicks through
        card.classList.toggle('overlay-active');
    });
});

// ── DEI card hover expand ──────────────────────────────────────
const deiGrid    = document.getElementById('deiGrid');
const deiSection = document.getElementById('dei');
const isMobile   = () => window.innerWidth <= 768;

function openDeiOverlay(cardId) {
    // Close any currently open overlay first
    document.querySelectorAll('.dei-overlay').forEach(o => o.classList.remove('active'));
    const overlay = document.querySelector(`.dei-overlay[data-for="${cardId}"]`);
    if (overlay) overlay.classList.add('active');
}

function closeAllDeiOverlays() {
    document.querySelectorAll('.dei-overlay').forEach(o => o.classList.remove('active'));
}

// Desktop: open on mouseenter of each card
document.querySelectorAll('.dei-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (!isMobile()) openDeiOverlay(card.dataset.card);
    });
});

// Desktop: close when mouse leaves the DEI section entirely
deiSection.addEventListener('mouseleave', () => {
    if (!isMobile()) closeAllDeiOverlays();
});

// Mobile: tap card to open, tap again (or close button) to close
document.querySelectorAll('.dei-card').forEach(card => {
    card.addEventListener('click', () => {
        if (!isMobile()) return;
        const id      = card.dataset.card;
        const overlay = document.querySelector(`.dei-overlay[data-for="${id}"]`);
        const isOpen  = overlay?.classList.contains('active');
        closeAllDeiOverlays();
        if (!isOpen) openDeiOverlay(id);
    });
});

// Close button works on both desktop and mobile
document.querySelectorAll('.dei-close').forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();
        closeAllDeiOverlays();
    });
});

// Hide broken images — show dashed placeholder instead
document.querySelectorAll('.dei-photo-slot img').forEach(img => {
    img.addEventListener('error', () => {
        img.style.display = 'none';
    });
});
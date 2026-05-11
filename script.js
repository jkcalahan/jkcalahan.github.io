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
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

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
    });
});


// ── Profile photo fallback ─────────────────────────────────────
const profileImg      = document.getElementById('profileImg');
const profileFallback = document.getElementById('profileFallback');

if (profileImg) {
    profileImg.addEventListener('error', () => {
        profileImg.style.display      = 'none';
        profileFallback.style.display = 'flex';
    });
}


// ── Smooth scroll with sticky-nav offset ───────────────────────
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
document.querySelectorAll('.paper-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') return;
        card.classList.toggle('overlay-active');
    });
});


// ── DEI card hover / tap expand ───────────────────────────────
const deiGrid    = document.getElementById('deiGrid');
const deiSection = document.getElementById('dei');

if (deiGrid && deiSection) {

    const isMobile = () => window.innerWidth <= 768;

    function openDeiOverlay(cardId) {
        // Close any currently open overlay
        document.querySelectorAll('.dei-overlay').forEach(o => o.classList.remove('active'));

        const overlay = document.querySelector(`.dei-overlay[data-for="${cardId}"]`);
        if (!overlay) return;

        overlay.classList.add('active');

        /*
          The overlay is position:absolute and grows below the grid.
          Dynamically increase the section's bottom padding so it
          doesn't overlap the next section.
          A short setTimeout lets the browser calculate scrollHeight first.
        */
        setTimeout(() => {
            const gridH    = deiGrid.offsetHeight;
            const overlayH = overlay.scrollHeight;
            if (overlayH > gridH) {
                // Add the difference as extra bottom padding on the section
                deiSection.style.paddingBottom = (overlayH - gridH + 100) + 'px';
            }
        }, 20);
    }

    function closeAllDeiOverlays() {
        document.querySelectorAll('.dei-overlay').forEach(o => o.classList.remove('active'));
        deiSection.style.paddingBottom = '';   // restore CSS default (80px)
    }

    // Desktop: open on mouseenter of each card
    document.querySelectorAll('.dei-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!isMobile()) openDeiOverlay(card.dataset.card);
        });
    });

    // Desktop: close when mouse leaves the whole DEI section
    deiSection.addEventListener('mouseleave', () => {
        if (!isMobile()) closeAllDeiOverlays();
    });

    // Mobile: tap card to toggle open/closed
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

    // Close button — works on desktop and mobile
    document.querySelectorAll('.dei-close').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            closeAllDeiOverlays();
        });
    });

    // Hide broken images — placeholder shows automatically via ::before
    document.querySelectorAll('.dei-photo-slot img').forEach(img => {
        img.addEventListener('error', () => {
            img.style.display = 'none';
        });
    });
}
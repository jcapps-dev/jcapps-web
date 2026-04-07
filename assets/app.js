/* ============================================================
   JCApps — app.js
   ============================================================ */

// ─── NAV SCROLL ────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ─── REVEAL ON SCROLL ──────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Trigger hero reveals immediately
document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 100 + i * 120);
});

// ─── SMOOTH SCROLL FOR ANCHOR LINKS ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ─── NOTIFY FORM ───────────────────────────────────────────
const notifyForm = document.getElementById('notifyForm');
if (notifyForm) {
    notifyForm.addEventListener('submit', e => {
        e.preventDefault();
        const input = notifyForm.querySelector('input[type="email"]');
        const btn   = notifyForm.querySelector('button');
        const email = input.value.trim();
        if (!email) return;

        // Swap to success state
        btn.textContent = '✓ You\'re on the list';
        btn.disabled = true;
        btn.style.background = 'linear-gradient(135deg, #059669, #34d399)';
        input.disabled = true;
        input.style.opacity = '0.5';
    });
}

// ─── MOCKUP COPY BUTTON ────────────────────────────────────
const copyBtn = document.querySelector('.mockup-copy-btn');
if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        copyBtn.textContent = 'Copied!';
        copyBtn.style.background = 'rgba(34,211,238,0.25)';
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
            copyBtn.style.background = '';
        }, 1800);
    });
}

// ─── GALLERY TOGGLE ───────────────────────────────────────
const galleryToggle = document.getElementById('gallery-toggle');
const galleryBody   = document.getElementById('gallery-body');
if (galleryToggle && galleryBody) {
    galleryToggle.addEventListener('click', () => {
        const open = galleryToggle.getAttribute('aria-expanded') === 'true';
        galleryToggle.setAttribute('aria-expanded', String(!open));
        galleryBody.classList.toggle('collapsed', open);
    });
}

// ─── SCREENSHOT GALLERY ───────────────────────────────────
const galleryTrack  = document.getElementById('gallery-track');
if (galleryTrack) {
    const captions = [
        'Upload a single <code>install.php</code> — checks requirements, pulls the latest release from GitHub, launches setup.',
        'Set your admin password, app URL and upload directory. Done in under a minute.',
        'All transfers at a glance — file, size, expiry, download count, status. Revoke or delete with one click.',
        'After uploading you get a secure download link to copy and send. No account needed for the recipient.',
        'Recipients see a minimal download page — no login, no friction. Just a button.',
    ];
    const labels   = document.querySelectorAll('.gallery-label');
    const dots     = document.querySelectorAll('.gallery-dot');
    const caption  = document.getElementById('gallery-caption');
    const prevBtn  = document.getElementById('gallery-prev');
    const nextBtn  = document.getElementById('gallery-next');
    const total    = captions.length;
    let current    = 0;

    function goTo(idx) {
        current = (idx + total) % total;
        galleryTrack.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
        labels.forEach((l, i) => l.classList.toggle('active', i === current));
        caption.innerHTML = captions[current];
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));
    dots.forEach(dot => dot.addEventListener('click', () => goTo(+dot.dataset.slide)));

    // Swipe support
    let startX = 0;
    galleryTrack.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    galleryTrack.addEventListener('touchend',   e => {
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 40) goTo(dx < 0 ? current + 1 : current - 1);
    }, { passive: true });
}

// ─── STAGGER PRODUCT CARDS ────────────────────────────────
document.querySelectorAll('.products-grid .product-card, .philosophy-grid .philosophy-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
});

// ─── MOCKUP TYPING ANIMATION ──────────────────────────────
const mockupFilename = document.getElementById('mockup-filename');
if (mockupFilename) {
    let typed = false;
    const typingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !typed) {
                typed = true;
                setTimeout(() => mockupFilename.classList.add('typing'), 400);
                typingObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });
    typingObserver.observe(mockupFilename.closest('.mockup-window'));
}

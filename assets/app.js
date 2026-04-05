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

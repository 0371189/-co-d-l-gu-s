const smoothLinks = document.querySelectorAll('a[href^="#"]');
const backToTopBtn = document.getElementById('backToTop');
const sectionLinks = document.querySelectorAll('.navbar a');
const themeToggleBtn = document.getElementById('themeToggle');

function setTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    document.documentElement.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem('ecoTheme', theme);
    if (themeToggleBtn) {
        themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('ecoTheme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
}

function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

smoothLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        smoothScroll(this.getAttribute('href'));
    });
});

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');
        setTheme(isDark ? 'light' : 'dark');
    });
}

const exploreButton = document.getElementById('btnExplore');
if (exploreButton) {
    exploreButton.addEventListener('click', () => {
        smoothScroll('#projets');
        showNotification('Découvrez nos projets ! 🌍');
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = 'toast-notification';
    document.body.appendChild(notification);

    requestAnimationFrame(() => notification.classList.add('visible'));

    setTimeout(() => {
        notification.classList.remove('visible');
        setTimeout(() => notification.remove(), 300);
    }, 2800);
}

document.head.insertAdjacentHTML('beforeend', `
<style>
.toast-notification {
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: rgba(46, 204, 113, 0.95);
    color: white;
    padding: 16px 22px;
    border-radius: 18px;
    box-shadow: 0 18px 40px rgba(0,0,0,0.18);
    z-index: 1100;
    font-weight: 600;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.25s ease, transform 0.25s ease;
}
.toast-notification.visible {
    opacity: 1;
    transform: translateY(0);
}
</style>
`);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.transition = 'all 0.7s ease';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.team-card, .project-card, .impact-card, .badge, .info-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    observer.observe(card);
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function updateNavbar() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    sectionLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
    });
}

window.addEventListener('scroll', () => {
    if (backToTopBtn) {
        backToTopBtn.classList.toggle('show', window.scrollY > 420);
    }
    updateNavbar();
});

window.addEventListener('load', () => {
    initTheme();
    updateNavbar();
});

window.addEventListener('orientationchange', () => {
    console.log('📱 L\'orientation de l\'appareil a changé :', window.orientation);
});

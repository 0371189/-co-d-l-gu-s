const smoothLinks = document.querySelectorAll('a[href^="#"]');
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
    setTheme(savedTheme || 'dark');
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

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.transition = 'all 0.6s ease';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.info-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

window.addEventListener('load', () => {
    initTheme();
});

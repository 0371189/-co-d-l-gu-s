// Menu hamburger simple, compatible avec toutes les pages
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navbar = document.querySelector('.navbar');
    if (!navToggle || !navbar) return;

    function setAria(open) {
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    navToggle.addEventListener('click', () => {
        const open = !navbar.classList.toggle('open');
        // toggle returns whether class was added; invert to set aria correctly
        setAria(!open);
        document.body.classList.toggle('nav-open', navbar.classList.contains('open'));
    });

    // Close when clicking a nav link
    navbar.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;
        if (navbar.classList.contains('open')) {
            navbar.classList.remove('open');
            setAria(false);
            document.body.classList.remove('nav-open');
        }
    });

    // Close on resize above mobile
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navbar.classList.contains('open')) {
            navbar.classList.remove('open');
            setAria(false);
            document.body.classList.remove('nav-open');
        }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navbar.classList.contains('open')) {
            navbar.classList.remove('open');
            setAria(false);
            document.body.classList.remove('nav-open');
        }
    });
});

// ========== SMOOTH SCROLL & NAVIGATION ========== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== BUTTON ACTION ========== 
document.getElementById('btnExplore').addEventListener('click', function() {
    document.getElementById('projets').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    showNotification('Découvrez nos projets ! 🌍');
});

// ========== NOTIFICATION FUNCTION ========== 
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #2ecc71;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========== ANIMATIONS ========== 
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(30px);
        }
    }
`;
document.head.appendChild(style);

// ========== INTERSECTION OBSERVER (Animation au scroll) ========== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les cartes de team et projects
document.querySelectorAll('.team-card, .project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// ========== HOVER EFFECTS SUR LES CARTES ========== 
document.querySelectorAll('.team-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = this.classList.contains('team-card') 
            ? 'translateY(-10px)' 
            : 'scale(1.05) rotate(-2deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = this.classList.contains('team-card') 
            ? 'translateY(0)' 
            : 'scale(1) rotate(0)';
    });
});

// ========== ACTIVE NAVBAR LINK ========== 
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.opacity = '0.8';
            link.style.borderBottom = '2px solid white';
        } else {
            link.style.borderBottom = 'none';
            link.style.opacity = '1';
        }
    });
});

// ========== MESSAGE DE BIENVENUE ========== 
window.addEventListener('load', () => {
    console.log('🌱 Bienvenue sur la page des Éco-Délégués !');
    console.log('✨ Merci de visiter notre site');
});

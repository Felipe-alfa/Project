// Tech Startup Pro - JavaScript

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))?.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile Menu
const menuToggle = document.getElementById('menuToggle');
menuToggle?.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
    document.querySelector('.nav-actions').classList.toggle('active');
});

// Form Submit
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('✅ Obrigado! Entraremos em contato em breve.');
    this.reset();
});

// Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

console.log('%c⚡ Tech Startup Pro', 'font-size: 20px; font-weight: bold; color: #667eea;');

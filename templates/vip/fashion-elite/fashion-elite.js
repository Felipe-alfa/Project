// Fashion Elite - JavaScript
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))?.scrollIntoView({behavior: 'smooth'});
}));

document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('✅ Mensagem enviada! Entraremos em contato em breve.');
    this.reset();
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {threshold: 0.1});

document.querySelectorAll('.collection-item, .feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

console.log('%c◆ Fashion Elite', 'font-size: 20px; font-weight: bold; color: #000;');

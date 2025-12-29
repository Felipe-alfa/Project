document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', function(e) {
    e.preventDefault(); document.querySelector(this.getAttribute('href'))?.scrollIntoView({behavior: 'smooth'});
}));
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault(); alert('✅ Visita agendada! Entraremos em contato.'); this.reset();
});
console.log('%c🏛️ Real Estate Luxo', 'font-size: 20px; font-weight: bold; color: #8b6f47;');

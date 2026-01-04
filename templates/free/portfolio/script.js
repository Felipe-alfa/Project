// Portfolio Template - JavaScript
console.log('Portfolio Template Carregado!');

// Add hover effects to portfolio items
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });
});

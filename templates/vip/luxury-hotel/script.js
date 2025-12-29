/* ============================================
   LUXURY HOTEL PREMIUM - JAVASCRIPT
   Interações e Animações Premium
   ============================================ */

// Smooth Scroll
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

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 20, 0.98)';
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(10, 10, 20, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Reveal on Scroll Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// Suite Cards Hover Effect
const suiteCards = document.querySelectorAll('.suite-card');

suiteCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Amenity Cards Animation
const amenityCards = document.querySelectorAll('.amenity-card');

amenityCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Button Ripple Effect
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-suite, .btn-reserve');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax Effect on Hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled * 0.002);
    }
});

// Counter Animation for Stats
const animateCounters = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const hasPercent = text.includes('%');
        const hasPlus = text.includes('+');
        const hasStar = text.includes('⭐');
        
        if (!hasStar) {
            const number = parseInt(text);
            if (!isNaN(number)) {
                let current = 0;
                const increment = number / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        current = number;
                        clearInterval(timer);
                    }
                    
                    stat.textContent = Math.floor(current) + (hasPercent ? '%' : '') + (hasPlus ? '+' : '');
                }, 30);
            }
        }
    });
};

// Trigger counter animation when stats are visible
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

// Suite Card Click Handler
document.querySelectorAll('.btn-suite').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const suiteCard = this.closest('.suite-card');
        const suiteTitle = suiteCard.querySelector('.suite-title').textContent;
        
        // Simulated booking action
        alert(`🏨 Abrindo detalhes de: ${suiteTitle}\n\nEm produção, isso abriria um modal com mais informações e formulário de reserva.`);
    });
});

// Reserve Button Handler
document.querySelectorAll('.btn-reserve, .btn-primary').forEach(button => {
    if (button.textContent.includes('Reservar') || button.textContent.includes('Reserva')) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simulated reservation
            alert('🌟 Sistema de Reservas\n\nEm produção, isso abriria um formulário completo de reserva com:\n\n✓ Seleção de datas\n✓ Escolha de suítes\n✓ Extras e comodidades\n✓ Pagamento seguro');
        });
    }
});

// Lazy Loading for Images (if images were present)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Testimonial Cards Stagger Animation
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 200);
});

// Console Welcome Message
console.log('%c🏨 Luxury Hotel Premium', 'font-size: 24px; font-weight: bold; color: #d4af37; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%cTemplate VIP Loaded Successfully ✨', 'font-size: 14px; color: #666;');
console.log('%cFeatures: Smooth Scroll, Parallax, Animations, Reveal on Scroll', 'font-size: 12px; color: #999;');

// Prevent default form submissions (if any forms exist)
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('📧 Formulário enviado!\n\nEm produção, isso enviaria os dados para o servidor.');
    });
});

// Add dynamic year to footer
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.textContent = `© ${currentYear} Luxury Hotel. Todos os direitos reservados.`;
}

console.log('%c✅ All features loaded and ready!', 'color: #10b981; font-weight: bold;');

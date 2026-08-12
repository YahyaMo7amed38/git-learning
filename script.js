// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Reveal on scroll =====
const sections = document.querySelectorAll('.models, .stats, .gallery, .contact');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

sections.forEach((sec) => {
    sec.classList.add('reveal');
    observer.observe(sec);
});

// ===== Animated counters =====
const stats = document.querySelectorAll('.stat-num');

const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target);
            const duration = 2000;
            const start = performance.now();

            const step = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target).toLocaleString();
                if (progress < 1) requestAnimationFrame(step);
            };

            requestAnimationFrame(step);
            countObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

stats.forEach((stat) => countObserver.observe(stat));

// ===== Parallax on hero title =====
const heroTitle = document.querySelector('.hero-title');

window.addEventListener('scroll', () => {
    if (heroTitle) {
        heroTitle.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    }
});

// ===== Car cards tilt effect =====
document.querySelectorAll('.car-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-15px) scale(1.03) rotateX(${y * -8}deg) rotateY(${x * 8}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
    });
});

// ===== Smooth scrolling for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== Fallback: replace video with animated background if video fails =====
const video = document.getElementById('bgVideo');
if (video) {
    video.addEventListener('error', () => {
        document.body.style.background = 'linear-gradient(135deg, #1a0000, #000 40%, #1a0d00)';
    });
}

// ===== Form submit handler =====
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        btn.textContent = 'Message Sent! ✓';
        btn.style.background = 'linear-gradient(135deg, #00c853, #69f0ae)';
        setTimeout(() => {
            btn.textContent = 'Send Message';
            btn.style.background = '';
            form.reset();
        }, 2500);
    });
}

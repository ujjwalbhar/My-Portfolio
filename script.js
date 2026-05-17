gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const cursor = document.getElementById('custom-cursor');
const blur = document.getElementById('cursor-blur');

// Enhanced cursor tracking
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { 
        x: e.clientX - 6, 
        y: e.clientY - 6, 
        duration: 0.1, 
        ease: 'power2.out' 
    });
    
    gsap.to(blur, { 
        x: e.clientX, 
        y: e.clientY, 
        duration: 0.5, 
        ease: 'power2.out' 
    });

    // Parallax effect on glass orb
    const xPos = (e.clientX / window.innerWidth - 0.5) * 30;
    const yPos = (e.clientY / window.innerHeight - 0.5) * 30;
    gsap.to('.glass-orb', { 
        x: xPos, 
        y: yPos, 
        duration: 0.8, 
        ease: 'power2.out' 
    });
});

// Interactive cursor effects
const interactiveElements = document.querySelectorAll('a, button, .glass-card, .skill-pill, .project-card, .info-card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { 
            scale: 2.5, 
            backgroundColor: 'rgba(0, 217, 255, 0.8)', 
            duration: 0.3 
        });
        
        gsap.to(blur, {
            scale: 1.5,
            opacity: 0.8,
            duration: 0.3
        });
    });
    
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { 
            scale: 1, 
            backgroundColor: '#00d9ff', 
            duration: 0.3 
        });
        
        gsap.to(blur, {
            scale: 1,
            opacity: 1,
            duration: 0.3
        });
    });

    // 3D tilt effect on glass cards
    if (el.classList.contains('glass-card') || el.classList.contains('project-card') || el.classList.contains('info-card')) {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            gsap.to(el, { 
                rotateX: rotateX, 
                rotateY: rotateY, 
                transformPerspective: 1200, 
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(el, { 
                rotateX: 0, 
                rotateY: 0, 
                duration: 0.8, 
                ease: 'elastic.out(1, 0.4)' 
            });
        });
    }
});

// Page Load Animation
const tl = gsap.timeline();

tl.from('.logo', { 
    y: -50, 
    opacity: 0, 
    duration: 0.8, 
    ease: 'power3.out' 
})
.from('.nav-links a', { 
    y: -20, 
    opacity: 0, 
    stagger: 0.1, 
    duration: 0.6 
}, '-=0.4')
.from('.reveal-text', { 
    y: 100, 
    opacity: 0, 
    duration: 1.2, 
    ease: 'expo.out' 
}, '-=0.3')
.from('.fade-in', { 
    opacity: 0, 
    y: 30, 
    duration: 0.8 
}, '-=0.8')
.from('.hero-btns .btn', { 
    scale: 0.5, 
    opacity: 0, 
    stagger: 0.2, 
    duration: 0.8, 
    ease: 'back.out(1.7)' 
}, '-=0.5')
.from('.glass-orb', { 
    scale: 0, 
    opacity: 0, 
    duration: 1.2, 
    ease: 'elastic.out(1, 0.5)' 
}, '-=1');

// Scroll Animations
gsap.utils.toArray('section').forEach((section, index) => {
    const title = section.querySelector('.section-title');
    const cards = section.querySelectorAll('.glass-card, .skill-pill, .project-card, .info-card, .about-card');
    
    if (title) {
        gsap.from(title, {
            scrollTrigger: { 
                trigger: title, 
                start: 'top 85%', 
                toggleActions: 'play none none reverse' 
            },
            opacity: 0, 
            y: 40, 
            duration: 1, 
            ease: 'power3.out'
        });
    }
    
    if (cards.length > 0) {
        gsap.from(cards, {
            scrollTrigger: { 
                trigger: section, 
                start: 'top 75%', 
                toggleActions: 'play none none reverse' 
            },
            opacity: 0, 
            y: 60, 
            scale: 0.85, 
            stagger: 0.12, 
            duration: 1, 
            ease: 'power2.out'
        });
    }
});

// Magnetic Button Effect
const magneticBtns = document.querySelectorAll('.btn');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        if (btn.classList.contains('primary') || btn.classList.contains('secondary')) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, { 
                x: x * 0.25, 
                y: y * 0.25, 
                duration: 0.3, 
                ease: 'power2.out' 
            });
        }
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { 
            x: 0, 
            y: 0, 
            duration: 0.6, 
            ease: 'elastic.out(1, 0.3)' 
        });
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add success animation
        gsap.to(contactForm, {
            scale: 0.95,
            duration: 0.2,
            ease: 'back.out(1.7)',
            onComplete: () => {
                gsap.to(contactForm, {
                    scale: 1,
                    duration: 0.3
                });
                
                // Reset form
                contactForm.reset();
                
                // Show success message
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = '✓ Message Sent!';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                }, 2000);
            }
        });
    });
}

// Smooth scroll behavior with GSAP
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    autoKill: false
                },
                ease: 'power2.inOut'
            });
        }
    });
});

// Parallax background shapes
gsap.to('.shape-1', {
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        markers: false
    },
    y: 500,
    rotation: 360,
    ease: 'none'
});

gsap.to('.shape-2', {
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        markers: false
    },
    y: -500,
    rotation: -360,
    ease: 'none'
});

// Skill pill click interaction
document.querySelectorAll('.skill-pill').forEach(pill => {
    pill.addEventListener('click', () => {
        gsap.to(pill, {
            scale: 1.2,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: 'elastic.out(1.2, 0.8)'
        });
    });
});

// Stagger animation on page load for better performance
window.addEventListener('load', () => {
    gsap.to(document.body, { opacity: 1, duration: 0.5, delay: 0.2 });
});

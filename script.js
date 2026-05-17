gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let mouseX = 0, mouseY = 0;
let ticking = false;

const cursor = document.getElementById('custom-cursor');
const blur = document.getElementById('cursor-blur');

// Throttled cursor tracking with requestAnimationFrame
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!ticking) {
        requestAnimationFrame(updateCursor);
        ticking = true;
    }
});

function updateCursor() {
    gsap.to(cursor, { 
        x: mouseX - 6, 
        y: mouseY - 6, 
        duration: 0.05, 
        overwrite: 'auto'
    });
    
    gsap.to(blur, { 
        x: mouseX, 
        y: mouseY, 
        duration: 0.2, 
        overwrite: 'auto'
    });

    // Parallax effect on glass orb - only on desktop
    if (window.innerWidth > 1024) {
        const xPos = (mouseX / window.innerWidth - 0.5) * 20;
        const yPos = (mouseY / window.innerHeight - 0.5) * 20;
        gsap.to('.glass-orb', { 
            x: xPos, 
            y: yPos, 
            duration: 0.6, 
            overwrite: 'auto'
        });
    }
    
    ticking = false;
}

// Interactive cursor effects - OPTIMIZED
const interactiveElements = document.querySelectorAll('a, button, .glass-card, .skill-pill, .project-card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { 
            scale: 2, 
            backgroundColor: 'rgba(0, 217, 255, 0.8)', 
            duration: 0.2,
            overwrite: 'auto'
        });
        
        gsap.to(blur, {
            scale: 1.3,
            opacity: 0.6,
            duration: 0.2,
            overwrite: 'auto'
        });
    });
    
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { 
            scale: 1, 
            backgroundColor: '#00d9ff', 
            duration: 0.2,
            overwrite: 'auto'
        });
        
        gsap.to(blur, {
            scale: 1,
            opacity: 1,
            duration: 0.2,
            overwrite: 'auto'
        });
    });

    // 3D tilt effect ONLY on desktop & project cards - OPTIMIZED
    if ((el.classList.contains('project-card') || el.classList.contains('glass-card')) && window.innerWidth > 768) {
        let tiltTicking = false;
        
        el.addEventListener('mousemove', (e) => {
            if (!tiltTicking && window.innerWidth > 768) {
                requestAnimationFrame(() => {
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 25;
                    const rotateY = (centerX - x) / 25;
                    
                    gsap.to(el, { 
                        rotateX: rotateX, 
                        rotateY: rotateY, 
                        transformPerspective: 1200, 
                        duration: 0.3,
                        overwrite: 'auto'
                    });
                });
                tiltTicking = true;
                setTimeout(() => { tiltTicking = false; }, 50);
            }
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(el, { 
                rotateX: 0, 
                rotateY: 0, 
                duration: 0.5, 
                overwrite: 'auto'
            });
        });
    }
});

// Page Load Animation
const tl = gsap.timeline();

tl.from('.logo', { 
    y: -50, 
    opacity: 0, 
    duration: 0.6
})
.from('.nav-links a', { 
    y: -20, 
    opacity: 0, 
    stagger: 0.08, 
    duration: 0.5 
}, '-=0.3')
.from('.reveal-text', { 
    y: 80, 
    opacity: 0, 
    duration: 0.8
}, '-=0.2')
.from('.fade-in', { 
    opacity: 0, 
    y: 20, 
    duration: 0.6 
}, '-=0.5')
.from('.hero-btns .btn', { 
    scale: 0.8, 
    opacity: 0, 
    stagger: 0.15, 
    duration: 0.6
}, '-=0.3')
.from('.glass-orb', { 
    scale: 0.5, 
    opacity: 0, 
    duration: 0.8
}, '-=0.5');

// Scroll Animations - SIMPLIFIED
gsap.utils.toArray('section').forEach((section) => {
    const title = section.querySelector('.section-title');
    const cards = section.querySelectorAll('.glass-card, .skill-pill, .project-card');
    
    if (title) {
        gsap.from(title, {
            scrollTrigger: { 
                trigger: title, 
                start: 'top 80%'
            },
            opacity: 0, 
            y: 30, 
            duration: 0.8
        });
    }
    
    if (cards.length > 0) {
        gsap.from(cards, {
            scrollTrigger: { 
                trigger: section, 
                start: 'top 70%'
            },
            opacity: 0, 
            y: 40, 
            scale: 0.9, 
            stagger: 0.1, 
            duration: 0.8
        });
    }
});

// Magnetic Button Effect - OPTIMIZED
const magneticBtns = document.querySelectorAll('.btn');

magneticBtns.forEach(btn => {
    let btnTicking = false;
    
    btn.addEventListener('mousemove', (e) => {
        if (!btnTicking) {
            requestAnimationFrame(() => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(btn, { 
                    x: x * 0.2, 
                    y: y * 0.2, 
                    duration: 0.2, 
                    overwrite: 'auto'
                });
            });
            btnTicking = true;
            setTimeout(() => { btnTicking = false; }, 50);
        }
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { 
            x: 0, 
            y: 0, 
            duration: 0.4
        });
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        gsap.to(contactForm, {
            scale: 0.95,
            duration: 0.15,
            onComplete: () => {
                gsap.to(contactForm, { scale: 1, duration: 0.2 });
                contactForm.reset();
                
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = '✓ Message Sent!';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                }, 1500);
            }
        });
    });
}

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 0.8,
                scrollTo: { y: target, autoKill: false },
                ease: 'power2.inOut'
            });
        }
    });
});

// REMOVED: Expensive parallax shapes with scrub
// Instead using simple CSS animations

// Skill pill click interaction
document.querySelectorAll('.skill-pill').forEach(pill => {
    pill.addEventListener('click', () => {
        gsap.to(pill, {
            scale: 1.15,
            duration: 0.2,
            yoyo: true,
            repeat: 1
        });
    });
});

// Disable animations on mobile
if (window.innerWidth < 768) {
    document.querySelectorAll('.glass-card, .project-card').forEach(el => {
        el.style.perspective = 'none';
    });
}

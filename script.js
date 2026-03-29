// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor Animation
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out"
    });
});

// Hover effects for interactive elements
document.querySelectorAll('a, button, .project-card, .skill-chip, .info-card, .social-icon').forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { 
            scale: 2.5, 
            backgroundColor: "rgba(102, 126, 234, 0.4)", 
            duration: 0.3 
        });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { 
            scale: 1, 
            backgroundColor: "rgba(102, 126, 234, 0.3)", 
            duration: 0.3 
        });
    });
});

// Hero Section Animations
gsap.from(".hero h1", {
    y: 100,
    opacity: 0,
    duration: 1.4,
    ease: "power4.out"
});

gsap.from(".hero p", {
    y: 40,
    opacity: 0,
    duration: 1.2,
    delay: 0.4,
    ease: "power3.out"
});

gsap.from(".hero-btn", {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.7,
    ease: "back.out(1.7)"
});

// Navbar Scroll Effect
const nav = document.querySelector('nav');
ScrollTrigger.create({
    start: "top -50",
    onUpdate: (self) => {
        if (self.direction === 1) { // scrolling down
            gsap.to(nav, { top: -100, duration: 0.3 });
        } else { // scrolling up
            gsap.to(nav, { top: 20, duration: 0.3, background: "rgba(255, 255, 255, 0.4)" });
        }
    }
});

// Section Reveal Animations
document.querySelectorAll('section').forEach(section => {
    const headings = section.querySelectorAll('h2');
    const contentItems = section.querySelectorAll('.project-card, .info-card, .skill-chip, .about-content, .contact-container');
    
    gsap.from(headings, {
        scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 0.8
    });

    gsap.from(contentItems, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out"
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission Feedback
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.submit-btn');
        const originalText = btn.innerText;
        
        btn.innerText = "Message Sent!";
        btn.style.background = "var(--accent-success)";
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))";
            contactForm.reset();
        }, 3000);
    });
}

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor Animation
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out"
    });
});

// Hover effects for interactive elements
document.querySelectorAll('a, button, .project-card, .skill-chip').forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 2, backgroundColor: "rgba(102, 126, 234, 0.5)", duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, backgroundColor: "rgba(0, 0, 0, 0.2)", duration: 0.3 });
    });
});

// Hero Section Animations
gsap.from(".hero h1", {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out"
});

gsap.from(".hero p", {
    y: 50,
    opacity: 0,
    duration: 1.2,
    delay: 0.5,
    ease: "power3.out"
});

gsap.from(".hero-btn", {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    delay: 0.8,
    ease: "back.out(1.7)"
});

// Navbar Animation on Scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        gsap.to(nav, {
            top: 10,
            padding: "10px 25px",
            width: "85%",
            duration: 0.3
        });
    } else {
        gsap.to(nav, {
            top: 20,
            padding: "15px 30px",
            width: "90%",
            duration: 0.3
        });
    }
});

// Reveal Animations for Sections
document.querySelectorAll('section').forEach(section => {
    gsap.from(section.querySelectorAll('h2, .projects-grid, .skills-container, .contact-container'), {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
    });
});

// Skeuomorphic Button Interaction
document.querySelectorAll('.project-link, .submit-btn').forEach(btn => {
    btn.addEventListener('mousedown', () => {
        gsap.to(btn, { scale: 0.95, duration: 0.1 });
    });
    btn.addEventListener('mouseup', () => {
        gsap.to(btn, { scale: 1, duration: 0.1 });
    });
});

// Mobile Nav Toggle (Optional enhancement)
// Implementation would go here if hamburger menu is added

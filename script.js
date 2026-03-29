// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor & Blur Effect
const cursor = document.getElementById('custom-cursor');
const blur = document.getElementById('cursor-blur');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
    });
    gsap.to(blur, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out"
    });
});

// Interactive Elements Hover
const interactiveElements = document.querySelectorAll('a, button, .skeuo-card, .skill-pill');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
            scale: 3,
            backgroundColor: "rgba(109, 93, 252, 0.3)",
            duration: 0.3
        });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            scale: 1,
            backgroundColor: "#6d5dfc",
            duration: 0.3
        });
    });
});

// Hero Animations
const tl = gsap.timeline();
tl.from(".reveal-text span", {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
})
.from(".fade-in", {
    opacity: 0,
    y: 20,
    duration: 0.8
}, "-=0.5")
.from(".hero-btns .btn", {
    opacity: 0,
    x: -30,
    stagger: 0.2,
    duration: 0.6
}, "-=0.3")
.from(".hero-visual .skeuo-box", {
    scale: 0,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.7)"
}, "-=0.8");

// Scroll Triggered Reveals
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    const title = section.querySelector('.section-title');
    const cards = section.querySelectorAll('.skeuo-card, .skill-pill, .timeline-item');
    
    if (title) {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
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
                start: "top 70%",
            },
            opacity: 0,
            y: 50,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out"
        });
    }
});

// Parallax effect for the floating skeuo-box
gsap.to(".floating", {
    scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
    },
    y: 150
});

// Form Submission Interaction
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        gsap.to(btn, {
            scale: 0.9,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });
        alert("Message sent successfully! (Simulation)");
    });
}

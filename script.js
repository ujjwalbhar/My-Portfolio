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
        ease: \"power2.out\"
    });
    gsap.to(blur, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: \"power2.out\"
    });

    // Parallax effect for hero background/visuals based on mouse
    const xPos = (e.clientX / window.innerWidth - 0.5) * 40;
    const yPos = (e.clientY / window.innerHeight - 0.5) * 40;
    
    gsap.to(\".hero-visual .skeuo-box\", {
        x: xPos,
        y: yPos,
        duration: 0.6,
        ease: \"power2.out\"
    });
});

// Interactive Elements Hover
const interactiveElements = document.querySelectorAll('a, button, .skeuo-card, .skill-pill');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
            scale: 3,
            backgroundColor: \"rgba(109, 93, 252, 0.2)\",
            border: \"1px solid rgba(109, 93, 252, 0.5)\",
            duration: 0.3
        });
    });

    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            scale: 1,
            backgroundColor: \"#6d5dfc\",
            border: \"none\",
            duration: 0.3
        });
    });

    // 3D Tilt effect for cards
    if (el.classList.contains('skeuo-card')) {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            gsap.to(el, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                duration: 0.4,
                ease: \"power2.out\"
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.6,
                ease: \"elastic.out(1, 0.5)\"
            });
        });
    }
});

// Hero Animations Timeline
const tl = gsap.timeline();

tl.from(\".logo\", {
    y: -50,
    opacity: 0,
    duration: 0.8,
    ease: \"power3.out\"
})
.from(\"nav ul li\", {
    y: -20,
    opacity: 0,
    stagger: 0.1,
    duration: 0.6
}, \"-=0.4\")
.from(\".reveal-text\", {
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: \"expo.out\"
}, \"-=0.3\")
.from(\".fade-in\", {
    opacity: 0,
    y: 30,
    duration: 0.8
}, \"-=0.8\")
.from(\".hero-btns .btn\", {
    scale: 0.5,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: \"back.out(1.7)\"
}, \"-=0.5\")
.from(\".hero-visual .skeuo-box\", {
    scale: 0,
    rotation: 45,
    opacity: 0,
    duration: 1.2,
    ease: \"elastic.out(1, 0.5)\"
}, \"-=1\");

// Scroll Triggered Reveals for Sections
gsap.utils.toArray('section').forEach(section => {
    const title = section.querySelector('.section-title');
    const cards = section.querySelectorAll('.skeuo-card, .skill-pill, .timeline-item');

    if (title) {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: \"top 85%\",
                toggleActions: \"play none none reverse\"
            },
            opacity: 0,
            y: 40,
            filter: \"blur(10px)\",
            duration: 1,
            ease: \"power3.out\"
        });
    }

    if (cards.length > 0) {
        gsap.from(cards, {
            scrollTrigger: {
                trigger: section,
                start: \"top 75%\",
                toggleActions: \"play none none reverse\"
            },
            opacity: 0,
            y: 60,
            scale: 0.9,
            stagger: 0.15,
            duration: 1,
            ease: \"power2.out\"
        });
    }
});

// Magnetic effect for buttons
const magneticBtns = document.querySelectorAll('.btn');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: \"power2.out\"
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: \"elastic.out(1, 0.3)\"
        });
    });
});

// Smooth reveal for skill pills with random delays
gsap.from(\".skill-pill\", {
    scrollTrigger: {
        trigger: \".skills-wrapper\",
        start: \"top 80%\"
    },
    opacity: 0,
    scale: 0,
    duration: 0.8,
    stagger: {
        amount: 1,
        from: \"center\"
    },
    ease: \"back.out(2)\"
});

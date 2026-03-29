gsap.registerPlugin(ScrollTrigger);

const cursor = document.getElementById('custom-cursor');
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

cursor.style.cssText = 'left: 50%; top: 50%;';

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
});

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 1.5, duration: 0.2 });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, duration: 0.2 });
    });
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const heroTimeline = gsap.timeline();
heroTimeline
    .from('.terminal-window', { scale: 0.8, opacity: 0, duration: 1, ease: 'power3.out' })
    .from('.terminal-line', { opacity: 0, x: -20, stagger: 0.1, duration: 0.5 }, '-=0.5')
    .from('#hero-name', { opacity: 0, y: 20, duration: 0.8 }, '-=0.3');

const nameEl = document.getElementById('hero-name');
if (nameEl) {
    const text = nameEl.textContent;
    nameEl.textContent = '';
    text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        nameEl.appendChild(span);
        gsap.from(span, {
            opacity: 0,
            y: -20,
            rotation: Math.random() * 20 - 10,
            duration: 0.5,
            delay: i * 0.05,
            ease: 'back.out'
        });
    });
}

gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section.querySelectorAll('.section-title'), {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -50,
        duration: 1
    });
});

const projectsContainer = document.getElementById('projectsContainer');
if (projectsContainer) {
    gsap.to(projectsContainer, {
        x: () => -(projectsContainer.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
            trigger: '.projects-section',
            pin: true,
            scrub: 1,
            end: () => `+=${projectsContainer.scrollWidth}`
        }
    });
}

const statValues = document.querySelectorAll('.stat-value');
statValues.forEach(stat => {
    const target = parseInt(stat.dataset.target);
    ScrollTrigger.create({
        trigger: stat,
        start: 'top 80%',
        onEnter: () => {
            gsap.to(stat, {
                textContent: target,
                duration: 2,
                snap: { textContent: 1 },
                ease: 'power1.out'
            });
        }
    });
});

const skillBars = document.querySelectorAll('.skill-progress');
skillBars.forEach(bar => {
    const width = bar.dataset.width;
    gsap.from(bar, {
        width: 0,
        scrollTrigger: {
            trigger: bar,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.5,
        ease: 'power2.out'
    });
    bar.style.width = `${width}%`;
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

window.addEventListener('load', () => {
    // Smooth Loader Animation
    gsap.to('#loader', {
        opacity: 0,
        duration: 1.5,
        ease: 'power4.inOut',
        onComplete: () => {
            const loader = document.querySelector('#loader');
            if (loader) loader.style.display = 'none';
            initAnimations();
        }
    });
});

function initAnimations() {
    // Custom Cursor
    const cursor = document.querySelector('#cursor');
    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
    });

    // Entrance Reveal
    gsap.from('.reveal-text', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out'
    });

    // 3D Motion Effect for Hero Card
    const heroCard = document.querySelector('#heroCard .card-inner');
    if (heroCard) {
        window.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            gsap.to(heroCard, {
                rotateY: xAxis,
                rotateX: yAxis,
                duration: 0.5
            });
        });
    }

    // Parallax Effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        gsap.to('.parallax-bg', {
            y: scrolled * 0.1,
            duration: 0.5
        });
    });

    // Micro Interactions for Cards
    gsap.utils.toArray('.skeuo-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                boxShadow: '30px 30px 60px #000, -30px -30px 60px #1c1c1c',
                scale: 1.05,
                duration: 0.3
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                boxShadow: '15px 15px 30px #000, -15px -15px 30px #1c1c1c',
                scale: 1,
                duration: 0.3
            });
        });
    });

    // ScrollReveal with ScrollTrigger
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects-section',
            start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.3
    });

    gsap.from('.skill-pill', {
        scrollTrigger: {
            trigger: '.skills-section',
            start: 'top 80%'
        },
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    });
}

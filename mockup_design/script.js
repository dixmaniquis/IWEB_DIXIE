// ---------- Mobile Menu ----------
const menuToggle = document.querySelector('.menu-toggle');
const menuList = document.querySelector('header > nav > ul');

if (menuToggle && menuList) {
    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.classList.toggle('open');
        menuToggle.classList.toggle('close', !isOpen);
        menuList.classList.toggle('open', isOpen);
        menuList.classList.toggle('close', !isOpen);
        menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Closes the menu after tapping a link
    menuList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('open');
            menuToggle.classList.add('close');
            menuList.classList.remove('open');
            menuList.classList.add('close');
            menuToggle.setAttribute('aria-label', 'Open menu');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// ---------- Scent Carousel ----------
document.querySelectorAll('.collection').forEach(collection => {
    const cards = collection.querySelectorAll('.scent-card');
    const leftArrow = collection.querySelector('.left-arrow');
    const rightArrow = collection.querySelector('.right-arrow');
    if (!cards.length || !leftArrow || !rightArrow) return;
 
    const total = cards.length;
    let current = 0;
 
    function updateCarousel() {
        cards.forEach(card => {
            const index = Number(card.dataset.index);
            const position = (index - current + total) % total;
 
            card.classList.remove('left', 'center', 'right', 'hidden');
 
            if (position === 0) card.classList.add('center');
            else if (position === 1) card.classList.add('right');
            else if (position === total - 1) card.classList.add('left');
            else card.classList.add('hidden');
        });
    }
 
    rightArrow.addEventListener('click', () => {
        current = (current + 1) % total;
        updateCarousel();
    });
 
    leftArrow.addEventListener('click', () => {
        current = (current - 1 + total) % total;
        updateCarousel();
    });
});

// ---------- Inside This Scent Infos ----------
document.querySelectorAll('.collection').forEach(collection => {
    const toggle = collection.querySelector('.info-toggle');
    const panels = collection.querySelectorAll('.info-panel');
    const arrows = collection.querySelectorAll('.carousel-arrow');
    if (!toggle || !panels.length) return;

    function updatePanels() {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        const center = collection.querySelector('.scent-card.center');
        const centerIndex = center ? center.dataset.index : null;

        panels.forEach(panel => {
            panel.classList.toggle('active', isOpen && panel.dataset.index === centerIndex);
        });
    }

    toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !isOpen);
        updatePanels();
    });

    arrows.forEach(arrow => arrow.addEventListener('click', updatePanels));
});

// ---------- Smooth Scrol to Up ----------
const thisPage = location.pathname.split('/').pop() || 'home.html';

document.querySelectorAll('.footer-nav a').forEach(link => {
    link.addEventListener('click', event => {
        if (link.getAttribute('href') === thisPage) {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});
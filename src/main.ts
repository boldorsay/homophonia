import './style.css';
import { initCustomScroll } from './TS/Scroll';

initCustomScroll();

document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menu-button');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu-item a');
    const image = document.querySelector('.hover-image') as HTMLElement;
    const text = document.querySelector('.hover-text') as HTMLElement;
    const number = document.querySelectorAll('.page-number');

    if (image && text && number.length > 0) {
        // Set initial transitions
        image.style.transition = 'transform 0.3s ease';
        text.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

        image.addEventListener('click', () => {
            console.log('click');
            if (image.style.transform === 'scale(1.1)' || image.style.transform === '') {
                image.style.transform = 'scale(4)';
                image.style.zIndex = '100';
                text.style.opacity = '0';
                if (number[1]) (number[1] as HTMLElement).style.opacity = '0';
            } else {
                image.style.transform = 'scale(1.1)';
                text.style.opacity = '1';
                if (number[1]) (number[1] as HTMLElement).style.opacity = '1';
            }
        });

        image.addEventListener('mouseenter', () => {
            console.log('mouseover');
            text.style.opacity = '1';
        });

        image.addEventListener('mouseleave', () => {
            console.log('mouseleave');
            text.style.opacity = '0';
        });
    }

    if (menuButton) {
        menuButton.addEventListener('click', () => {
            if (menu) {
                menu.classList.toggle('visible');
            }
        });
    }

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId) {
                const targetElement = document.querySelector(targetId);
                if (targetElement && menu) {
                    window.scrollTo({ top: (targetElement as HTMLElement).offsetTop, behavior: 'instant' });
                    menu.classList.remove('visible');
                }
            }
        });
    });
});
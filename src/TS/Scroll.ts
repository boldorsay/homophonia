
function scrollSpeedAt(
    x: number,
    opts: { min?: number; max?: number; easing?: 'bell' | 'easeInOutSine' | 'easeInOutQuad' | 'linear' } = {}
): number {
    const { min = 0.05, max = 0.5, easing = 'bell' } = opts;
    const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);
    const t = clamp(x, 0, 1);

    let e: number;
    switch (easing) {
        case 'bell':
            e = Math.sin(Math.PI * t);
            break;
        case 'easeInOutSine':
            e = 0.5 - 0.5 * Math.cos(Math.PI * t);
            break;
        case 'easeInOutQuad':
            e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
            break;
        default:
            e = t;
    }

    return min + (max - min) * e;
}

export function initCustomScroll() {

    const cumulativeHeights: number[] = []; // Array to store cumulative heights

    const onScroll = () => {
        const scrollY = Math.round(window.scrollY); // Use Lenis for scroll position
        const textElement = document.querySelector<HTMLElement>('.scroll-value');
        const sections = document.querySelectorAll<HTMLElement>('.page');

        if (textElement) {
            // Keep the text element centered
            textElement.style.position = 'fixed';
            textElement.style.top = '50%';
            textElement.style.left = '50%';
            textElement.style.transform = 'translate(-50%, -50%)';

            // Update the text content with the scroll value
            textElement.textContent = `Scroll Position: ${scrollY}px`;

            // Check each section to determine if the central text should change color
            let hasHighlighted = false;

            sections.forEach((section, index) => {
                const nextSection = sections[index + 1];
                if (nextSection && !hasHighlighted) {
                    const nextSectionTop = section.offsetTop + section.offsetHeight;
                    const rangeStart = nextSectionTop - section.offsetHeight * 0.1;

                    if (scrollY >= rangeStart && scrollY < nextSectionTop) {
                        textElement.style.color = 'red';
                        hasHighlighted = true; // Pour ne pas changer la couleur ensuite

                    }
                }
            });

            // Si aucune section ne matche, mettre en rouge
            if (!hasHighlighted) {
                textElement.style.color = 'black';
            }
        }

        sections.forEach((section, index) => {
            // Calculate the cumulative height to the top of the section
            const cumulativeHeight = section.offsetTop;
            cumulativeHeights[index] = cumulativeHeight; // Store in array

            // Assume each section has a title element
            // const title = section.querySelector<HTMLElement>('h1');
            // if (title) {
            //     // Update the title with the cumulative height
            //     title.textContent = `Cumulative Height: ${cumulativeHeight}px`;
            // }
        });
    };

    window.addEventListener('scroll', onScroll);
}

window.addEventListener('wheel', (e) => {
    e.preventDefault();
    const scrollY = window.scrollY;
    const sections = document.querySelectorAll<HTMLElement>('.page');
    let speedFactor = 1;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const redZoneStart = sectionTop + sectionHeight * 0.8;
        const redZoneEnd = sectionTop + sectionHeight;

        if (scrollY >= redZoneStart && scrollY < redZoneEnd) {
            const positionInRedZone = (scrollY - redZoneStart) / (redZoneEnd - redZoneStart);
            speedFactor = scrollSpeedAt(positionInRedZone, { easing: 'easeInOutSine' });
        }
    });

    const adjustedDelta = e.deltaY * speedFactor;
    window.scrollBy(0, adjustedDelta);
}, { passive: false });

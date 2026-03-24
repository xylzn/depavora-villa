// Tailwind Configuration
tailwind.config = {
    theme: {
        extend: {
            colors: {
                rustic: '#532D1c', // BrownDer
                copper: '#876635', // Copper
                nutty: '#583924',  // NuttyBrown
                leaves: '#c29666', // Withered Leaves
                chestnut: '#68621F', // Golden Chestnut
                cream: '#fdf0d5', // Warm Cream
                'warm-bg': '#f5e6ca', // Even warmer background
                brown: {
                    50: '#fdf0d5',
                    100: '#f5e6ca',
                    200: '#c29666', // Withered Leaves
                    300: '#876635', // Copper
                    400: '#68621F', // Golden Chestnut
                    500: '#583924', // NuttyBrown
                    600: '#532D1c', // BrownDer
                    700: '#3d2b1f',
                    800: '#2d1b0f',
                    900: '#1d0b00',
                }
            }
        }
    }
}

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
});


// Carousel/Slider Logic
function setupCarousel(carouselId, prevBtnId, nextBtnId) {
    const carousel = document.getElementById(carouselId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);

    if (!carousel || !prevBtn || !nextBtn) return;

    const getScrollAmount = () => {
        const item = carousel.querySelector('.carousel-item');
        if (!item) return 0;
        // Get actual width including margin/gap if any
        const style = window.getComputedStyle(carousel);
        const gap = parseInt(style.gap) || 0;
        return item.offsetWidth + gap;
    };

    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: getScrollAmount(),
            behavior: 'smooth'
        });
    });

    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: -getScrollAmount(),
            behavior: 'smooth'
        });
    });

    // Optional: Hide/Show arrows based on scroll position (Desktop only)
    carousel.addEventListener('scroll', () => {
        // Only update if arrows are visible (Desktop/lg breakpoint >= 1024px)
        if (window.innerWidth >= 1024) {
            const isAtStart = carousel.scrollLeft <= 10;
            const isAtEnd = carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 10;
            
            prevBtn.style.opacity = isAtStart ? '0.3' : '1';
            prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
            
            nextBtn.style.opacity = isAtEnd ? '0.3' : '1';
            nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        }
    });

    // Trigger initial scroll check
    carousel.dispatchEvent(new Event('scroll'));
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Carousels
    setupCarousel('suites-carousel', 'suites-prev', 'suites-next');
    setupCarousel('fac-carousel', 'fac-prev', 'fac-next');
    setupCarousel('pkg-carousel', 'pkg-prev', 'pkg-next');

    // Sidebar
    const menuBtn = document.getElementById('menu-btn');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const closeSidebar = document.getElementById('close-sidebar');

    if (menuBtn && mobileSidebar && sidebarOverlay) {
        const toggleSidebar = (show) => {
            if (show) {
                sidebarOverlay.classList.remove('hidden');
                setTimeout(() => {
                    sidebarOverlay.classList.add('opacity-100');
                    mobileSidebar.classList.remove('translate-x-full');
                }, 10);
                document.body.style.overflow = 'hidden';
            } else {
                sidebarOverlay.classList.remove('opacity-100');
                mobileSidebar.classList.add('translate-x-full');
                setTimeout(() => {
                    sidebarOverlay.classList.add('hidden');
                }, 300);
                document.body.style.overflow = '';
            }
        };

        menuBtn.addEventListener('click', () => toggleSidebar(true));
        closeSidebar.addEventListener('click', () => toggleSidebar(false));
        sidebarOverlay.addEventListener('click', () => toggleSidebar(false));

        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.addEventListener('click', () => toggleSidebar(false));
        });
    }

    // Custom Cursor Logic
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');

    if (cursor && follower) {
        let posX = 0;
        let posY = 0;
        let mouseX = 0;
        let mouseY = 0;

        let currentScale = 1;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Use requestAnimationFrame for smoother cursor
        function animateCursor() {
            // Smooth movement for follower
            posX += (mouseX - posX) * 0.15;
            posY += (mouseY - posY) * 0.15;

            cursor.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
            follower.style.transform = `translate3d(${posX - 20}px, ${posY - 20}px, 0) scale(${currentScale})`;
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        document.addEventListener('mousedown', () => {
            currentScale = 0.8;
            follower.style.backgroundColor = 'rgba(121, 85, 72, 0.2)';
        });

        document.addEventListener('mouseup', () => {
            currentScale = 1;
            follower.style.backgroundColor = 'transparent';
        });

        // Add hover effect for interactive elements
        function updateHoverEffects() {
            const interactiveElements = document.querySelectorAll('a, button, .slider-btn, .card-hover');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    currentScale = 1.8;
                    follower.style.backgroundColor = 'rgba(121, 85, 72, 0.1)';
                    // If it's a slider btn, maybe make the cursor even more subtle
                    if (el.classList.contains('slider-btn')) {
                        follower.style.borderStyle = 'dashed';
                    }
                });
                el.addEventListener('mouseleave', () => {
                    currentScale = 1;
                    follower.style.backgroundColor = 'transparent';
                    follower.style.borderStyle = 'solid';
                });
            });
        }
        updateHoverEffects();
    }
});

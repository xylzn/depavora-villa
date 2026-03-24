// Tailwind Configuration
tailwind.config = {
    theme: {
        extend: {
            colors: {
                nature: '#2e352f',
                rustic: '#3d2b1f',
                cream: '#fdf0d5',
                wood: '#c6a482',
                brown: {
                    50: '#fdf0d5',
                    100: '#f5e6ca',
                    200: '#e1caaa',
                    300: '#c6a482',
                    400: '#a1887f',
                    500: '#8d6e63',
                    600: '#795548',
                    700: '#5d4037',
                    800: '#4e342e',
                    900: '#3d2b1f',
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

// Mobile Sidebar Toggle
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

    // Close sidebar on link click
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', () => toggleSidebar(false));
    });
}

// Carousel/Slider Logic
function setupCarousel(carouselId, prevBtnId, nextBtnId) {
    const carousel = document.getElementById(carouselId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);

    if (!carousel || !prevBtn || !nextBtn) return;

    const getScrollAmount = () => {
        const item = carousel.querySelector('.carousel-item');
        if (!item) return 0;
        // Scroll by the width of one item + the gap
        return item.offsetWidth + 24; // 24px is the gap-6/gap-8 (approx)
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

// Initialize Carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupCarousel('fac-carousel', 'fac-prev', 'fac-next');
    setupCarousel('pkg-carousel', 'pkg-prev', 'pkg-next');
});

// Custom Cursor Logic
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

if (cursor && follower) {
    let posX = 0;
    let posY = 0;

    document.addEventListener('mousemove', (e) => {
        posX = e.clientX;
        posY = e.clientY;

        // Small dot follows immediately
        cursor.style.transform = `translate3d(${posX - 4}px, ${posY - 4}px, 0)`;
        
        // Large circle follows with a slight delay (CSS transition handles this)
        follower.style.transform = `translate3d(${posX - 20}px, ${posY - 20}px, 0)`;
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = `translate3d(${posX - 4}px, ${posY - 4}px, 0) scale(0.5)`;
        follower.style.transform = `translate3d(${posX - 20}px, ${posY - 20}px, 0) scale(1.5)`;
        follower.style.backgroundColor = 'rgba(121, 85, 72, 0.1)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = `translate3d(${posX - 4}px, ${posY - 4}px, 0) scale(1)`;
        follower.style.transform = `translate3d(${posX - 20}px, ${posY - 20}px, 0) scale(1)`;
        follower.style.backgroundColor = 'transparent';
    });

    // Add hover effect for interactive elements
    const links = document.querySelectorAll('a, button, .group');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            follower.style.transform += ' scale(2)';
            follower.style.borderColor = '#b08968';
            follower.style.backgroundColor = 'rgba(176, 137, 104, 0.1)';
            cursor.style.backgroundColor = '#b08968';
        });
        link.addEventListener('mouseleave', () => {
            follower.style.borderColor = '#795548';
            follower.style.backgroundColor = 'transparent';
            cursor.style.backgroundColor = '#795548';
        });
    });
}

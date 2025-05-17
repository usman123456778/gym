document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800, // Default animation duration
        once: true,     // Animation happens only once
        offset: 100,    // Offset from original trigger point
        easing: 'ease-in-out-cubic',
    });

    const body = document.body;
    const siteHeader = document.querySelector('.site-header-main');
    const menuToggle = document.querySelector('.site-header-main .menu-toggle-btn, .site-header-main .nav-toggle'); // Combined selector
    const navMenu = document.querySelector('.site-header-main .nav-menu');
    const themeToggleBtn = document.querySelector('.theme-toggle-btn');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    // --- Sticky Header & Scrolled Class ---
    function handleHeaderScroll() {
        if (siteHeader) {
            if (window.scrollY > 50) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        }
    }

    // --- Theme Toggle ---
    function applyTheme(theme) {
        body.classList.remove('light-mode', 'dark-mode');
        body.classList.add(theme + '-mode');

        if (theme === 'dark') {
            body.style.setProperty('--current-primary', 'var(--primary-color-dark)');
            body.style.setProperty('--current-primary-hover', 'var(--primary-hover-dark)');
            body.style.setProperty('--current-secondary', 'var(--secondary-color-dark)');
            body.style.setProperty('--current-accent', 'var(--accent-color-dark)');
            body.style.setProperty('--current-bg', 'var(--bg-dark)');
            body.style.setProperty('--current-card-bg', 'var(--card-bg-dark)');
            body.style.setProperty('--current-text', 'var(--text-light-dark)');
            body.style.setProperty('--current-text-muted', 'var(--text-muted-dark)');
            body.style.setProperty('--current-border', 'var(--border-color-dark)');
            body.style.setProperty('--current-shadow', 'var(--shadow-dark)');
            body.style.setProperty('--current-shadow-strong', 'var(--shadow-strong-dark)');
            body.style.setProperty('--current-footer-bg', 'var(--footer-bg-dark)');
            body.style.setProperty('--current-footer-text', 'var(--footer-text-dark)');
            body.style.setProperty('--current-footer-heading', 'var(--footer-heading-dark)');
            body.style.setProperty('--current-footer-link-hover', 'var(--footer-link-hover-dark)');
            body.style.setProperty('--current-footer-bottom-bg', 'var(--footer-bottom-bg-dark)');
            body.style.setProperty('--current-footer-bottom-text', 'var(--footer-bottom-text-dark)');
            body.style.setProperty('--primary-rgb', '255, 140, 0'); // Dark theme orange RGB
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        } else { // Light mode
            body.style.setProperty('--current-primary', 'var(--primary-color-light)');
            body.style.setProperty('--current-primary-hover', 'var(--primary-hover-light)');
            body.style.setProperty('--current-secondary', 'var(--secondary-color-light)');
            body.style.setProperty('--current-accent', 'var(--accent-color-light)');
            body.style.setProperty('--current-bg', 'var(--bg-light)');
            body.style.setProperty('--current-card-bg', 'var(--card-bg-light)');
            body.style.setProperty('--current-text', 'var(--text-dark-light)');
            body.style.setProperty('--current-text-muted', 'var(--text-muted-light)');
            body.style.setProperty('--current-border', 'var(--border-color-light)');
            body.style.setProperty('--current-shadow', 'var(--shadow-light)');
            body.style.setProperty('--current-shadow-strong', 'var(--shadow-strong-light)');
            body.style.setProperty('--current-footer-bg', 'var(--footer-bg-light)');
            body.style.setProperty('--current-footer-text', 'var(--footer-text-light)');
            body.style.setProperty('--current-footer-heading', 'var(--footer-heading-light)');
            body.style.setProperty('--current-footer-link-hover', 'var(--footer-link-hover-light)');
            body.style.setProperty('--current-footer-bottom-bg', 'var(--footer-bottom-bg-light)');
            body.style.setProperty('--current-footer-bottom-text', 'var(--footer-bottom-text-light)');
            body.style.setProperty('--primary-rgb', '255, 165, 0'); // Light theme orange RGB
            if (themeIcon) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }
         // After applying theme, re-check header scroll state to apply correct scrolled colors
        handleHeaderScroll();
    }

    if (themeToggleBtn) {
        const savedTheme = localStorage.getItem('theStudioTheme') || 'light'; // Default to light
        applyTheme(savedTheme);

        themeToggleBtn.addEventListener('click', () => {
            const newTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
            applyTheme(newTheme);
            localStorage.setItem('theStudioTheme', newTheme);
        });
    } else {
        // If no theme toggle button (e.g. on login page without header), apply default or saved theme
        const savedTheme = localStorage.getItem('theStudioTheme') || 'light';
        applyTheme(savedTheme);
    }


    // --- Mobile Navigation Toggle ---
    if (menuToggle && navMenu) {
        const menuIcon = menuToggle.querySelector('i'); // For FontAwesome icon
        const hamburgerSpan = menuToggle.querySelector('.hamburger'); // For span-based hamburger

        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('nav-menu-visible');
            const isExpanded = navMenu.classList.contains('nav-menu-visible');
            menuToggle.setAttribute('aria-expanded', isExpanded.toString());

            if (menuIcon) { // FA icon toggle
                if (isExpanded) {
                    menuIcon.classList.remove('fa-bars');
                    menuIcon.classList.add('fa-times');
                } else {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
            if (hamburgerSpan) { // Span hamburger toggle
                 menuToggle.classList.toggle('is-active'); // This toggles the X for span hamburger
            }
        });

        // Close mobile menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('nav-menu-visible')) {
                    navMenu.classList.remove('nav-menu-visible');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    if (menuIcon) {
                        menuIcon.classList.remove('fa-times');
                        menuIcon.classList.add('fa-bars');
                    }
                    if (hamburgerSpan) {
                        menuToggle.classList.remove('is-active');
                    }
                }
            });
        });
    }

    // --- Active Navigation Link Highlighting ---
    const sections = document.querySelectorAll('section[id]');
    const navLinksAnchors = document.querySelectorAll('.site-header-main .nav-links a');
    const navbarHeight = siteHeader ? siteHeader.offsetHeight : 70;

    function highlightActiveLink() {
        let currentSectionId = '';
        const scrollPosition = pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollPosition >= sectionTop - navbarHeight - 100) { // Adjusted offset
                currentSectionId = section.getAttribute('id');
            }
        });
        
        const currentPage = window.location.pathname.split("/").pop() || 'index.html';
        let pageSpecificLinkFound = false;

        navLinksAnchors.forEach(anchor => {
            anchor.classList.remove('active');
            const anchorHref = anchor.getAttribute('href');

            // Check if link points to current page (e.g., member.html)
            if (anchorHref === currentPage) {
                anchor.classList.add('active');
                pageSpecificLinkFound = true;
            }
            // If on index.html, highlight based on section scroll
            if (currentPage === 'index.html' || currentPage === '') {
                 if (anchorHref === `#${currentSectionId}`) {
                    if (!pageSpecificLinkFound) navLinksAnchors.forEach(l => l.classList.remove('active')); // Clear others if not page specific
                    anchor.classList.add('active');
                }
            }
        });
         // Default to 'Home' or first link if no section is active on index.html (e.g., at top)
        if ((currentPage === 'index.html' || currentPage === '') && !pageSpecificLinkFound && !document.querySelector('.site-header-main .nav-links a.active') && navLinksAnchors.length > 0) {
            if (scrollPosition < sections[0]?.offsetTop - navbarHeight - 100) { // If above the first section
                 navLinksAnchors.forEach(l => l.classList.remove('active'));
                 const homeLink = document.querySelector('.site-header-main .nav-links a[href="#hero"], .site-header-main .nav-links a[href="index.html"]');
                 if (homeLink) homeLink.classList.add('active');
            }
        }
    }


    // --- Parallax for Hero Background (index.html) ---
    const heroBg = document.querySelector('.hero-parallax .hero-background-image');
    const parallaxMiddleImg = document.querySelector('.hero-parallax .middle-image');
    const parallaxRightImg = document.querySelector('.hero-parallax .right-image');

    function handleHeroParallax() {
        if (!heroBg && !parallaxMiddleImg && !parallaxRightImg) return; // Only run if elements exist

        const scrollPosition = window.pageYOffset;
        if (heroBg) {
            // Make the background appear to move slower than the scroll
            heroBg.style.transform = `translateY(${scrollPosition * 0.3}px) scale(1.1)`;
        }
        if (parallaxMiddleImg) {
            // Move up and slightly change rotation or x-offset for more dynamic feel
            parallaxMiddleImg.style.transform = `translate(-50%, calc(-50% + ${scrollPosition * 0.15}px)) rotate(-2deg) translateX(${scrollPosition * 0.05}px)`;
        }
        if (parallaxRightImg) {
            parallaxRightImg.style.transform = `translateY(calc(-50% + ${scrollPosition * 0.1}px)) rotate(2deg) translateX(-${scrollPosition * 0.03}px)`;
        }
    }

    // --- Event Listener for Scroll ---
    window.addEventListener('scroll', () => {
        handleHeaderScroll();
        if (sections.length > 0 && navLinksAnchors.length > 0) {
            highlightActiveLink();
        }
        handleHeroParallax(); // Call hero parallax on scroll
    });

    // Initial calls
    handleHeaderScroll();
    if (sections.length > 0 && navLinksAnchors.length > 0) {
        highlightActiveLink(); // Initial check for active link
    }
    handleHeroParallax(); // Initial parallax position


    // --- Dynamic Copyright Year (for footers) ---
    const yearSpan = document.getElementById('currentYear'); // In index.html footer
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    // For gym-contact.html (it has its own script but if we consolidate, this would be here)
    // const yearSpanGym = document.getElementById('currentYearGymContact');
    // if (yearSpanGym) {
    //     yearSpanGym.textContent = new Date().getFullYear();
    // }


    // --- Intersection Observer for general .animate-on-scroll elements (from member/program pages) ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const generalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // generalObserver.unobserve(entry.target); // Optional: stop observing once animated
            } else {
                // Optional: remove class if you want animation to replay on scroll up
                // entry.target.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => {
        generalObserver.observe(el);
    });
    // Make sure site-footer also gets animated if it doesn't have .animate-on-scroll
    const siteFooterForAnimation = document.querySelector('.site-footer');
    if (siteFooterForAnimation && !siteFooterForAnimation.classList.contains('animate-on-scroll')) {
        generalObserver.observe(siteFooterForAnimation);
    }


    // --- Form specific logic (e.g. gym-contact.html) would go here if not inlined ---
    // Example:
    // const gymContactForm = document.getElementById('gymContactForm');
    // if (gymContactForm) { /* ... gym contact form logic ... */ }
});
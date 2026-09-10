/**
 * Executive Portfolio - Jason Athaide
 * Core JavaScript Logic & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCaseStudyTabs();
    initRecruiterScanMode();
    initAnimatedMetrics();
    initContactModal();
});

/**
 * Navigation Bar Scroll & Mobile Menu Toggle
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinksContainer = document.getElementById('navLinks');

    // Scroll Navbar Background Shift
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(7, 13, 27, 0.96)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.backgroundColor = 'rgba(7, 13, 27, 0.88)';
            navbar.style.boxShadow = 'none';
        }

        // Highlight Active Nav Link
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Menu Toggle
    if (mobileMenuToggle && navLinksContainer) {
        mobileMenuToggle.addEventListener('click', () => {
            const isOpen = navLinksContainer.style.display === 'flex';
            navLinksContainer.style.display = isOpen ? 'none' : 'flex';
            if (!isOpen) {
                navLinksContainer.style.flexDirection = 'column';
                navLinksContainer.style.position = 'absolute';
                navLinksContainer.style.top = '76px';
                navLinksContainer.style.left = '0';
                navLinksContainer.style.width = '100%';
                navLinksContainer.style.backgroundColor = '#0F172A';
                navLinksContainer.style.padding = '20px';
                navLinksContainer.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
            }
        });
    }
}

/**
 * Interactive Executive Case Study Tabs
 */
function initCaseStudyTabs() {
    const tabBtns = document.querySelectorAll('.case-tab-btn');
    const tabPanes = document.querySelectorAll('.case-study-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');

            // Deactivate all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Activate target
            btn.classList.add('active');
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}

/**
 * 30-Second Recruiter Quick Scan Mode Toggle
 */
function initRecruiterScanMode() {
    const toggleBtn = document.getElementById('toggleRecruiterMode');
    const recruiterBanner = document.getElementById('recruiterBanner');
    const closeBannerBtn = document.getElementById('closeRecruiterBanner');

    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        const isActive = document.body.classList.toggle('recruiter-mode-active');
        toggleBtn.classList.toggle('active', isActive);

        if (recruiterBanner) {
            recruiterBanner.style.display = isActive ? 'block' : 'none';
        }

        if (isActive) {
            // Smoothly scroll to top hero metrics
            const impactSection = document.getElementById('impact');
            if (impactSection) {
                impactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    if (closeBannerBtn) {
        closeBannerBtn.addEventListener('click', () => {
            document.body.classList.remove('recruiter-mode-active');
            toggleBtn.classList.remove('active');
            if (recruiterBanner) {
                recruiterBanner.style.display = 'none';
            }
        });
    }
}

/**
 * Metric Counter Animations on Scroll
 */
function initAnimatedMetrics() {
    const metricElements = document.querySelectorAll('.metric-value[data-count]');
    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                metricElements.forEach(el => {
                    const target = parseInt(el.getAttribute('data-count'), 10);
                    const suffix = el.innerText.replace(/[0-9]/g, '');
                    let current = 0;
                    const increment = Math.ceil(target / 40);
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        el.innerText = `${current}${suffix}`;
                    }, 30);
                });
            }
        });
    }, { threshold: 0.5 });

    const metricsCard = document.querySelector('.hero-metrics-card');
    if (metricsCard) {
        observer.observe(metricsCard);
    }
}

/**
 * Direct Contact Modal Popup
 */
function initContactModal() {
    const openBtn = document.getElementById('openContactDrawer');
    const closeBtn = document.getElementById('closeContactModal');
    const modal = document.getElementById('contactModal');

    if (openBtn && modal) {
        openBtn.addEventListener('click', () => {
            modal.classList.add('active');
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
}

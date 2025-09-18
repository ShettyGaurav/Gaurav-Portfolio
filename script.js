// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = this.themeToggle.querySelector('.theme-icon');
        
        this.init();
    }
    
    init() {
        // Apply saved theme
        this.applyTheme();
        
        // Set up theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.theme = e.matches ? 'dark' : 'light';
                this.applyTheme();
            }
        });
    }
    
    applyTheme() {
        if (this.theme === 'light') {
            document.body.classList.add('light-theme');
            this.themeIcon.textContent = '☀️';
        } else {
            document.body.classList.remove('light-theme');
            this.themeIcon.textContent = '🌙';
        }
    }
    
    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
        
        // Add transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section, header');
        
        this.init();
    }
    
    init() {
        // Smooth scrolling for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Active navigation highlight
        window.addEventListener('scroll', () => this.updateActiveNav());
        
        // Navbar background on scroll
        window.addEventListener('scroll', () => this.updateNavbarBackground());
    }
    
    updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    updateNavbarBackground() {
        if (window.scrollY > 50) {
            this.navbar.style.backgroundColor = 'var(--bg-secondary)';
            this.navbar.style.backdropFilter = 'blur(10px)';
        } else {
            this.navbar.style.backgroundColor = 'transparent';
            this.navbar.style.backdropFilter = 'none';
        }
    }
}

// Animation Management
class AnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        this.init();
    }
    
    init() {
        // Create intersection observer for scroll animations
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, this.observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll('.experience-item, .skill-category, .project-card, .contact-item');
        animateElements.forEach(el => {
            el.classList.add('animate-element');
            this.observer.observe(el);
        });
        
        // Add animation styles
        this.addAnimationStyles();
    }
    
    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .animate-element {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .animate-element.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .experience-item:nth-child(2) { transition-delay: 0.1s; }
            .experience-item:nth-child(3) { transition-delay: 0.2s; }
            
            .skill-category:nth-child(2) { transition-delay: 0.1s; }
            .skill-category:nth-child(3) { transition-delay: 0.2s; }
            .skill-category:nth-child(4) { transition-delay: 0.3s; }
            
            .project-card:nth-child(2) { transition-delay: 0.1s; }
            .project-card:nth-child(3) { transition-delay: 0.2s; }
            .project-card:nth-child(4) { transition-delay: 0.3s; }
        `;
        document.head.appendChild(style);
    }
}

// Social Links Manager
class SocialLinksManager {
    constructor() {
        this.socialSlider = document.querySelector('.social-slider');
        this.socialLinks = document.querySelector('.social-links');
        
        this.init();
    }
    
    init() {
        // Enable horizontal scrolling with mouse wheel
        if (this.socialSlider) {
            this.socialSlider.addEventListener('wheel', (e) => {
                if (e.deltaY !== 0) {
                    e.preventDefault();
                    this.socialSlider.scrollLeft += e.deltaY;
                }
            });
        }
        
        // Add smooth scrolling behavior
        if (this.socialLinks) {
            this.socialLinks.style.scrollBehavior = 'smooth';
        }
        
        // Track clicks for analytics (placeholder)
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const platform = link.getAttribute('aria-label') || 'Unknown';
                console.log(`Social link clicked: ${platform}`);
                // Here you could add analytics tracking
            });
        });
    }
}

// Interactive Effects Manager
class InteractiveEffectsManager {
    constructor() {
        this.init();
    }
    
    init() {
        // Add ripple effect to buttons and cards
        this.addRippleEffect();
        
        // Add particle effect to profile image
        this.addProfileImageEffects();
        
        // Add typing effect to title (optional)
        this.addTypingEffect();
    }
    
    addRippleEffect() {
        const rippleElements = document.querySelectorAll('.project-link, .social-link, .theme-toggle');
        
        rippleElements.forEach(element => {
            element.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = element.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    left: ${x}px;
                    top: ${y}px;
                    width: ${size}px;
                    height: ${size}px;
                    pointer-events: none;
                `;
                
                element.style.position = 'relative';
                element.style.overflow = 'hidden';
                element.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Add ripple animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    addProfileImageEffects() {
        const profileImage = document.querySelector('.profile-image');
        
        if (profileImage) {
            // Add glow effect on hover
            profileImage.addEventListener('mouseenter', () => {
                profileImage.style.boxShadow = '0 0 30px rgba(88, 166, 255, 0.5)';
            });
            
            profileImage.addEventListener('mouseleave', () => {
                profileImage.style.boxShadow = 'var(--shadow)';
            });
        }
    }
    
    addTypingEffect() {
        const titleElement = document.querySelector('.title');
        
        if (titleElement) {
            const originalText = titleElement.textContent;
            titleElement.textContent = '';
            
            let index = 0;
            const typeWriter = () => {
                if (index < originalText.length) {
                    titleElement.textContent += originalText.charAt(index);
                    index++;
                    setTimeout(typeWriter, 100);
                } else {
                    // Add blinking cursor
                    titleElement.innerHTML += '<span class="cursor">|</span>';
                    
                    // Add cursor animation
                    const style = document.createElement('style');
                    style.textContent = `
                        .cursor {
                            animation: blink 1s infinite;
                            color: var(--accent-primary);
                        }
                        
                        @keyframes blink {
                            0%, 50% { opacity: 1; }
                            51%, 100% { opacity: 0; }
                        }
                    `;
                    document.head.appendChild(style);
                }
            };
            
            // Start typing effect after a delay
            setTimeout(typeWriter, 1000);
        }
    }
}

// Performance Utilities
class PerformanceUtils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded! 🚀');
    
    // Initialize all managers
    const themeManager = new ThemeManager();
    const navigationManager = new NavigationManager();
    const animationManager = new AnimationManager();
    const socialLinksManager = new SocialLinksManager();
    const interactiveEffectsManager = new InteractiveEffectsManager();
    
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        // Add keyboard shortcuts for theme toggle (Ctrl/Cmd + D)
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            themeManager.toggleTheme();
        }
        
        // Add escape key to close any open modals (future feature)
        if (e.key === 'Escape') {
            // Close any open modals
            console.log('Escape pressed');
        }
    });
    
    // Add loading animation removal
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Performance monitoring (development only)
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        console.log('Performance metrics:');
        console.log(`DOM loaded in: ${performance.now()}ms`);
        
        window.addEventListener('load', () => {
            console.log(`Full page load in: ${performance.now()}ms`);
        });
    }
});

// Add global error handling
window.addEventListener('error', (e) => {
    console.error('Global error caught:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Add unhandled promise rejection handling
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault(); // Prevent default browser error logging
});

// Add service worker support (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Register service worker in the future for offline functionality
        console.log('Service Worker support detected');
    });
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        NavigationManager,
        AnimationManager,
        SocialLinksManager,
        InteractiveEffectsManager,
        PerformanceUtils
    };
}
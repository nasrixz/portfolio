// Portfolio JavaScript - script.js

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

(function () {
    emailjs.init({ publicKey: "dOWWXZuzhW8_kDpHH" });
})();

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when link clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Active navigation link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Scroll reveal animation
const reveals = document.querySelectorAll('.reveal');

function revealElements() {
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealElements);
revealElements(); // Initial check on page load

// Form submission handler
function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Honeypot (optional): stop bots
    if (formData.get('website')) return;

    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }

    // Map to your template variables
    const params = {
        from_name: name,
        from_email: email,
        message: message
    };

    emailjs
        .send("service_59q6mpn", "template_6u37d8z", params)
        .then(() => {
            alert(`✅ Thank you ${name}! Your message has been sent.`);
            form.reset();
        })
        .catch((err) => {
            console.error("EmailJS error:", err);
            alert("❌ Could not send email. Please try again later.");
        });
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };

        // Observe when the counter comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counter.classList.contains('counted')) {
                    updateCounter();
                    counter.classList.add('counted');
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

// Initialize counters
animateCounters();

// Role rotation effect
const roles = ['Software Developer', 'Flutter Programmer', 'Full-Stack Developer', 'UIX/UX Designer'];
let roleIndex = 0;

function rotateRoles() {
    const roleBadges = document.querySelectorAll('.role-badge');
    if (roleBadges.length > 0) {
        setInterval(() => {
            roleIndex = (roleIndex + 1) % roles.length;
            // Update first role badge with animation
            roleBadges[0].style.opacity = '0';
            setTimeout(() => {
                const icons = ['fa-laptop-code', 'fa-flutter', 'fa-server', 'fa-paint-brush'];
                roleBadges[0].innerHTML = `<i class="fas ${icons[roleIndex]}"></i> ${roles[roleIndex]}`;
                roleBadges[0].style.opacity = '1';
            }, 300);
        }, 3000);
    }
}

// Initialize role rotation
rotateRoles();

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only prevent default for hash links that exist on the page
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-container');

    if (hero && heroContent && scrolled < window.innerHeight) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Random skill highlighting
function highlightRandomSkill() {
    const skills = document.querySelectorAll('.skill-tag');
    if (skills.length > 0) {
        setInterval(() => {
            // Remove previous highlight
            skills.forEach(skill => skill.classList.remove('highlighted'));

            // Add new highlight
            const randomIndex = Math.floor(Math.random() * skills.length);
            skills[randomIndex].classList.add('highlighted');
        }, 2000);
    }
}

// Add CSS for highlighted skill
const style = document.createElement('style');
style.textContent = `
    .skill-tag.highlighted {
        background: rgba(0, 212, 255, 0.2) !important;
        border-color: var(--accent-primary) !important;
        color: var(--accent-primary) !important;
        transform: scale(1.05) !important;
        box-shadow: 0 5px 15px rgba(0, 212, 255, 0.3) !important;
    }
`;
document.head.appendChild(style);

// Initialize skill highlighting
highlightRandomSkill();

// Typing effect for welcome message
function typeWriter() {
    const element = document.querySelector('.hero-left h5');
    if (element) {
        const originalText = element.textContent;
        const iconHTML = '<i class="fas fa-code"></i> ';
        const text = originalText.replace(iconHTML, '');
        element.innerHTML = iconHTML;
        let index = 0;

        function type() {
            if (index < text.length) {
                element.innerHTML = iconHTML + text.substring(0, index + 1);
                index++;
                setTimeout(type, 50);
            }
        }

        setTimeout(type, 500);
    }
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function () {
        this.style.opacity = '1';
    });

    // Set initial opacity and transition
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';

    // If image is already cached and loaded
    if (img.complete) {
        img.style.opacity = '1';
    }
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.3)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '';
    });
});

// Add cursor glow effect
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Add CSS for cursor glow
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .cursor-glow {
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 212, 255, 0.03) 0%, transparent 70%);
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: -1;
        transition: opacity 0.3s ease;
    }
    
    @media (max-width: 768px) {
        .cursor-glow {
            display: none;
        }
    }
`;
document.head.appendChild(cursorStyle);

// Contact form enhancements
const contactForm = document.getElementById('contactForm');
const formInputs = document.querySelectorAll('.form-input, .form-textarea');

// Add floating label effect
formInputs.forEach(input => {
    // Focus and blur effects
    input.addEventListener('focus', function () {
        this.style.borderColor = 'var(--accent-primary)';
        this.style.background = 'rgba(0, 212, 255, 0.05)';
    });

    input.addEventListener('blur', function () {
        if (!this.value) {
            this.style.borderColor = 'var(--border)';
            this.style.background = 'var(--dark-secondary)';
        }
    });

    // Real-time validation
    input.addEventListener('input', function () {
        if (this.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = 'var(--danger)';
            } else if (this.value) {
                this.style.borderColor = 'var(--success)';
            }
        }
    });
});

// Initialize all animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial animations
    setTimeout(() => {
        revealElements();
        animateCounters();
    }, 100);

    // Add loaded class to body for CSS animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Performance optimization - Throttle scroll events
let scrollTimeout;
function throttleScroll(callback, delay) {
    if (scrollTimeout) return;

    scrollTimeout = setTimeout(() => {
        callback();
        scrollTimeout = null;
    }, delay);
}

// Replace some scroll event listeners with throttled versions
window.addEventListener('scroll', () => {
    throttleScroll(() => {
        revealElements();
    }, 100);
});

// Intersection Observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach(el => {
    animateOnScroll.observe(el);
});

// Console greeting
console.log('%c👋 Hello! Thanks for checking out my portfolio!',
    'color: #00d4ff; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c💼 Looking for a skilled developer? Let\'s connect!',
    'color: #4ade80; font-size: 16px; padding: 5px;');
console.log('%c📧 Email: nasrirusni1@gmail.com',
    'color: #fbbf24; font-size: 14px; padding: 5px;');
console.log('%c📱 Phone: +6012-8221068',
    'color: #fbbf24; font-size: 14px; padding: 5px;');

// Service Worker registration for better performance (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // You can add service worker registration here for PWA functionality
        console.log('Service Worker support detected');
    });
}

// Handle contact form validation
function validateForm(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    const errors = [];

    if (!name || name.trim().length < 2) {
        errors.push('Please enter a valid name (at least 2 characters)');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Please enter a valid email address');
    }

    if (!message || message.trim().length < 10) {
        errors.push('Please enter a message (at least 10 characters)');
    }

    return errors;
}

// Enhanced form submission
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(this);
        const errors = validateForm(formData);

        if (errors.length > 0) {
            alert('Please fix the following errors:\n' + errors.join('\n'));
            return;
        }

        // Show loading state
        const submitBtn = this.querySelector('.form-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            alert('Thank you! Your message has been sent successfully.');
            this.reset();

            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Reset form input styles
            formInputs.forEach(input => {
                input.style.borderColor = 'var(--border)';
                input.style.background = 'var(--dark-secondary)';
            });
        }, 2000);
    });
}
// Add resize handler for responsive adjustments
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate any size-dependent elements
        const profileContainer = document.querySelector('.profile-container');
        if (profileContainer) {
            if (window.innerWidth < 768) {
                // Mobile-specific adjustments
                profileContainer.style.width = '';
                profileContainer.style.height = '';
            } else {
                // Reset to default for larger screens
                profileContainer.style.width = '';
                profileContainer.style.height = '';
            }
        }
    }, 250);
});
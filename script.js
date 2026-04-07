// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.themeToggle = document.getElementById('theme-toggle');
        this.init();
    }

    init() {
        this.setTheme(this.theme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const icon = this.themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    toggleTheme() {
        this.setTheme(this.theme === 'light' ? 'dark' : 'light');
    }
}

// Navigation Management
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        // Handle mobile menu toggle
        this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        
        // Handle smooth scrolling
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Handle scroll effects
        // window.addEventListener('scroll', () => this.handleScroll());
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => this.closeMobileMenuOnOutsideClick(e));
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    }

    handleNavClick(e) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        
        if (href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }

        // Close mobile menu after clicking
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
    }

    handleScroll() {
        const scrolled = window.scrollY > 50;
        this.navbar.style.background = scrolled 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';

        // Update active nav link based on scroll position
        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    closeMobileMenuOnOutsideClick(e) {
        if (!this.navbar.contains(e.target)) {
            this.navMenu.classList.remove('active');
            this.navToggle.classList.remove('active');
        }
    }
}

// Skills Animation
class SkillsAnimation {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.init();
    }

    init() {
        this.observeSkills();
    }

    observeSkills() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillBar(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.skillBars.forEach(bar => observer.observe(bar));
    }

    animateSkillBar(bar) {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 300);
    }
}

// Projects Modal
class ProjectModal {
    constructor() {
        this.modal = document.getElementById('project-modal');
        this.modalBody = document.getElementById('modal-body');
        this.modalClose = document.getElementById('modal-close');
        this.modalOverlay = document.getElementById('modal-overlay');
        this.projectCards = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        this.projectCards.forEach(card => {
            card.addEventListener('click', () => this.openModal(card));
        });

        this.modalClose.addEventListener('click', () => this.closeModal());
        this.modalOverlay.addEventListener('click', () => this.closeModal());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }

    openModal(card) {
        const projectId = card.getAttribute('data-project');
        const content = this.getProjectContent(projectId);
        this.modalBody.innerHTML = content;
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    getProjectContent(projectId) {
        const projects = {
            '1': {
                title: 'Database Utility Tool',
                description: 'A lightweight and versatile database utility framework for simplifying data access and management.',
                features: [
                    'Database connectivity using JDBC',
                    'Support for multiple database engines (MySQL, PostgreSQL, SQLite)',
                    'Query execution and return of easily accessible result',
                    'User-friendly interface for CRUD operations',
                    'Connection pooling for optimized performance'
                ],                
                technologies: ['Java (Used Generics & Reflection)', 'JDBC', 'DBMS'],
                github: 'https://workdrive.zohopublic.in/external/f2775e4c464ce91edbcfae4f03137f81ef17f9e75a8dceb6d7f253110dec946a'
            },
            '2': {
                title: 'ZIET',
                description: "A diet planner based off of food items that are available in zoho's meals, tailored to each employee's health, tastes and shift-timings.",
                features: [
                    'User customization on food preferences',
                    'Sign up and user health related info input through Creator Form',
                    "Ideal diet planning for user's health, taste and time of meals",
                    'Regular notifications through cliq bot',
                    'Website to view analytics and history and to update already given user details',
                    'Backend made as Rest-API'
                ],
                technologies: ['Java', 'Javascript', 'Deluge', 'Zoho Creator', 'MySQL', 'My Database Util framework', 'Zoho APIs'],
                github: 'https://workdrive.zohopublic.in/external/7c952aeca4a1c0b2b278e9092a3d11b48f90afe34f7fcb337ba9cc2c19510557',
                live: 'https://workdrive.zohopublic.in/external/7c952aeca4a1c0b2b278e9092a3d11b48f90afe34f7fcb337ba9cc2c19510557'
            },
            '3': {
                title: 'Snake Game',
                description: 'Snake game in Swift (MacOS))',
                features: [
                    'Perfect game mechanics of a snake game',
                    "Dynamic image updation to suit the angle of the snake's head, body, and tail",
                ],
                technologies: ['Swift', 'MacOS Cocoa Framework'],
                github: 'https://workdrive.zohopublic.in/external/2dcc7b6cad9985f396b581ddd25b7442ddf0e3baa6ad9d2594f994de61c87687'
            },
            '4': {
                title: 'Trigonometry Animation',
                description: 'An animation video created using Manim (A python animations library) to help visualize trigonometric functions',
                features: [
                    'Visualization of sine and cosine functions',
                    'Animated unit circle with angle tracing',
                    'Dynamic linking between circle movement and graph output',
                    'Step-by-step derivation of trigonometric identities',
                    'Clear mathematical labeling and annotations'
                ],
                technologies: ['Python', 'Manim Library', 'Mathematics'],
                github: 'https://workdrive.zohopublic.in/external/68210277d0691d75ca36cc304fdf92e20613ba0b9f65f234bc607a3337cd1663',
                live: 'https://workdrive.zohopublic.in/external/231d2075667c71356e322fcafb600c05986f23af6ec56ea834a592287426da56'
            }
        };

        const project = projects[projectId];
        if (!project) return '<p>Project not found.</p>';
        return `
            <h2 style="margin-bottom: 16px; color: var(--text-primary);">${project.title}</h2>
            <p style="margin-bottom: 24px; color: var(--text-secondary); font-size: 18px;">${project.description}</p>
            
            <h3 style="margin-bottom: 12px; color: var(--text-primary);">Key Features:</h3>
            <ul style="margin-bottom: 24px; color: var(--text-secondary);">
                ${project.features.map(feature => `<li style="margin-bottom: 8px;">${feature}</li>`).join('')}
            </ul>
            
            <h3 style="margin-bottom: 12px; color: var(--text-primary);">Technologies Used:</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
                ${project.technologies.map(tech => `
                    <span style="background-color: var(--gray-100); color: var(--gray-900); padding: 4px 12px; border-radius: 20px; font-size: 14px; font-weight: 500;">
                        ${tech}
                    </span>
                `).join('')}
            </div>
            
            <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                <a href="${project.github}" target="_blank" class="btn btn-secondary" style="text-decoration: none;">
                    <i class="fab fa-git-alt" style="font-size: 1.5rem; margin-right: 8px; margin-bottom : 2px;"></i>View Code
                </a>
                ${project.live && project.live.trim() !== '' 
                    ? `<a href="${project.live}" target="_blank" class="btn btn-secondary" style="text-decoration: none;">
                           <i class="fas fa-external-link-alt" style="margin-right: 8px;"></i>Sample
                       </a>` 
                    : ''
                }
            </div>
        `;

    }
}

// Contact Form
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Simulate form submission
        this.showNotification('Thank you! Your message has been sent successfully.', 'success');
        this.form.reset();
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--success-color)' : 'var(--error-color)'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 3000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Hide notification
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('section');
        this.init();
    }

    init() {
        this.observeElements();
    }

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        this.elements.forEach(element => observer.observe(element));
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new Navigation();
    new SkillsAnimation();
    new ProjectModal();
    new ContactForm();
    new ScrollAnimations();
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            document.getElementById('nav-menu').classList.remove('active');
            document.getElementById('nav-toggle').classList.remove('active');
        }
    }, 250);
});

// Smooth scroll for scroll indicator
document.querySelector('.scroll-indicator').addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({
        behavior: 'smooth'
    });
});

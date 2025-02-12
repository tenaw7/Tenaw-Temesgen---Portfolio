// Combine document event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Initialize AOS with better performance settings
    AOS.init({
        once: true,
        duration: 800,
        offset: 100,
        disable: 'mobile' // Disable on mobile for better performance
    });

    // Reduce number of animated elements
    document.querySelectorAll('[data-aos]').forEach((el, i) => {
        if (i > 10) el.removeAttribute('data-aos');
    });

    // Handle image loading animations
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });

    // Typed.js initialization
    const typed = new Typed('.typed-text', {
        strings: ['Digital Reality', 'Beautiful Designs', 'Seamless Experiences'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        backDelay: 2000
    });

    // Smooth reveal animation for hero section
    const heroElements = document.querySelectorAll('.hero [data-aos]');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('aos-animate');
        }, index * 200);
    });

    // Initialize scroll-triggered animations
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                // Animate children with delay
                const elements = entry.target.querySelectorAll('.animate-on-scroll');
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('element-visible');
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => sectionObserver.observe(section));

    // Enhanced Navigation
    const nav = document.querySelector('.glass-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow and opacity on scroll
        if (currentScroll > 20) {
            nav.style.background = 'rgba(var(--surface-rgb), 0.95)';
            nav.style.boxShadow = 'var(--shadow-md)';
        } else {
            nav.style.background = 'rgba(var(--surface-rgb), 0.85)';
            nav.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // Active link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// Combine window event listeners
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        document.body.style.overflow = 'visible';
        setTimeout(() => loadingScreen.style.display = 'none', 500);
    }, 500);
});

window.addEventListener('resize', () => {
    if (window.innerWidth > mobileBreakpoint) {
        navLinks.classList.remove('active');
    }
});

// Enhanced Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Add transition after initial load
    setTimeout(() => {
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    }, 100);
}

function updateThemeIcon(theme) {
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.classList.toggle('rotated', theme === 'dark');
}

const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Add animation class
    themeToggle.classList.add('rotating');
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Remove animation class after animation completes
    setTimeout(() => {
        themeToggle.classList.remove('rotating');
    }, 300);
});

// Initialize theme on load
initTheme();

// Mobile Menu Handling
const hamburger = document.querySelector('.hamburg');
const navLinks = document.querySelector('.links');
const mobileBreakpoint = 768;

function toggleMobileMenu(event) {
    if (event) {
        event.stopPropagation();
    }
    navLinks.classList.toggle('active');
}

function closeMobileMenu() {
    if (window.innerWidth <= mobileBreakpoint) {
        navLinks.classList.remove('active');
    }
}

// Event Listeners for Mobile Menu
hamburger.addEventListener('click', toggleMobileMenu);

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        closeMobileMenu();
    }
});

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Handle resize
window.addEventListener('resize', () => {
    if (window.innerWidth > mobileBreakpoint) {
        navLinks.classList.remove('active');
    }
});

// Scroll to Contact
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Back to Top Button
const backToTop = document.getElementById('back-to-top');
let lastScrollPosition = 0;
let scrollTimeout;

window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    
    const currentScroll = window.pageYOffset;
    const shouldBeVisible = currentScroll > 500;
    
    backToTop.classList.toggle('visible', shouldBeVisible);

    // Add scroll direction class
    backToTop.classList.toggle('scrolling-up', currentScroll < lastScrollPosition);
    
    lastScrollPosition = currentScroll;

    // Hide after scrolling stops
    scrollTimeout = setTimeout(() => {
        backToTop.classList.remove('scrolling-up');
    }, 150);
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Portfolio Filtering
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        document.querySelectorAll('.project').forEach(project => {
            project.style.display = filter === 'all' || project.dataset.category === filter 
                ? 'block' 
                : 'none';
        });
    });
});

// Form Validation
document.querySelector('form').addEventListener('submit', (e) => {
    let valid = true;
    document.querySelectorAll('.form-group').forEach(group => {
        const input = group.querySelector('input, textarea');
        if (!input.value.trim()) {
            group.classList.add('error');
            valid = false;
        } else {
            group.classList.remove('error');
            group.classList.add('success');
        }
    });
    if (!valid) e.preventDefault();
});

// Dynamic Copyright Year
document.querySelector('footer p').innerHTML = 
    `© ${new Date().getFullYear()} Tenaw Temesgen. All Rights Reserved.`;

// Check if we're coming from a form submission
if (window.location.search.includes('success=true')) {
    window.location.href = 'success.html';
}

// Animate tech stack items on scroll
const techItems = document.querySelectorAll('.tech-item');
const techObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
        }
    });
}, { threshold: 0.2 });

techItems.forEach(item => techObserver.observe(item));

// Add hover animations for tech items
document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('i').style.animation = 'bounce 0.5s ease';
    });
    
    item.addEventListener('mouseleave', () => {
        item.querySelector('i').style.animation = 'none';
    });
});

// Smooth section transitions
document.querySelectorAll('.links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        const navHeight = nav.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Enhance smooth scroll behavior
function smoothScrollTo(element, offset = 100) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Update all scroll triggers to use the enhanced smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            smoothScrollTo(target);
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.links');
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
        }
    });
});

// Add this function to handle form submission
function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Show success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
            submitBtn.style.background = 'var(--success)';
            form.reset();
            setTimeout(() => {
                window.location.href = 'success.html';
            }, 2000);
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        // Show error message
        submitBtn.innerHTML = '<i class="fas fa-times"></i> Failed to Send';
        submitBtn.style.background = 'var(--error)';
        console.error('Error:', error);
    })
    .finally(() => {
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
    });

    return false;
}

const blogPosts = {
    blog1: {
        title: "Modern Web Development Trends",
        date: "March 15, 2024",
        author: "Tenaw Temesgen",
        image: "assets/blog1.jpg",
        content: `
            <p>The landscape of web development is constantly evolving, bringing new technologies and methodologies to the forefront. In 2024, we're seeing several exciting trends that are reshaping how we build and interact with web applications.</p>

            <h3>1. AI Integration</h3>
            <p>Artificial Intelligence is becoming increasingly integrated into web development, from automated testing to intelligent user interfaces. We're seeing AI-powered chatbots, content generation, and personalization becoming standard features.</p>

            <h3>2. Serverless Architecture</h3>
            <p>The shift towards serverless computing continues to gain momentum, offering developers a more scalable and cost-effective way to build and deploy applications.</p>

            <h3>3. Web Assembly</h3>
            <p>WebAssembly is enabling high-performance code execution in browsers, opening new possibilities for web applications that require intensive computing.</p>

            <h3>Conclusion</h3>
            <p>As we continue through 2024, these trends are likely to evolve further, bringing new opportunities and challenges for developers.</p>
        `
    },
    blog2: {
        title: "Essential UI/UX Design Principles",
        date: "March 10, 2024",
        author: "Tenaw Temesgen",
        image: "assets/blog2.jpg",
        content: `
            <p>Creating effective user interfaces requires a deep understanding of design principles and user psychology. Here are some essential principles that guide successful UI/UX design.</p>

            <h3>1. Hierarchy and Layout</h3>
            <p>Visual hierarchy guides users through content naturally, while proper layout ensures information is easily digestible and accessible.</p>

            <h3>2. Consistency</h3>
            <p>Maintaining consistency in design elements, interactions, and patterns helps users learn and navigate your interface more effectively.</p>

            <h3>3. Feedback and Response</h3>
            <p>Providing clear feedback for user actions creates a more engaging and intuitive experience.</p>

            <h3>Conclusion</h3>
            <p>These principles form the foundation of good UI/UX design, but remember that design is iterative and should always be user-centered.</p>
        `
    }
};

function openBlogPost(id) {
    const post = blogPosts[id];
    const modal = document.getElementById('blogModal');
    const modalBody = modal.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <img src="${post.image}" alt="${post.title}">
        <h2>${post.title}</h2>
        <div class="modal-meta">
            <span><i class="far fa-calendar"></i> ${post.date}</span>
            <span><i class="far fa-user"></i> ${post.author}</span>
        </div>
        ${post.content}
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal when clicking the close button or outside
document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('blogModal').classList.remove('active');
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('blogModal');
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('blogModal').classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Add this to your existing script.js
const translations = {
    en: {
        // English translations
        nav: {
            home: 'Home',
            about: 'About',
            services: 'Services',
            portfolio: 'Portfolio',
            contact: 'Contact'
        },
        hero: {
            greeting: 'Hi there, I\'m',
            tagline: 'Transforming Ideas Into',
            description: 'Full-stack developer specializing in building exceptional digital experiences. Currently focused on creating accessible, human-centered products.'
        },
        // Add more English translations...
    },
    am: {
        // Amharic translations
        nav: {
            home: 'ዋና ገጽ',
            about: 'ስለ እኔ',
            services: 'አገልግሎቶች',
            portfolio: 'ስራዎች',
            contact: 'አግኙኝ'
        },
        hero: {
            greeting: 'ሰላም፣ እኔ',
            tagline: 'ሃሳቦችን እውን እያደረግኩ',
            description: 'በዲጂታል ልምዶች ግንባታ ላይ የተሰማራሁ ሙሉ-መጠን ዌብ ገንቢ ነኝ። በአሁኑ ጊዜ ተደራሽ እና ሰው-ተኮር ምርቶችን በመፍጠር ላይ ያተኮርኩ።'
        },
        // Add more Amharic translations...
    }
};

function changeLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('preferred-language', lang);
    
    // Update current language display
    document.querySelector('.current-lang').textContent = lang.toUpperCase();
    
    // Update active state in dropdown
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update content
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.dataset.translate;
        const keys = key.split('.');
        let translation = translations[lang];
        keys.forEach(k => {
            translation = translation[k];
        });
        if (translation) {
            element.textContent = translation;
        }
    });
}

// Initialize language
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferred-language') || 'en';
    changeLanguage(savedLang);
    
    // Add click handlers to language options
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', () => {
            changeLanguage(btn.dataset.lang);
        });
    });
});
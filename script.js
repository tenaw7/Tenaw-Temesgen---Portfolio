// Combine document event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Initialize AOS
    AOS.init({
        once: true,
        duration: 1000,
        offset: 100
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
}

function updateThemeIcon(theme) {
    const moonIcon = document.querySelector('.fa-moon');
    const sunIcon = document.querySelector('.fa-sun');
    
    if (theme === 'dark') {
        moonIcon.style.opacity = '0';
        sunIcon.style.opacity = '1';
    } else {
        moonIcon.style.opacity = '1';
        sunIcon.style.opacity = '0';
    }
}

const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Initialize theme on load
initTheme();

// Enhanced Mobile Menu
const hamburg = document.querySelector('.hamburg');
const navLinks = document.querySelector('.links');
const mobileBreakpoint = 768;

function handleMobileMenu() {
    if (window.innerWidth <= mobileBreakpoint) {
        navLinks.classList.remove('active');
    }
}

hamburg.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburg.contains(e.target)) {
        handleMobileMenu();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > mobileBreakpoint) {
        navLinks.classList.remove('active');
    }
});

// Back to Top Button
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 500 ? 'block' : 'none';
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
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

// Scroll to Contact
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Check if we're coming from a form submission
if (window.location.search.includes('success=true')) {
    window.location.href = 'success.html';
}
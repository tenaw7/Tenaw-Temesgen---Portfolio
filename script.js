// Initialize AOS
AOS.init({
    once: true,
    duration: 1000,
    offset: 100
});

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Initialize theme on load
initTheme();

// Mobile Menu Toggle
const hamburg = document.querySelector('.hamburg');
const navLinks = document.querySelector('.links');

hamburg.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburg.contains(e.target)) {
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

// Loading Screen
window.addEventListener('load', () => {
    document.querySelector('.loading-screen').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('.loading-screen').style.display = 'none';
    }, 500);
});

// Scroll to Contact
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}
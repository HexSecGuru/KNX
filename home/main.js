// Hide header on scroll down, show on scroll up
let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add("hidden");
    } else {
        header.classList.remove("hidden");
    }

    if (currentScroll > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
});

// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

menuToggle.addEventListener("click", () => {
    nav.classList.toggle("show");
});

// Close mobile menu when clicking a link
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            nav.classList.remove("show");
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
    if (!header.contains(e.target) && nav.classList.contains("show")) {
        nav.classList.remove("show");
    }
});

// ============================================
// LANGUAGE SWITCHER FUNCTIONALITY
// ============================================
let currentLang = 'en';
const langSwitcher = document.querySelector('.language-switcher');
const langToggle = document.getElementById('langToggle');
const currentFlag = document.getElementById('currentFlag');
const currentLangText = document.getElementById('currentLang');

// Toggle dropdown
if (langToggle) {
    langToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        langSwitcher.classList.toggle('open');
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (langSwitcher && !langSwitcher.contains(e.target)) {
        langSwitcher.classList.remove('open');
    }
});

function switchLanguage(lang) {
    currentLang = lang;
    
    // Update all elements with data-lang attribute
    document.querySelectorAll('[data-lang]').forEach(el => {
        el.classList.remove('active');
        if (el.getAttribute('data-lang') === lang) {
            el.classList.add('active');
        }
    });

    // Update language options
    document.querySelectorAll('[data-lang-opt]').forEach(opt => {
        opt.classList.remove('active');
        if (opt.getAttribute('data-lang-opt') === lang) {
            opt.classList.add('active');
        }
    });

    // Update toggle button
    if (currentFlag && currentLangText) {
        if (lang === 'en') {
            currentFlag.textContent = '🇬🇧';
            currentLangText.textContent = 'EN';
        } else {
            currentFlag.textContent = '🇬🇷';
            currentLangText.textContent = 'GR';
        }
    }

    // Close dropdown
    if (langSwitcher) {
        langSwitcher.classList.remove('open');
    }

    // Update page language attribute
    document.documentElement.lang = lang;

    // Save preference
    localStorage.setItem('preferredLanguage', lang);
}

// Language option click handlers
document.querySelectorAll('[data-lang-opt]').forEach(opt => {
    opt.addEventListener('click', () => {
        const lang = opt.getAttribute('data-lang-opt');
        switchLanguage(lang);
    });
});

// Load saved language preference on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== currentLang) {
        switchLanguage(savedLang);
    }
});
// ============================================
// END LANGUAGE SWITCHER
// ============================================

// Scroll animations
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', fadeInOnScroll);
fadeInOnScroll(); // Initial check
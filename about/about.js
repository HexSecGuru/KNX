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
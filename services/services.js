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

        // Scroll animations for project cards
        const projectCards = document.querySelectorAll('.project-card');
        
        const fadeInOnScroll = () => {
            projectCards.forEach(card => {
                const cardTop = card.getBoundingClientRect().top;
                const cardVisible = 150;
                
                if (cardTop < window.innerHeight - cardVisible) {
                    card.classList.add('visible');
                }
            });
        };

        window.addEventListener('scroll', fadeInOnScroll);
        fadeInOnScroll(); // Initial check
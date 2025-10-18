 // Hide header on scroll down, show on scroll up
        let lastScroll = 0;
        const header = document.getElementById("mainHeader");

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
        const menuToggle = document.getElementById("menuToggle");
        const nav = document.getElementById("mainNav");

        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            nav.classList.toggle("show");
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll("nav a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("show");
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!header.contains(e.target)) {
                nav.classList.remove("show");
            }
        });

        // Before/After Slider
        const slider = document.getElementById("slider");
        const afterImage = document.getElementById("afterImage");
        const sliderButton = document.getElementById("sliderButton");

        slider.addEventListener("input", (e) => {
            const sliderPos = e.target.value;
            afterImage.style.clipPath = `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0% 100%)`;
            sliderButton.style.left = `${sliderPos}%`;
        });

        // Lightbox functionality
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.getElementById('lightbox-close');
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');

        const galleryItems = document.querySelectorAll('.gallery-item img');
        let currentIndex = 0;

        if (lightbox && closeBtn) {
            closeBtn.addEventListener('click', () => {
                lightbox.classList.remove('active');
            });

            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.classList.remove('active');
                }
            });

            // Add lightbox open on gallery click
            galleryItems.forEach((img, index) => {
                img.addEventListener('click', () => {
                    currentIndex = index;
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt;
                    lightbox.classList.add('active');
                });
            });

            // Navigation
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                lightboxImg.src = galleryItems[currentIndex].src;
                lightboxImg.alt = galleryItems[currentIndex].alt;
            });

            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % galleryItems.length;
                lightboxImg.src = galleryItems[currentIndex].src;
                lightboxImg.alt = galleryItems[currentIndex].alt;
            });

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (lightbox.classList.contains('active')) {
                    if (e.key === 'ArrowLeft') {
                        prevBtn.click();
                    } else if (e.key === 'ArrowRight') {
                        nextBtn.click();
                    } else if (e.key === 'Escape') {
                        closeBtn.click();
                    }
                }
            });
        }